/** In-page navigation targets / page routes for the marketing kit.
 *  - 'home'     → Landing
 *  - 'browse'   → Opportunities explorer (search + filter)
 *  - 'projects' → Project marketplace
 *  - 'about'    → Organizational / About ("our story")
 *  - 'circle'   → The Circle (partner network)
 *  - 'platform' → reserved for not-yet-built flows (e.g. sign-in) */
export type NavTarget = 'home' | 'browse' | 'projects' | 'about' | 'circle' | 'platform';

/** The pages this app actually renders. */
export type Page = Exclude<NavTarget, 'platform'>;

export type OnNav = (to: NavTarget) => void;
