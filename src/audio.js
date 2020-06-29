import { codes } from "./codes";
import { tdit, tfdit } from "./timings";

const DEFAULT_TONE_FREQUENCY = 700;
const DEFAULT_WPM = 20;
const DEFAULT_FWPM = 10;

const START_DELAY = 0.5;
const TRANSITION_PERIOD = 0.002;

const DAH_LENGTH = 3;
const INTER_WORD_SPACING = 3;
const INTRA_WORD_SPACING = 4; // Actually 7, but we always add the inter-word spacing (3) so 7-3=4

function initAudioContext(opts = {}) {
  if (window === undefined) return;

  let tone = opts.tone || DEFAULT_TONE_FREQUENCY;

  let actx = new (window.AudioContext || window.webkitAudioContext)();
  let osc = actx.createOscillator();
  let gain = actx.createGain();

  gain.connect(actx.destination);

  gain.gain.value = 0;
  osc.frequency.value = tone;

  osc.connect(gain);
  osc.start();

  return {
    actx: actx,
    osc: osc,
    gain: gain,
  };
}

function play(word, opts = {}) {
  let ctx = opts.actx || initAudioContext(opts);
  let { actx, gain } = ctx;

  let ct = actx.currentTime;
  const wpm = opts.wpm || DEFAULT_WPM;
  const fwpm = opts.fwpm || DEFAULT_FWPM;
  const td = tdit(wpm);
  const tfd = tfdit(wpm, fwpm);

  let t = ct + START_DELAY;
  for (let i = 0; i < word.length; i++) {
    let w = word[i];
    if (w == " ") {
      t += tfd * INTRA_WORD_SPACING;
      continue;
    }

    let c = codes[w.toUpperCase()];

    for (let j = 0; j < c.length; j++) {
      let l = c[j] == "-" ? td * DAH_LENGTH : td;
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
