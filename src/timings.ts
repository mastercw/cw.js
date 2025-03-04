/**
 * Calculate the dit length in seconds based on words per minute
 * @param wpm Words per minute
 * @returns Dit length in seconds
 */
function tdit(wpm: number): number {
  return 60 / (50 * wpm);
}

/**
 * Calculate the Farnsworth dit length in seconds
 * @param wpm Words per minute
 * @param fwpm Farnsworth words per minute (defaults to wpm if not provided)
 * @returns Farnsworth dit length in seconds
 */
function tfdit(wpm: number, fwpm?: number): number {
  // Ensure fwpm defaults to wpm when undefined or null
  const effectiveFwpm = fwpm === undefined ? wpm : fwpm;
  return (300 * wpm - 186 * effectiveFwpm) / (95 * wpm * effectiveFwpm);
}

export { tdit, tfdit };
