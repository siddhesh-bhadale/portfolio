import { profile, resumeFileNames } from '@/data/profile';
import { Section } from '@/components/layout';
import { CopyButton, Reveal, SectionHeading } from '@/components/ui';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        title="Contact"
        titleId="contact-title"
        meta={profile.availability}
        lead="If any of the above is close to what you are hiring for, write to me and I will reply the same day."
      />

      <Reveal>
        <div className={styles.card}>
          <div className={styles.primary}>
            <a className={styles.email} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <CopyButton value={profile.email} label="email address" />
          </div>

          <dl className={styles.channels}>
            <div className={styles.channel}>
              <dt className={styles.channelLabel}>Phone</dt>
              <dd>
                <a className={styles.channelValue} href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                  {profile.phone}
                </a>
              </dd>
            </div>

            {profile.socials
              .filter((social) => social.id !== 'email')
              .map((social) => (
                <div key={social.id} className={styles.channel}>
                  <dt className={styles.channelLabel}>{social.label}</dt>
                  <dd>
                    <a
                      className={styles.channelValue}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.display}
                    </a>
                  </dd>
                </div>
              ))}

            <div className={styles.channel}>
              <dt className={styles.channelLabel}>Location</dt>
              <dd className={styles.channelPlain}>{profile.location}</dd>
            </div>
          </dl>

          <div className={styles.resumeLinks}>
            <a className={styles.resume} href={profile.resumeHref} download={resumeFileNames.detailed}>
              Download résumé — detailed (2 pages)
            </a>
            <a className={styles.resume} href={profile.conciseResumeHref} download={resumeFileNames.concise}>
              Download résumé — concise (1 page)
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
