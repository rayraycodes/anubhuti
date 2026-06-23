/* Anubhuti — opportunities data + helpers.
   The data itself lives in opportunities.json (real programs relevant to Nepali
   youth, each with a source link). Keeping it as data — not code — lets the
   health-check and refresh pipelines read & rewrite it without touching logic.
   Deadlines are real where known, or null for rolling / annual / varies. */

import opportunitiesData from './opportunities.json';

export type Category =
  | 'Scholarships'
  | 'Fellowships'
  | 'Internships'
  | 'Competitions'
  | 'Conferences'
  | 'Exchange'
  | 'Workshops'
  | 'Volunteering'
  | 'Awards';

export type AccentColor = 'crimson' | 'blue' | 'green' | 'yellow' | 'sun';

export interface Opportunity {
  id: string;
  title: string;
  org: string;
  category: Category;
  /** A Nepali place, or 'Online' / 'Global'. */
  region: string;
  funded: boolean;
  /** ISO 'YYYY-MM-DD', or null for rolling / annual / varies. */
  deadline: string | null;
  /** Real official/info link. */
  url: string;
  summary: string;
  /** Set on opportunities a user posted in-session. */
  posted?: boolean;
}

/** Icon + accent for each category (Lucide icon names; prayer-flag accents). */
export const CATEGORY_META: Record<Category, { icon: string; color: AccentColor }> = {
  Scholarships: { icon: 'graduation-cap', color: 'crimson' },
  Fellowships: { icon: 'users', color: 'blue' },
  Internships: { icon: 'briefcase', color: 'green' },
  Competitions: { icon: 'trophy', color: 'yellow' },
  Conferences: { icon: 'mic', color: 'blue' },
  Exchange: { icon: 'globe', color: 'green' },
  Workshops: { icon: 'presentation', color: 'sun' },
  Volunteering: { icon: 'heart-handshake', color: 'green' },
  Awards: { icon: 'trophy', color: 'crimson' },
};

export const CATEGORIES = Object.keys(CATEGORY_META) as Category[];

/** Nepali regions for the "Any region" filter / typeahead, plus Online / Global. */
export const REGIONS = [
  'Kathmandu',
  'Lalitpur',
  'Bhaktapur',
  'Pokhara',
  'Chitwan',
  'Biratnagar',
  'Butwal',
  'Birgunj',
  'Dharan',
  'Janakpur',
  'Nepalgunj',
  'Nepal',
  'Online',
  'Global',
];

export const accentVar = (color: AccentColor): string =>
  ({
    crimson: 'var(--anu-flag-red)',
    blue: 'var(--anu-flag-blue)',
    green: 'var(--anu-flag-green)',
    yellow: 'var(--anu-flag-yellow)',
    sun: 'var(--anu-sun-400)',
  })[color];

/** Whole-day count from today (local) until the deadline; null if no deadline. */
export function daysUntil(deadline: string | null, now: Date = new Date()): number | null {
  if (!deadline) return null;
  const end = new Date(deadline + 'T23:59:59');
  if (Number.isNaN(end.getTime())) return null;
  const ms = end.getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}

export interface DeadlineInfo {
  label: string;
  closing: boolean;
  closed: boolean;
  rolling: boolean;
}

export function deadlineInfo(deadline: string | null, now: Date = new Date()): DeadlineInfo {
  const days = daysUntil(deadline, now);
  if (days === null) return { label: 'Rolling', closing: false, closed: false, rolling: true };
  if (days < 0) return { label: 'Closed', closing: false, closed: true, rolling: false };
  if (days === 0) return { label: 'Closes today', closing: true, closed: false, rolling: false };
  return {
    label: `${days} day${days === 1 ? '' : 's'} left`,
    closing: days <= 7,
    closed: false,
    rolling: false,
  };
}

export interface OppFilters {
  q?: string;
  region?: string;
  category?: Category | 'All';
}

/** Client-side search + filter over the opportunity list. */
export function filterOpportunities(list: Opportunity[], filters: OppFilters): Opportunity[] {
  const q = (filters.q ?? '').trim().toLowerCase();
  const region = filters.region && filters.region !== 'Any region' ? filters.region : '';
  const category = filters.category && filters.category !== 'All' ? filters.category : '';

  return list.filter((o) => {
    if (category && o.category !== category) return false;
    if (region && o.region !== region) return false;
    if (q) {
      const hay = `${o.title} ${o.org} ${o.category} ${o.region} ${o.summary}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/** Sort: live (soonest deadline) first, rolling next, closed last. */
export function sortByDeadline(list: Opportunity[], now: Date = new Date()): Opportunity[] {
  const rank = (o: Opportunity) => {
    const d = daysUntil(o.deadline, now);
    if (d === null) return { bucket: 1, days: 0 };
    if (d < 0) return { bucket: 2, days: -d };
    return { bucket: 0, days: d };
  };
  return [...list].sort((a, b) => {
    const ra = rank(a);
    const rb = rank(b);
    if (ra.bucket !== rb.bucket) return ra.bucket - rb.bucket;
    return ra.days - rb.days;
  });
}

/** Count of (non-closed) opportunities per category — for the real category tiles. */
export function categoryCounts(list: Opportunity[], now: Date = new Date()): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const o of list) {
    if (daysUntil(o.deadline, now) !== null && daysUntil(o.deadline, now)! < 0) continue;
    counts[o.category] = (counts[o.category] ?? 0) + 1;
  }
  return counts;
}

/** Real opportunities, loaded from opportunities.json (see header). */
export const OPPORTUNITIES = opportunitiesData as Opportunity[];
