import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  value: string;
  /** What is being copied, used in the accessible label. */
  label: string;
}

/**
 * Copies a value and confirms it in place. The button keeps the same verb
 * through the interaction: "Copy" becomes "Copied", never "Success".
 */
export function CopyButton({ value, label }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setState('idle'), 2200);
  };

  const text =
    state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy' : 'Copy';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(styles.button, state !== 'idle' && styles.active)}
      aria-label={`Copy ${label}`}
    >
      <span className={styles.icon} aria-hidden="true">
        {state === 'copied' ? (
          <svg viewBox="0 0 14 14" fill="none">
            <path
              d="M2.5 7.4 5.4 10.3 11.5 4.2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 14 14" fill="none">
            <rect
              x="4.6"
              y="4.6"
              width="7.4"
              height="7.4"
              rx="1.4"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M9.4 2.6H3.4A1.4 1.4 0 0 0 2 4v6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span className={styles.text}>{text}</span>
    </button>
  );
}
