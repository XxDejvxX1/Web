import { CodeMotion } from "./scenes/Code";
import { InterfacesMotion } from "./scenes/Interfaces";
import { LaunchMotion } from "./scenes/Launch";
import { StrategyMotion } from "./scenes/Strategy";

/**
 * The bento artwork, keyed by the card id in content/site.ts.
 *
 * Each scene is pixel art drawn as SVG on a 12-unit lattice and driven by a
 * shared timeline — see ./pixel.tsx and ./timeline.ts. They replace the WebM
 * clips these cards used to carry: the clips had to be flattened onto black and
 * colour-keyed back to transparency, which is what made their linework crawl,
 * and Safari could not play them at all.
 */
export const MOTION_SCENES = {
  strategy: StrategyMotion,
  interfaces: InterfacesMotion,
  code: CodeMotion,
  care: LaunchMotion,
} as const;

export type MotionSceneName = keyof typeof MOTION_SCENES;
