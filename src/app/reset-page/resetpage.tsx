'use client';

import { useState } from 'react';
import TextType from '../login/TextType';
import styles from './resetpage.module.css';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Reset link sent to:', email);
    setLoading(false);
  };

  return (
    <main className={styles.main}>
      <img
        src="/images/RegisterBackground.jpg"
        alt=""
        aria-hidden="true"
        className={styles.bgImage}
      />
      <div className={styles.bgOverlay} />

      <div className={styles.leftContent}>
        <TextType
          text={['YouCompany.', 'Build Better.', 'InnovateDaily.']}
          as="h2"
          typingSpeed={60}
          pauseDuration={2500}
          className={styles.companyName}
        />
        <p className={styles.companyTagline}>
          Empowering workflows through exceptional software architecture.
        </p>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.title}>Enter Email Address</h1>
          <p className={styles.subtitle}>
            Enter your email to receive an OTP for password recovery
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.resetLinkButton}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </main>
  );
}