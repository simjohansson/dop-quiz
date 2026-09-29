import express from 'express';
import http from 'http';
import fs from 'fs';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Questions metadata for bot generation & scoring
const QUESTIONS = [
  { id: 1, answer: 8 },
  { id: 2, answer: 14 },
  { id: 3, answer: 25 },
  { id: 4, answer: 19 },
  { id: 5, answer: 1 },
  { id: 6, answer: 48 },
  { id: 7, answer: 5 },
  { id: 8, answer: 24 },
  { id: 9, answer: 10 },
];

const STATE_FILE = process.env.STATE_FILE || path.join(__dirname, 'game-state.json');

function loadSavedState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

const newRoundId = () => Date.now().toString(36);

const gameState = {
  phase: 'LOBBY', // 'LOBBY' | 'ANSWERING' | 'REVEALING' | 'LEADERBOARD'
  roundId: newRoundId(),
  players: {},
  currentRevealQuestionIndex: 0,
  isAnswerRevealed: false,
  isGuessesRevealed: false,
  startedAt: null,
  ...loadSavedState(),
};

// Debounced + atomic (tmp file + rename) so slider spam doesn't hammer the disk or corrupt the file.
let saveTimer = null;
function saveState() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    const tmp = `${STATE_FILE}.tmp`;
    try {
      await fs.promises.writeFile(tmp, JSON.stringify(gameState));
      await fs.promises.rename(tmp, STATE_FILE);
    } catch (err) {
      console.error('Kunde inte spara spelläget:', err);
    }
  }, 300);
}

function broadcastState() {
  io.emit('game-state', gameState);
  saveState();
}

const canAnswer = () => gameState.phase === 'LOBBY' || gameState.phase === 'ANSWERING';

function goToQuestion(index) {
  gameState.currentRevealQuestionIndex = index;
  gameState.isAnswerRevealed = false;
  gameState.isGuessesRevealed = false;
  broadcastState();
}

// Bot generators for solo testing / party fun
const BOT_TEMPLATES = [
  { name: 'Mormor Gerd 👵', variance: 12 },
  { name: 'Farfar Sven 👴', variance: 18 },
  { name: 'Faster Karin 👩', variance: 9 },
  { name: 'Kusin Erik 👦', variance: 22 },
  { name: 'Onkel Bengt 🧔', variance: 15 },
];

function generateBotPlayers() {
  BOT_TEMPLATES.forEach((bot, idx) => {
    const botId = `bot-${idx + 1}`;
    const answers = {};

    QUESTIONS.forEach((q) => {
      // Random deviation around true answer
      const delta = Math.round((Math.random() * 2 - 1) * bot.variance);
      const guess = Math.max(0, Math.min(100, q.answer + delta));
      answers[q.id] = guess;
    });

    gameState.players[botId] = {
      id: botId,
      name: bot.name,
      answers,
      isSubmitted: true,
      connected: true,
      isBot: true,
    };
  });
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', playersCount: Object.keys(gameState.players).length });
});

app.get('/api/state', (req, res) => {
  res.json(gameState);
});

// Serve frontend build in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// WebSockets
io.on('connection', (socket) => {
  // Send current state on join
  socket.emit('game-state', gameState);

  // Player joins
  socket.on('join-game', ({ playerId, name }) => {
    if (!playerId || !name) return;

    if (!gameState.players[playerId]) {
      gameState.players[playerId] = {
        id: playerId,
        name: name.trim(),
        answers: {},
        isSubmitted: false,
        connected: true,
        isBot: false,
      };
    } else {
      gameState.players[playerId].name = name.trim();
      gameState.players[playerId].connected = true;
    }

    broadcastState();
  });

  // Player updates answer
  socket.on('submit-answer', ({ playerId, questionId, value }) => {
    if (canAnswer() && gameState.players[playerId]) {
      gameState.players[playerId].answers[questionId] = Math.max(
        0,
        Math.min(100, Math.round(value))
      );
      broadcastState();
    }
  });

  // Player finishes wizard
  socket.on('submit-all-answers', ({ playerId }) => {
    if (canAnswer() && gameState.players[playerId]) {
      gameState.players[playerId].isSubmitted = true;
      broadcastState();
    }
  });

  // Admin controls
  socket.on('admin-start-reveal', () => {
    gameState.phase = 'REVEALING';
    goToQuestion(0);
  });

  socket.on('admin-next-question', () => {
    if (gameState.currentRevealQuestionIndex < QUESTIONS.length - 1) {
      goToQuestion(gameState.currentRevealQuestionIndex + 1);
    }
  });

  socket.on('admin-prev-question', () => {
    if (gameState.currentRevealQuestionIndex > 0) {
      goToQuestion(gameState.currentRevealQuestionIndex - 1);
    }
  });

  socket.on('admin-jump-question', ({ index }) => {
    if (index >= 0 && index < QUESTIONS.length) {
      goToQuestion(index);
    }
  });

  socket.on('admin-reveal-answer', () => {
    gameState.isAnswerRevealed = true;
    broadcastState();
  });

  socket.on('admin-reveal-guesses', () => {
    gameState.isAnswerRevealed = true;
    gameState.isGuessesRevealed = true;
    broadcastState();
  });

  socket.on('admin-finish-quiz', () => {
    gameState.phase = 'LEADERBOARD';
    broadcastState();
  });

  socket.on('admin-add-bots', () => {
    generateBotPlayers();
    broadcastState();
  });

  socket.on('admin-clear-bots', () => {
    Object.keys(gameState.players).forEach((id) => {
      if (gameState.players[id].isBot) {
        delete gameState.players[id];
      }
    });
    broadcastState();
  });

  socket.on('admin-reset-game', () => {
    gameState.phase = 'LOBBY';
    gameState.roundId = newRoundId();
    gameState.currentRevealQuestionIndex = 0;
    gameState.isAnswerRevealed = false;
    gameState.isGuessesRevealed = false;
    Object.keys(gameState.players).forEach((id) => {
      gameState.players[id].answers = {};
      gameState.players[id].isSubmitted = false;
    });
    broadcastState();
  });

  socket.on('disconnect', () => {
    // Optionally flag offline
  });
});

// Fallback to index.html for SPA routing (Express 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🍋 Lemon Quiz Server running on http://0.0.0.0:${PORT}`);
});
