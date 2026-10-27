import type { NavItem } from '@/types';

/**
 * Order matters: this array drives the header links, the vertical rail and
 * the scroll-spy. Section elements must use these exact ids.
 */
export const navItems: NavItem[] = [
  { id: 'top', label: 'Start', short: 'Start' },
  { id: 'work', label: 'Selected work', short: 'Work' },
  { id: 'experience', label: 'Experience', short: 'Experience' },
  { id: 'open-source', label: 'Open source', short: 'Open source' },
  { id: 'skills', label: 'Skills', short: 'Skills' },
  { id: 'about', label: 'About', short: 'About' },
  { id: 'contact', label: 'Contact', short: 'Contact' },
];

/** The subset shown in the top header on wider screens. */
export const headerNavIds = ['work', 'experience', 'open-source', 'about'];
