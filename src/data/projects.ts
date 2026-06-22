/* Anubhuti — project marketplace data + the submission form link.
   Projects are scoped, real-world briefs that organisations post for student
   cohorts to take on (theory → impact). The sample set below is illustrative. */

import type { AccentColor } from './opportunities';

// ---------------------------------------------------------------------------
// Submit-a-project Google Form.
// TODO: replace this placeholder with the real Google Form link, e.g.
//   https://docs.google.com/forms/d/e/<YOUR_FORM_ID>/viewform
// Everything else ("Submit a project" buttons, project-detail CTA) reads this.
// ---------------------------------------------------------------------------
export const PROJECT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf_ANUBHUTI_PLACEHOLDER_REPLACE_ME/viewform';

/** Open the project-submission Google Form in a new tab. */
export function openProjectForm(): void {
  window.open(PROJECT_FORM_URL, '_blank', 'noopener,noreferrer');
}

export interface Project {
  id: string;
  title: string;
  org: string;
  location: string;
  /** Days until the brief closes. */
  daysLeft: number;
  status: string;
  /** One-line teaser. */
  desc: string;
  /** A couple of sentences shown in the detail dialog. */
  details: string;
  /** Skills a cohort would use / build. */
  tags: string[];
  color: AccentColor;
}

export const PROJECTS: Project[] = [
  {
    id: 'epustakalaya-transcription',
    title: 'Audio transcription for E-Pustakalaya',
    org: 'OLE Nepal × Rotaract Patan',
    location: 'Patan',
    daysLeft: 12,
    status: 'Open',
    desc: 'Transcribe and time-align Nepali audio lessons so they reach low-vision and early-grade learners.',
    details:
      'A small cohort will transcribe and time-align a set of Nepali audio lessons, then quality-check them against the source. The result ships into the E-Pustakalaya digital library so low-vision and early-grade learners can follow along.',
    tags: ['Transcription', 'Nepali', 'Accessibility'],
    color: 'green',
  },
  {
    id: 'fish-coop-market-research',
    title: 'Local market-trends research report',
    org: 'Sustainable Fish Co-op',
    location: 'Pokhara',
    daysLeft: 18,
    status: 'Open',
    desc: 'Survey Phewa-area buyers and compile a pricing & demand report for a fairer season.',
    details:
      'Design a short survey, interview buyers around Phewa Lake, and turn the findings into a clear pricing-and-demand report. The co-op will use it to plan a fairer, more stable season for its members.',
    tags: ['Research', 'Data', 'Markets'],
    color: 'blue',
  },
  {
    id: 'hci-brand-identity',
    title: 'Brand identity for a youth-led NGO',
    org: 'Himalayan Climate Initiative',
    location: 'Kathmandu',
    daysLeft: 7,
    status: 'Closing soon',
    desc: 'Design a logo, colour system and social templates for a circular-economy campaign.',
    details:
      'Create a lightweight brand kit — logo, colour system and a set of social templates — for a new circular-economy campaign aimed at school clubs. Deliver source files plus a one-page usage guide.',
    tags: ['Branding', 'Design', 'Logo'],
    color: 'sun',
  },
  {
    id: 'cfn-terai-dashboard',
    title: 'Climate-data dashboard for the Terai',
    org: 'Code for Nepal',
    location: 'Remote',
    daysLeft: 15,
    status: 'Open',
    desc: 'Build an open dashboard visualising temperature and flood data for local journalists.',
    details:
      'Build an open, mobile-friendly dashboard that visualises temperature and flood data for districts across the Terai, so local journalists can tell clearer climate stories. Open-source the code at the end.',
    tags: ['React', 'Data viz', 'Climate'],
    color: 'blue',
  },
  {
    id: 'ole-stem-translation',
    title: 'Translate STEM worksheets into Nepali',
    org: 'OLE Nepal',
    location: 'Remote',
    daysLeft: 25,
    status: 'Open',
    desc: 'Localise grade-7 science and maths worksheets, keeping terms curriculum-consistent.',
    details:
      'Localise a set of grade-7 science and maths worksheets into Nepali, keeping terminology consistent with the national curriculum. A reviewer pass ensures clarity for students and teachers.',
    tags: ['Translation', 'Education', 'STEM'],
    color: 'green',
  },
  {
    id: 'leo-literacy-campaign',
    title: 'Social campaign for a literacy drive',
    org: 'Leo District 325',
    location: 'Lalitpur',
    daysLeft: 9,
    status: 'Open',
    desc: 'Plan and produce a two-week campaign to recruit volunteers for a reading programme.',
    details:
      'Plan and produce a two-week social-media campaign — copy, graphics and a simple content calendar — to recruit volunteers for a community reading programme. Hand over assets the chapter can reuse.',
    tags: ['Marketing', 'Content', 'Social'],
    color: 'yellow',
  },
  {
    id: 'hci-photo-story',
    title: 'Photo story: women in mountain agriculture',
    org: 'Himalayan Climate Initiative',
    location: 'Mustang',
    daysLeft: 30,
    status: 'Open',
    desc: 'Document the daily work of women farmers for an exhibition and fundraising microsite.',
    details:
      'Document the daily work of women farmers in the high valleys through photography and short captions, for an exhibition and a fundraising microsite. Travel support is arranged with the host org.',
    tags: ['Photography', 'Storytelling'],
    color: 'sun',
  },
  {
    id: 'toastmasters-curriculum',
    title: 'Public-speaking workshop curriculum',
    org: 'Toastmasters Kathmandu',
    location: 'Kathmandu',
    daysLeft: 5,
    status: 'Closing soon',
    desc: 'Co-write a four-session curriculum that helps first-time speakers build confidence.',
    details:
      'Co-write a four-session curriculum — outlines, exercises and a facilitator guide — that helps first-time speakers structure a talk and build confidence. Pilot it with one practice group.',
    tags: ['Curriculum', 'Communication'],
    color: 'blue',
  },
  {
    id: 'rotaract-blood-donor-app',
    title: 'Blood-donor matching app prototype',
    org: 'Rotaract Himalaya',
    location: 'Kathmandu / Remote',
    daysLeft: 21,
    status: 'Open',
    desc: 'Prototype a lightweight app matching urgent blood requests to nearby donors.',
    details:
      'Prototype a lightweight app that matches urgent blood requests to nearby registered donors across the valley. Focus on a clear flow and a working demo, not production infrastructure.',
    tags: ['Flutter', 'Mobile', 'Health'],
    color: 'crimson',
  },
];
