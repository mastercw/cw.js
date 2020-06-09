function tdit(wpm) {
  return 60 / (50 * wpm);
}

function tfdit(wpm, fwpm) {
  var fwpm = fwpm || wpm;
  return (300 * wpm - 186 * fwpm) / (95 * wpm * fwpm);
}

module.exports = { tdit, tfdit };
