import styles from './page.module.css';

// Holding page until the Home build in Phase 5. The green block gives the
// header something to sit on.
export default function Home() {
  return (
    <div className={styles.holding}>
      <h1 className="visually-hidden">1st Call Auto</h1>
    </div>
  );
}
