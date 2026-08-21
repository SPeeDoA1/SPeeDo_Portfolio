import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage';

// Short, original synthesized tones for UI feedback — not a reproduction of
// Microsoft's copyrighted Windows XP sound scheme, which can't be embedded here.

let audioCtx: AudioContext | null = null;
let muted = false;
let initialized = false;

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  type WindowWithWebkitAudio = Window & { webkitAudioContext?: typeof AudioContext };
  const Ctor = window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) {
    audioCtx = new Ctor();
  }
  return audioCtx;
}

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;
  muted = loadFromStorage(STORAGE_KEYS.soundMuted, false);
}

export function isSoundMuted(): boolean {
  ensureInitialized();
  return muted;
}

export function setSoundMuted(value: boolean): void {
  ensureInitialized();
  muted = value;
  saveToStorage(STORAGE_KEYS.soundMuted, value);
}

// A freshly created (or backgrounded-tab) context starts/goes 'suspended'.
// Scheduling against it immediately can silently produce no sound, since its
// clock is frozen until resume() actually completes — so wait for it.
function withContext(run: (ctx: AudioContext) => void): void {
  ensureInitialized();
  if (muted) return;
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === 'running') {
    run(ctx);
  } else {
    ctx.resume().then(() => run(ctx)).catch(() => {});
  }
}

function tone(
  ctx: AudioContext,
  freq: number,
  duration: number,
  delay = 0,
  type: OscillatorType = 'sine',
  volume = 0.07
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const startTime = ctx.currentTime + delay;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function sweep(
  ctx: AudioContext,
  startFreq: number,
  endFreq: number,
  duration: number,
  delay = 0,
  type: OscillatorType = 'triangle',
  volume = 0.06
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const startTime = ctx.currentTime + delay;
  osc.frequency.setValueAtTime(startFreq, startTime);
  osc.frequency.exponentialRampToValueAtTime(Math.max(endFreq, 1), startTime + duration);
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playClick(): void {
  withContext((ctx) => tone(ctx, 740, 0.05, 0, 'square', 0.05));
}

export function playOpen(): void {
  withContext((ctx) => {
    tone(ctx, 523, 0.08, 0, 'sine');
    tone(ctx, 659, 0.1, 0.06, 'sine');
  });
}

export function playClose(): void {
  withContext((ctx) => {
    tone(ctx, 659, 0.08, 0, 'sine');
    tone(ctx, 440, 0.1, 0.06, 'sine');
  });
}

export function playMinimize(): void {
  withContext((ctx) => sweep(ctx, 700, 280, 0.12, 0, 'triangle', 0.06));
}

export function playMaximize(): void {
  withContext((ctx) => sweep(ctx, 280, 700, 0.12, 0, 'triangle', 0.06));
}

export function playRestore(): void {
  withContext((ctx) => sweep(ctx, 320, 600, 0.1, 0, 'triangle', 0.06));
}

// "Critical stop" — the alarming two-tone buzz for hard failures.
export function playError(): void {
  withContext((ctx) => {
    tone(ctx, 220, 0.15, 0, 'square', 0.08);
    tone(ctx, 180, 0.2, 0.12, 'square', 0.08);
  });
}

// "Exclamation" — a single, gentler buzz for non-fatal warnings.
export function playWarning(): void {
  withContext((ctx) => tone(ctx, 300, 0.18, 0, 'square', 0.06));
}

// "Asterisk" — the pleasant chime for informational dialogs.
export function playNotify(): void {
  withContext((ctx) => {
    tone(ctx, 784, 0.1, 0, 'sine', 0.05);
    tone(ctx, 988, 0.14, 0.08, 'sine', 0.05);
  });
}

// A soft descending "ding-dong" for yes/no prompts.
export function playQuestion(): void {
  withContext((ctx) => {
    tone(ctx, 659, 0.1, 0, 'sine', 0.05);
    tone(ctx, 523, 0.14, 0.09, 'sine', 0.05);
  });
}

export function playChime(): void {
  withContext((ctx) => {
    tone(ctx, 523, 0.15, 0, 'sine', 0.06);
    tone(ctx, 659, 0.15, 0.12, 'sine', 0.06);
    tone(ctx, 784, 0.25, 0.24, 'sine', 0.06);
  });
}

// A quick downward "crumple" for sending something to the Recycle Bin.
export function playRecycle(): void {
  withContext((ctx) => sweep(ctx, 500, 140, 0.18, 0, 'sawtooth', 0.045));
}

export function playStartup(): void {
  withContext((ctx) => {
    tone(ctx, 261.63, 0.18, 0, 'sine', 0.06);
    tone(ctx, 329.63, 0.18, 0.15, 'sine', 0.06);
    tone(ctx, 392.0, 0.18, 0.3, 'sine', 0.06);
    tone(ctx, 523.25, 0.32, 0.45, 'sine', 0.07);
  });
}

export function playShutdown(): void {
  withContext((ctx) => {
    tone(ctx, 523.25, 0.16, 0, 'sine', 0.06);
    tone(ctx, 392.0, 0.16, 0.14, 'sine', 0.06);
    tone(ctx, 329.63, 0.16, 0.28, 'sine', 0.06);
    tone(ctx, 220.0, 0.3, 0.42, 'sine', 0.06);
  });
}
