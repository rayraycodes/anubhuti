import { describe, it, expect } from 'vitest';
import {
  OPPORTUNITIES,
  CATEGORIES,
  daysUntil,
  deadlineInfo,
  filterOpportunities,
  sortByDeadline,
  categoryCounts,
  type Opportunity,
} from './opportunities';

const at = (iso: string) => new Date(iso);

const sample: Opportunity[] = [
  { id: 'a', title: 'Alpha Scholarship', org: 'Org A', category: 'Scholarships', region: 'Kathmandu', funded: true, deadline: '2026-06-25', url: 'https://a', summary: 'help with tuition' },
  { id: 'b', title: 'Beta Fellowship', org: 'Org B', category: 'Fellowships', region: 'Pokhara', funded: false, deadline: null, url: 'https://b', summary: 'mentorship' },
  { id: 'c', title: 'Gamma Internship', org: 'Org C', category: 'Internships', region: 'Kathmandu', funded: true, deadline: '2026-01-01', url: 'https://c', summary: 'work experience' },
];

describe('daysUntil', () => {
  it('returns null for rolling deadlines', () => {
    expect(daysUntil(null)).toBeNull();
  });
  it('counts whole days to the deadline', () => {
    expect(daysUntil('2026-06-25', at('2026-06-20T23:59:59'))).toBe(5);
  });
  it('is negative once the deadline has passed', () => {
    expect(daysUntil('2026-06-01', at('2026-06-20T12:00:00'))!).toBeLessThan(0);
  });
});

describe('deadlineInfo', () => {
  it('labels rolling deadlines', () => {
    expect(deadlineInfo(null)).toMatchObject({ rolling: true, label: 'Rolling' });
  });
  it('flags soon-closing deadlines', () => {
    const info = deadlineInfo('2026-06-25', at('2026-06-20T23:59:59'));
    expect(info).toMatchObject({ closing: true, closed: false, label: '5 days left' });
  });
  it('marks past deadlines closed', () => {
    expect(deadlineInfo('2026-06-01', at('2026-06-20T12:00:00'))).toMatchObject({
      closed: true,
      label: 'Closed',
    });
  });
});

describe('filterOpportunities', () => {
  it('filters by category', () => {
    expect(filterOpportunities(sample, { category: 'Fellowships' }).map((o) => o.id)).toEqual(['b']);
  });
  it('filters by region', () => {
    expect(filterOpportunities(sample, { region: 'Kathmandu' }).map((o) => o.id)).toEqual(['a', 'c']);
  });
  it('matches free-text against title, org, region and summary', () => {
    expect(filterOpportunities(sample, { q: 'mentorship' }).map((o) => o.id)).toEqual(['b']);
    expect(filterOpportunities(sample, { q: 'kathmandu' }).map((o) => o.id)).toEqual(['a', 'c']);
  });
  it('treats "All" / "Any region" as no filter', () => {
    expect(filterOpportunities(sample, { category: 'All', region: 'Any region' })).toHaveLength(3);
  });
});

describe('sortByDeadline', () => {
  it('orders live → rolling → closed', () => {
    const ids = sortByDeadline(sample, at('2026-06-20T23:59:59')).map((o) => o.id);
    expect(ids).toEqual(['a', 'b', 'c']); // a is upcoming, b rolling, c closed
  });
});

describe('categoryCounts', () => {
  it('excludes closed opportunities', () => {
    const counts = categoryCounts(sample, at('2026-06-20T23:59:59'));
    expect(counts.Scholarships).toBe(1);
    expect(counts.Fellowships).toBe(1);
    expect(counts.Internships).toBeUndefined(); // c is closed
  });
});

describe('OPPORTUNITIES dataset integrity', () => {
  it('is non-empty and uniquely identified', () => {
    expect(OPPORTUNITIES.length).toBeGreaterThan(0);
    const ids = OPPORTUNITIES.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('uses known categories and well-formed links/deadlines', () => {
    for (const o of OPPORTUNITIES) {
      expect(CATEGORIES).toContain(o.category);
      expect(o.url).toMatch(/^https?:\/\//);
      if (o.deadline !== null) expect(o.deadline).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
