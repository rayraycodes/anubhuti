import type { OnNav } from './types';
import type { Opportunity, OppFilters } from './data/opportunities';

/** The interactive actions wired at the App root and threaded through pages. */
export interface AppActions {
  /** Switch page. */
  onNav: OnNav;
  /** Go to the opportunities explorer, optionally with filters pre-applied. */
  goBrowse: (filters?: OppFilters) => void;
  /** Open the detail dialog for one opportunity. */
  openDetail: (o: Opportunity) => void;
  /** Open the "post an opportunity" dialog. */
  openPost: () => void;
}
