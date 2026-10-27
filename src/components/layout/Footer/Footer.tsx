import { profile } from '@/data/profile';
import { education, languages } from '@/data/openSource';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.education}>
          <h2 className={styles.heading}>Education</h2>
          {education.map((item) => (
            <div key={item.id} className={styles.educationItem}>
              <p className={styles.qualification}>{item.qualification}</p>
              <p className={styles.institution}>
                {item.institution}, {item.location}
              </p>
              <p className={styles.period}>{item.period}</p>
            </div>
          ))}
          <p className={styles.languages}>
            Languages: {languages.join(', ')}
          </p>
        </div>

        <div className={styles.elsewhere}>
          <h2 className={styles.heading}>Elsewhere</h2>
          <ul className={styles.links}>
            {profile.socials.map((social) => (
              <li key={social.id}>
                <a
                  className={styles.link}
                  href={social.href}
                  target={social.id === 'email' ? undefined : '_blank'}
                  rel={social.id === 'email' ? undefined : 'noreferrer'}
                >
                  {social.display}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.colophon}>
          <a href="#top" className={styles.backToTop}>
            Back to top
          </a>
          <p className={styles.note}>
            Built with React, TypeScript, CSS Modules and Vite. No component
            library — the diagram at the top is a canvas.
          </p>
          <p className={styles.copyright}>
            © {year} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
