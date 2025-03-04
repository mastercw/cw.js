import { codes } from "./codes.js";
import { tdit, tfdit } from "./timings.js";

const DEFAULT_TONE_FREQUENCY = 700;
const DEFAULT_WPM = 20;
const DEFAULT_FWPM = 10;

const START_DELAY = 0.5;
const TRANSITION_PERIOD = 0.002;

const DAH_LENGTH = 3;
const INTER_WORD_SPACING = 3;
const INTRA_WORD_SPACING = 4; // Actually 7, but we always add the inter-word spacing (3) so 7-3=4

export interface AudioContextOptions {
  tone?: number;
  wpm?: number;
  fwpm?: number;
  actx?: AudioContextResult;
}

export interface AudioContextResult {
  actx: AudioContext;
  osc: OscillatorNode;
  gain: GainNode;
}

/**
 * Initialize the Web Audio API context
 * @param opts Options for initializing the audio context
 * @returns The initialized audio context or undefined if window is not available
 */
function initAudioContext(opts: AudioContextOptions = {}): AudioContextResult | undefined {
  if (typeof window === "undefined") return;

  const tone = opts.tone || DEFAULT_TONE_FREQUENCY;

  const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = actx.createOscillator();
  const gain = actx.createGain();

  gain.connect(actx.destination);

  gain.gain.value = 0;
  osc.frequency.value = tone;

  osc.connect(gain);
  osc.start();

  return {
    actx,
    osc,
    gain,
  };
}

/**
 * Play a word or phrase in Morse code
 * @param word The word or phrase to play
 * @param opts Options for playback
 * @returns The total duration of playback in milliseconds
 */
function play(word: string, opts: AudioContextOptions = {}): number {
  const ctx = opts.actx || initAudioContext(opts);
  if (!ctx) return 0;

  const { actx, gain } = ctx;

  const ct = actx.currentTime;
  const wpm = opts.wpm || DEFAULT_WPM;
  const fwpm = opts.fwpm || DEFAULT_FWPM;
  const td = tdit(wpm);
  const tfd = tfdit(wpm, fwpm);

  let t = ct + START_DELAY;
  for (let i = 0; i < word.length; i++) {
    const w = word[i];
    if (w === " ") {
      t += tfd * INTRA_WORD_SPACING;
      continue;
    }

    const c = codes[w.toUpperCase()];
    if (!c) continue; // Skip characters that don't have a code

    for (let j = 0; j < c.length; j++) {
      const l = c[j] === "-" ? td * DAH_LENGTH : td;
      gain.gain.setTargetAtTime(1, t, TRANSITION_PERIOD);
      gain.gain.setTargetAtTime(0, t + l, TRANSITION_PERIOD);
      t += l + td;
    }
    t -= td;
    t += tfd * INTER_WORD_SPACING;
  }
  return t * 1000;
}

export { initAudioContext, play };
