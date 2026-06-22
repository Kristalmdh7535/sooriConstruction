import styles from './statscard.module.css';

export default function StatsCard() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <p className={styles.label}>Total Users</p>
        <p className={styles.value}>72,540</p>
        <div className={styles.changePositive}>
          ↑ 1.7%
        </div>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Sessions</p>
        <p className={styles.value}>29.4%</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Avg. Click Rate</p>
        <p className={styles.value}>56.8%</p>
        <div className={styles.changeNegative}>
          ↓ 1.7%
        </div>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Pageviews</p>
        <p className={styles.value}>92,913</p>
      </div>
    </div>
  );
}