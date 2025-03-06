/**
 * Morse Code Timing Utilities
 * 
 * This module provides functions for calculating Morse code timing parameters.
 * 
 * Farnsworth Timing:
 * Farnsworth timing is a method of sending Morse code where the individual characters
 * are sent at a higher speed (wpm), but the spacing between characters and words is
 * increased to achieve a lower effective speed (fwpm). This technique was developed by
 * Russ Farnsworth (W6TTB) to help students learn Morse code more effectively.
 * 
 * The idea behind Farnsworth timing is that learners can become accustomed to hearing
 * and recognizing characters at higher speeds, while the extended spacing gives them
 * more time to process each character before the next one arrives. As proficiency
 * increases, the spacing can be gradually reduced until standard timing is achieved.
 * 
 * In standard Morse timing, characters and spaces are proportional to the dit length.
 * In Farnsworth timing, the characters maintain the same internal timing as they would
 * at the higher speed, but the spaces between characters and words are extended.
 */

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
