/* Anubhuti — opportunities data + helpers.
   The OPPORTUNITIES array holds REAL programs relevant to Nepali youth
   (researched, with source links). Deadlines are real where known, or null
   for rolling / annual / varies — we never invent a countdown. */

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

// ---------------------------------------------------------------------------
// REAL opportunities relevant to Nepali youth — each links to its official page.
// Deadlines are the real dates where known, else null (rolling / annual / varies).
// Verified mid-2026; refresh as programs open & close.
// ---------------------------------------------------------------------------
export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'teach-for-nepal',
    title: 'Teach For Nepal Fellowship',
    org: 'Teach For Nepal',
    category: 'Fellowships',
    region: 'Nepal',
    funded: true,
    deadline: null,
    url: 'https://www.teachfornepal.org/tfn/apply-now/',
    summary: 'Two-year paid fellowship placing graduates as full-time teachers in under-resourced Nepali schools.',
  },
  {
    id: 'daayitwa-geep',
    title: 'Daayitwa GEEP Fellowship',
    org: 'Daayitwa',
    category: 'Fellowships',
    region: 'Nepal',
    funded: true,
    deadline: '2026-02-27',
    url: 'https://www.daayitwa.org/focus-areas/growth-entrepreneurship-and-employment-promotion-program-geep-fellowship-2026',
    summary: 'Three-month stipended fellowship placing young professionals in municipalities to promote jobs and entrepreneurship.',
  },
  {
    id: 'daayitwa-public-service',
    title: 'Daayitwa Nepal Public Service Fellowship',
    org: 'Daayitwa',
    category: 'Fellowships',
    region: 'Kathmandu',
    funded: true,
    deadline: null,
    url: 'https://www.daayitwa.org/focus-areas/daayitwa-nepal-public-service-fellowship',
    summary: 'Fellowship pairing youth with government agencies and parliamentarians to conduct applied policy research.',
  },
  {
    id: 'uws-nepal-fellowship',
    title: 'UWS Nepal Fellowship Program',
    org: 'United World Schools Nepal',
    category: 'Fellowships',
    region: 'Nepal',
    funded: true,
    deadline: null,
    url: 'https://uwsnepal.org/fellowship/',
    summary: 'Two-year fellowship empowering young Nepali graduates to teach and lead in under-resourced schools.',
  },
  {
    id: 'fusemachines-ai-fellowship',
    title: 'AI Fellowship Nepal',
    org: 'Fusemachines',
    category: 'Fellowships',
    region: 'Online',
    funded: false,
    deadline: null,
    url: 'https://fuse.ai/ai-fellowship/nepal/',
    summary: 'Six-month certified, primarily online program building practical artificial-intelligence skills for Nepali learners.',
  },
  {
    id: 'global-ugrad',
    title: 'Global UGRAD Exchange Program',
    org: 'USEF-Nepal · U.S. Department of State',
    category: 'Exchange',
    region: 'Global',
    funded: true,
    deadline: null,
    url: 'https://usefnepal.org/fulbright/global-undergrad-exchange-fellowship-ugrad/program-information-and-application-link/',
    summary: 'Fully funded one-semester exchange for Nepali undergraduates to study at U.S. institutions.',
  },
  {
    id: 'fulbright-ffsp',
    title: "Fulbright Foreign Student (Master's) Program",
    org: 'USEF-Nepal · Fulbright Commission',
    category: 'Scholarships',
    region: 'Global',
    funded: true,
    deadline: '2026-05-31',
    url: 'https://usefnepal.org/fulbright/ffsp/',
    summary: "Fully funded scholarship for Nepali citizens to pursue a master's degree in the United States.",
  },
  {
    id: 'chevening',
    title: 'Chevening Scholarships',
    org: 'UK Government · Chevening',
    category: 'Scholarships',
    region: 'Global',
    funded: true,
    deadline: null,
    url: 'https://www.chevening.org/scholarship/nepal/',
    summary: "Fully funded UK master's scholarship for outstanding Nepali professionals with leadership potential.",
  },
  {
    id: 'ku-scholarships',
    title: 'Kathmandu University Need & Merit Scholarships',
    org: 'Kathmandu University',
    category: 'Scholarships',
    region: 'Lalitpur',
    funded: true,
    deadline: null,
    url: 'https://ku.edu.np/scholarships-aid',
    summary: 'Full or partial scholarships for meritorious and economically disadvantaged students at Kathmandu University.',
  },
  {
    id: 'tu-scholarships',
    title: 'Tribhuvan University Scholarships',
    org: 'Tribhuvan University',
    category: 'Scholarships',
    region: 'Kathmandu',
    funded: true,
    deadline: null,
    url: 'https://tu.edu.np/pages/scholorship-20',
    summary: "Merit and reservation-based scholarships across Tribhuvan University's academic programs.",
  },
  {
    id: 'hult-prize-nepal',
    title: 'Hult Prize Nepal',
    org: 'Hult Prize · British Council Nepal',
    category: 'Competitions',
    region: 'Lalitpur',
    funded: false,
    deadline: null,
    url: 'https://np.linkedin.com/company/hult-prize-nepal',
    summary: 'National student social-entrepreneurship competition feeding into Hult Prize global finals.',
  },
  {
    id: 'nepal-startup-hackathon',
    title: 'Nepal Startup Innovation Hackathon',
    org: 'Glocal Pvt. Ltd.',
    category: 'Competitions',
    region: 'Lalitpur',
    funded: false,
    deadline: '2026-04-25',
    url: 'https://glocalnepal.com/nepal-startup-innovation-hackathon-2026/',
    summary: 'Free three-day innovation challenge for youth to solve national problems through technology.',
  },
  {
    id: 'deerhack',
    title: 'DeerHack',
    org: 'Deerwalk Institute of Technology',
    category: 'Competitions',
    region: 'Kathmandu',
    funded: false,
    deadline: null,
    url: 'https://deerhack.deerwalk.edu.np/',
    summary: 'Annual 48-hour hackathon in Kathmandu for students to build AI, blockchain and environment solutions.',
  },
  {
    id: 'glocal-teen-hero',
    title: 'Glocal Teen Hero (South Asia)',
    org: 'Glocal · Golchha Group',
    category: 'Awards',
    region: 'Nepal',
    funded: false,
    deadline: '2026-07-25',
    url: 'https://glocalteenhero.com/',
    summary: 'Recognition platform honouring teen changemakers aged 13–19 for leadership and social impact.',
  },
  {
    id: 'surya-nepal-asha',
    title: 'Surya Nepal Asha Social Entrepreneurship Award',
    org: 'Surya Nepal Pvt. Ltd.',
    category: 'Awards',
    region: 'Nepal',
    funded: true,
    deadline: null,
    url: 'https://www.snpl.com.np/csr/asha',
    summary: 'Award recognising and supporting Nepali social entrepreneurs driving change in their communities.',
  },
  {
    id: 'vin-fellowship',
    title: 'VIN Fellowship Program',
    org: 'Volunteers Initiative Nepal',
    category: 'Fellowships',
    region: 'Kathmandu',
    funded: false,
    deadline: null,
    url: 'https://www.volunteersinitiativenepal.org/fellowship-opportunities-in-nepal/',
    summary: "Immersive 3–12 month fellowship in public health, women's rights, youth and environment.",
  },
  {
    id: 'vin-volunteering',
    title: 'VIN Volunteer & Internship Programs',
    org: 'Volunteers Initiative Nepal',
    category: 'Volunteering',
    region: 'Kathmandu',
    funded: false,
    deadline: null,
    url: 'https://www.volunteersinitiativenepal.org/volunteer-and-internship-programs/',
    summary: 'Community projects in women’s empowerment, health, child development and youth near Kathmandu.',
  },
  {
    id: 'jcyc-internship',
    title: 'JCYC Nepal Internship Program',
    org: 'Junior Chamber Youth Council Nepal',
    category: 'Internships',
    region: 'Kathmandu',
    funded: false,
    deadline: null,
    url: 'https://www.jcycnepal.org.np/get-involved/internship/',
    summary: 'Three-to-six-month internships supporting Nepali children and youth-focused community projects.',
  },
  {
    id: 'undp-internship',
    title: 'UNDP Nepal Internship Programme',
    org: 'United Nations Development Programme',
    category: 'Internships',
    region: 'Kathmandu',
    funded: true,
    deadline: null,
    url: 'https://www.undp.org/careers/people-programmes',
    summary: 'Stipended internships for Nepali students and graduates in development programmes in Kathmandu.',
  },
  {
    id: 'all-in-fellowship',
    title: 'ALL IN Solutions Fellowship',
    org: 'ALL IN · Nepal partners',
    category: 'Fellowships',
    region: 'Nepal',
    funded: true,
    deadline: null,
    url: 'https://www2.fundsforngos.org/environment/apply-for-all-in-solutions-fellowship-program-nepal/',
    summary: 'Six-month fellowship for emerging leaders working on democracy, climate justice and social equity.',
  },
  {
    id: 'nyccc',
    title: 'National Youth Conference on Climate Change',
    org: 'Nepalese Youth for Climate Action',
    category: 'Conferences',
    region: 'Kathmandu',
    funded: false,
    deadline: null,
    url: 'https://www.nyca.net.np/national-intervention/national-youth-conference-on-climate-change.html',
    summary: 'Flagship youth-led conference with climate workshops, expert sessions and a youth declaration.',
  },
  {
    id: 'ysali',
    title: 'Young South Asian Leaders Initiative',
    org: 'U.S. State Dept · East-West Center',
    category: 'Workshops',
    region: 'Global',
    funded: true,
    deadline: null,
    url: 'https://www.eastwestcenter.org/projects/young-south-asian-leaders-initiative-ysali',
    summary: 'Regional leadership workshops on innovation, civic engagement and entrepreneurship for Nepali youth.',
  },
];
