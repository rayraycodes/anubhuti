/* Anubhuti — partner network (the "Circle").
   Real service organisations and chapters Anubhuti works with. */

import type { AccentColor } from './opportunities';

export interface Partner {
  name: string;
  role: string;
  location: string;
  desc: string;
  color: AccentColor;
}

export const PARTNERS: Partner[] = [
  {
    name: 'Rotary',
    role: 'Service organisation',
    location: 'Worldwide · Nepal',
    desc: 'A global network of service clubs; in Nepal, Rotary clubs fund and run community, health and education projects.',
    color: 'crimson',
  },
  {
    name: 'Rotaract',
    role: 'Youth service · 18–30',
    location: 'Nepal',
    desc: "Rotary's young-adult chapters across Nepal, leading hands-on community-service and leadership projects.",
    color: 'crimson',
  },
  {
    name: 'Leo',
    role: 'Youth service · 12–30',
    location: 'Nepal',
    desc: 'The youth wing of Lions Clubs — young people volunteering and leading service drives nationwide.',
    color: 'yellow',
  },
  {
    name: 'Lions',
    role: 'Service organisation',
    location: 'Worldwide · Nepal',
    desc: 'Lions Clubs International — service in sight, health, environment and disaster relief across Nepal.',
    color: 'blue',
  },
  {
    name: 'Toastmasters',
    role: 'Communication & leadership',
    location: 'Nepal',
    desc: 'Clubs where members practise public speaking and leadership in a supportive, structured setting.',
    color: 'blue',
  },
  {
    name: 'OLE Nepal',
    role: 'Digital education',
    location: 'Kathmandu',
    desc: 'Open Learning Exchange Nepal — digital learning and the E-Pustakalaya library for schools nationwide.',
    color: 'green',
  },
];

/** Monogram for a partner — first letters of two words, or first two letters. */
export function initials(name: string): string {
  const words = name.split(/[\s·×]+/).filter((w) => w && !/^(of|the|and|&)$/i.test(w));
  if (words.length >= 2) return (words[0]![0]! + words[1]![0]!).toUpperCase();
  return name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();
}
