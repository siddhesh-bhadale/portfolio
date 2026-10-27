import { useTheme } from '@/hooks';
import styles from './ThemeToggle.module.css';

/**
 * Light/dark switch. The thumb slides and the icon crossfades, so the
 * motion answers the click rather than decorating the page.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.thumb} data-dark={isDark} />
        <svg className={styles.icon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.2" />
          <path
            d="M8 1.4v1.7M8 12.9v1.7M14.6 8h-1.7M3.1 8H1.4M12.7 3.3l-1.2 1.2M4.5 11.5l-1.2 1.2M12.7 12.7l-1.2-1.2M4.5 4.5L3.3 3.3"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <svg className={styles.icon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.2 10.3A5.6 5.6 0 0 1 5.7 2.8a5.6 5.6 0 1 0 7.5 7.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
