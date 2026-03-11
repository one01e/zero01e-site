export { COMMON_CONTENT } from "./common";
export { HOME_CONTENT } from "./home";
export { COMMUNITY_CONTENT } from "./community";
export { LABS_CONTENT } from "./labs";
export { ABOUT_CONTENT } from "./about";

import { COMMON_CONTENT } from "./common";
import { HOME_CONTENT } from "./home";
import { COMMUNITY_CONTENT } from "./community";
import { LABS_CONTENT } from "./labs";
import { ABOUT_CONTENT } from "./about";

export const SITE_CONTENT = {
  common: COMMON_CONTENT,
  home: HOME_CONTENT,
  community: COMMUNITY_CONTENT,
  labs: LABS_CONTENT,
  about: ABOUT_CONTENT,
} as const;
