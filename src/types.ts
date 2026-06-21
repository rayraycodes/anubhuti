/** In-page navigation targets used across the marketing kit.
 *  - 'home'     → Landing page
 *  - 'about'    → Organizational / About page
 *  - 'platform' → the separate Browse/platform kit (not part of this build) */
export type NavTarget = 'home' | 'about' | 'platform';

export type OnNav = (to: NavTarget) => void;
