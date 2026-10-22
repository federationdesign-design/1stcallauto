// FAQ cards: white rounded cards with the question in bold and the answer
// indented below. Every answer is always visible, as drawn.
// Mobile: one full-width card per row. Desktop: `columns={2}` splits the
// list in half into two independent columns (Home); the default is one
// column (About, beside the body copy).

import type { Faq } from '../../data/faqs';
import styles from './FaqList.module.css';

type Props = {
  faqs: Faq[];
  columns?: 1 | 2;
  className?: string;
};

export function FaqList({ faqs, columns = 1, className }: Props) {
  const half = Math.ceil(faqs.length / 2);
  const groups = columns === 2 ? [faqs.slice(0, half), faqs.slice(half)] : [faqs];

  return (
    <div className={`${styles.list} ${columns === 2 ? styles.twoColumns : ''} ${className ?? ''}`}>
      {groups.map((group, index) => (
        <div key={index} className={styles.column}>
          {group.map((faq) => (
            <div key={faq.question} className={styles.card}>
              <h3 className={styles.question}>{faq.question}</h3>
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
