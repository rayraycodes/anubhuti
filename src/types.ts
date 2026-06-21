/** In-page navigation targets / page routes for the marketing kit.
 *  - 'home'     → Landing (the opportunities home)
 *  - 'projects' → Project marketplace
 *  - 'about'    → Organizational / About ("our story")
 *  - 'circle'   → The Circle (partner network)
 *  - 'platform' → the separate Browse/platform kit (not part of this build) */
export type NavTarget = 'home' | 'projects' | 'about' | 'circle' | 'platform';

/** The pages this app actually renders (everything except the external platform). */
export type Page = Exclude<NavTarget, 'platform'>;

export type OnNav = (to: NavTarget) => void;
