/* Anubhuti iconography — Lucide (clean 2px-stroke line icons).
   The prototype loaded `lucide@0.379.0` via CDN and referenced icons by
   kebab-case name (e.g. data arrays like CATS). We mirror that here with the
   `lucide-react` package pinned to the same version (later Lucide builds dropped
   the brand/social glyphs — instagram/facebook/etc. — that the footer needs),
   exposing a name → component map so the content data can stay string-keyed. */
import {
  ArrowRight,
  ArrowUpRight,
  Apple,
  BookOpen,
  Brain,
  Briefcase,
  Clock,
  Compass,
  EyeOff,
  Facebook,
  GitMerge,
  Globe,
  Globe2,
  GraduationCap,
  Hammer,
  HandHelping,
  Heart,
  HeartHandshake,
  Hourglass,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  MessageCircle,
  Mic,
  Network,
  Play,
  Presentation,
  Search,
  Sparkles,
  Trophy,
  Users,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  apple: Apple,
  'book-open': BookOpen,
  brain: Brain,
  briefcase: Briefcase,
  clock: Clock,
  compass: Compass,
  'eye-off': EyeOff,
  facebook: Facebook,
  'git-merge': GitMerge,
  globe: Globe,
  'globe-2': Globe2,
  'graduation-cap': GraduationCap,
  hammer: Hammer,
  'hand-helping': HandHelping,
  heart: Heart,
  'heart-handshake': HeartHandshake,
  hourglass: Hourglass,
  instagram: Instagram,
  layers: Layers,
  linkedin: Linkedin,
  'map-pin': MapPin,
  'message-circle': MessageCircle,
  mic: Mic,
  network: Network,
  play: Play,
  presentation: Presentation,
  search: Search,
  sparkles: Sparkles,
  trophy: Trophy,
  users: Users,
  youtube: Youtube,
};

export type IconName = keyof typeof ICONS | string;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

/** Renders a Lucide icon by its kebab-case name. */
export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  const Glyph = ICONS[name];
  if (!Glyph) {
    if (import.meta.env.DEV) {
      console.warn(`Icon: unknown name "${name}"`);
    }
    return null;
  }
  return <Glyph size={size} className={className} aria-hidden {...rest} />;
}
