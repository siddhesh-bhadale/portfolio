import { useEffect, useState } from 'react';
import { headerNavIds, navItems } from '@/data/navigation';
import { profile } from '@/data/profile';
import { ThemeToggle } from '@/components/ui';
import { cn } from '@/utils/cn';
import styles from './Header.module.css';

interface HeaderProps {
  activeId: string;
}

const headerLinks = navItems.filter((item) => headerNavIds.includes(item.id));
const menuLinks = navItems.filter((item) => item.id !== 'top');

export function Header({ activeId }: HeaderProps) {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* The header tightens once the hero is behind you. */
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes the menu; body scroll locks while it is open. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={cn(styles.header, condensed && styles.condensed)}>
      <div className={styles.inner}>
        <a href="#top" className={styles.identity}>
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.name}>{profile.name}</span>
          <span className={styles.role}>{profile.role}</span>
        </a>

        <nav className={styles.nav} aria-label="Sections">
          <ul className={styles.navList}>
            {headerLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(styles.navLink, activeId === item.id && styles.navLinkActive)}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  {item.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="#contact" className={styles.cta}>
            Get in touch
          </a>
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
          >
            <span className={styles.visuallyHidden}>
              {menuOpen ? 'Close menu' : 'Open menu'}
            </span>
            <span className={cn(styles.bars, menuOpen && styles.barsOpen)} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        className={cn(styles.menu, menuOpen && styles.menuOpen)}
        hidden={!menuOpen}
      >
        <nav aria-label="All sections">
          <ul className={styles.menuList}>
            {menuLinks.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={styles.menuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className={styles.menuMeta}>
          {profile.socials.map((social) => (
            <li key={social.id}>
              <a href={social.href} className={styles.menuMetaLink}>
                {social.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
