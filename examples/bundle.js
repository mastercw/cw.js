(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.cw = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./codes":2}],2:[function(require,module,exports){
const codes = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
  "=": "-...-",
  ".": ".-.-.-",
  ",": "--..--",
  "/": "-..-.",
  "?": "..--..",
};

module.exports = { codes };

},{}],3:[function(require,module,exports){
const { tdit, tfdit } = require("./timings");
const { codes } = require("./codes");
const { initAudioContext, playWord } = require("./audio");

module.exports = { tdit, tfdit, codes, initAudioContext, playWord };

},{"./audio":1,"./codes":2,"./timings":4}],4:[function(require,module,exports){
function tdit(wpm) {
  return 60 / (50 * wpm);
}

function tfdit(wpm, fwpm) {
  var fwpm = fwpm || wpm;
  return (300 * wpm - 186 * fwpm) / (95 * wpm * fwpm);
}

module.exports = { tdit, tfdit };

},{}]},{},[3])(3)
});
