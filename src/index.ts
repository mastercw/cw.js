import { tdit, tfdit } from "./timings.js";
import { codes } from "./codes.js";
import { initAudioContext, play } from "./audio.js";

// Individual exports for backward compatibility and tree-shaking
export { tdit, tfdit, codes, initAudioContext, play };

// Create a unified cw object with all functionality
const cw = {
  tdit,
  tfdit,
  codes,
  initAudioContext,
  play
};

// Default export for a more consistent API across all environments
export default cw;
