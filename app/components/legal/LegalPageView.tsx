// Shared layout for the privacy, terms and cookies pages, ported from
// LHM's LegalClient: title band, "last updated" line, then each section
// with its paragraphs, bullet lists and (cookies policy) cookie tables.

import type { Metadata } from 'next';
import { PageHeader } from '../page-header/PageHeader';
import { EMAIL } from '../../lib/site';
import type { LegalPage, LegalSection } from '../../data/legal';
import { CookieSettingsButton } from './CookieSettingsButton';
import styles from './LegalPageView.module.css';

export function legalMetadata(page: LegalPage): Metadata {
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: page.path },
  };
}

export function LegalPageView({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHeader title={page.title}>
        <p>Last updated: {page.lastUpdated}</p>
      </PageHeader>

      <div className={styles.body}>
        {page.sections.map((section) => (
          <Section key={section.heading} section={section} />
        ))}

        <p className={styles.contact}>
          Questions about this page? Contact us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>
    </>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{section.heading}</h2>
      {section.content.split('\n\n').map((block) =>
        block.startsWith('•') ? (
          <ul key={block} className={styles.list}>
            {block
              .split('\n')
              .filter((line) => line.trim())
              .map((line) => (
                <li key={line}>{line.replace(/^•\s*/, '')}</li>
              ))}
          </ul>
        ) : (
          <p key={block}>{block}</p>
        )
      )}

      {section.cookies && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Provider</th>
                <th scope="col">Purpose</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              {section.cookies.map((cookie) => (
                <tr key={cookie.name}>
                  <th scope="row" data-label="Name">
                    {cookie.name}
                  </th>
                  <td data-label="Provider">{cookie.provider}</td>
                  <td data-label="Purpose">{cookie.purpose}</td>
                  <td data-label="Duration">{cookie.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {section.cookieSettings && <CookieSettingsButton className={styles.button} />}
    </section>
  );
}
