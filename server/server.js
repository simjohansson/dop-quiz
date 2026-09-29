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
  juice: { total: 0, byPlayer: {} },
  ...loadSavedState(),
};

// Reset connected status on boot: no actual sockets are connected when server boots
Object.values(gameState.players).forEach((p) => {
  if (!p.isBot) {
    p.connected = false;
  }
});

// Active sockets per player: Map<playerId, Set<socketId>>
const playerSockets = new Map();

function addPlayerSocket(playerId, socketId) {
  if (!playerSockets.has(playerId)) {
    playerSockets.set(playerId, new Set());
  }
  playerSockets.get(playerId).add(socketId);
  if (gameState.players[playerId]) {
    gameState.players[playerId].connected = true;
  }
}

function removePlayerSocket(playerId, socketId) {
  const sockets = playerSockets.get(playerId);
  if (sockets) {
    sockets.delete(socketId);
    if (sockets.size === 0) {
      playerSockets.delete(playerId);
      if (gameState.players[playerId]) {
        gameState.players[playerId].connected = false;
        broadcastState();
      }
    }
  }
}

function isPlayerConnected(playerId) {
  const sockets = playerSockets.get(playerId);
  return !!(sockets && sockets.size > 0);
}

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

// Squeezes arrive in bursts from many phones, so batch them into one small update per tick.
let recentSqueezes = {};
let juiceTimer = null;
function queueJuiceUpdate() {
  if (juiceTimer) return;
  juiceTimer = setTimeout(() => {
    juiceTimer = null;
    io.emit('juice-update', { ...gameState.juice, recent: recentSqueezes });
    recentSqueezes = {};
    saveState();
  }, 200);
}

const MAX_SQUEEZES_PER_SECOND = 12;

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
  socket.data.squeezeWindowStart = 0;
  socket.data.squeezeCount = 0;

  socket.on('squeeze', ({ playerId }) => {
    if (!gameState.players[playerId]) return;
    const now = Date.now();
    if (now - socket.data.squeezeWindowStart > 1000) {
      socket.data.squeezeWindowStart = now;
      socket.data.squeezeCount = 0;
    }
    if (++socket.data.squeezeCount > MAX_SQUEEZES_PER_SECOND) return;

    gameState.juice.total++;
    gameState.juice.byPlayer[playerId] = (gameState.juice.byPlayer[playerId] || 0) + 1;
    recentSqueezes[playerId] = (recentSqueezes[playerId] || 0) + 1;
    queueJuiceUpdate();
  });

  // Player joins
  socket.on('join-game', ({ playerId, name }) => {
    const cleanName = typeof name === 'string' ? name.trim().slice(0, 24) : '';
    if (!playerId || !cleanName) return;

    socket.data.playerId = playerId;
    addPlayerSocket(playerId, socket.id);

    if (!gameState.players[playerId]) {
      gameState.players[playerId] = {
        id: playerId,
        name: cleanName,
        answers: {},
        isSubmitted: false,
        connected: true,
        isBot: false,
      };
    } else {
      gameState.players[playerId].name = cleanName;
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

  socket.on('admin-remove-player', ({ playerId }) => {
    if (playerId && gameState.players[playerId]) {
      delete gameState.players[playerId];
      playerSockets.delete(playerId);
      broadcastState();
    }
  });

  socket.on('admin-clear-disconnected', () => {
    Object.keys(gameState.players).forEach((id) => {
      const p = gameState.players[id];
      if (!p.isBot && !isPlayerConnected(id)) {
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
    gameState.juice = { total: 0, byPlayer: {} };
    // Clear bots and disconnected players; reset answers for connected active players
    Object.keys(gameState.players).forEach((id) => {
      const p = gameState.players[id];
      if (p.isBot || !isPlayerConnected(id)) {
        delete gameState.players[id];
      } else {
        p.answers = {};
        p.isSubmitted = false;
        p.connected = true;
      }
    });
    broadcastState();
  });

  socket.on('disconnect', () => {
    if (socket.data.playerId) {
      removePlayerSocket(socket.data.playerId, socket.id);
    }
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
