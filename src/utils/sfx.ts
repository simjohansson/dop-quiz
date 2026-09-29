const STORAGE_KEY = 'lemon_quiz_sound';
let ctx: AudioContext | null = null;

export const isSoundEnabled = () => localStorage.getItem(STORAGE_KEY) !== 'off';
export const setSoundEnabled = (on: boolean) => localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');

function getContext(): AudioContext | null {
  if (typeof AudioContext === 'undefined') return null;
  ctx ??= new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

// Browsers only allow audio after a user gesture, so call this from one (e.g. first tap).
export const unlockAudio = () => {
  getContext();
};

export function playDrumroll(durationMs: number): () => void {
  const ac = isSoundEnabled() ? getContext() : null;
  if (!ac) return () => {};

  const duration = durationMs / 1000;
  const buffer = ac.createBuffer(1, Math.ceil(ac.sampleRate * duration), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const source = ac.createBufferSource();
  source.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.8;
  const gain = ac.createGain();

  // Short noise bursts that get louder = snare roll with crescendo.
  const start = ac.currentTime;
  gain.gain.setValueAtTime(0.0001, start);
  for (let t = 0; t < duration; t += 0.045) {
    gain.gain.setValueAtTime(0.08 + 0.35 * (t / duration), start + t);
    gain.gain.exponentialRampToValueAtTime(0.01, start + t + 0.04);
  }

  source.connect(filter).connect(gain).connect(ac.destination);
  source.start(start);
  source.stop(start + duration);
  return () => source.stop();
}

export function playTada() {
  const ac = isSoundEnabled() ? getContext() : null;
  if (!ac) return;

  const start = ac.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const osc = ac.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const gain = ac.createGain();
    const t = start + i * 0.09;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    osc.connect(gain).connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.65);
  });
}

export function playSquish() {
  const ac = isSoundEnabled() ? getContext() : null;
  if (!ac) return;

  const t = ac.currentTime;
  const osc = ac.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(520 + Math.random() * 120, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.12);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

export const vibrate = (pattern: number[]) => {
  if (isSoundEnabled()) navigator.vibrate?.(pattern);
};
