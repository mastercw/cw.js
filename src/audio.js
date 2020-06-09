const { codes } = require("./codes");

DEFAULT_TONE_FREQUENCY = 700;
START_DELAY = 0.5;
TRANSITION_PERIOD = 0.002;

DAH_LENGTH = 3;
INTER_WORD_SPACING = 3;
INTRA_WORD_SPACING = 4; // Actually 7, but we always add the inter-word spacing (3) so 7-3=4

function initAudioContext(toneFreq) {
  if (window === undefined) return;

  let tone = toneFreq || DEFAULT_TONE_FREQUENCY;

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

function playWord(actx, gain, word, td, tfd) {
  let ct = actx.currentTime;
  let t = ct + START_DELAY;
  for (var i = 0; i < word.length; i++) {
    let w = word[i];
    if (w == " ") {
      t += tfd * INTRA_WORD_SPACING;
      continue;
    }

    let c = codes[w.toUpperCase()];

    for (var j = 0; j < c.length; j++) {
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

module.exports = { initAudioContext, playWord };
