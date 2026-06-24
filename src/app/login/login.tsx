'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

type LoginResponse = {
  success?: boolean;
  message?: string;
  token?: string;
  username?: string;
};

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleVisibility = () => setVisible(prev => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login Failed!!!');

      setSuccess('Login successful! Redirecting...');

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>

      {/* LEFT: image panel */}
      <div className={styles.imageSide}>
        <img
          src="/images/RegisterBackground.jpg"
          alt=""
          aria-hidden="true"
          className={styles.image}
        />
        <div className={styles.imageOverlay} />
        <div className={styles.imageContent}>
          <a href="/">
            <img src="/images/logo.jpg" alt="logo" className={styles.logoImg} />
          </a>
          <div className={styles.imageText}>
            <h2 className={styles.imageHeading}>Welcome Back!</h2>
            <p className={styles.imageSubtext}>
              Sign in to continue to your dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: form panel */}
      <div className={styles.formSide}>
        <div className={styles.formInner}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.subtitle}>
              Enter your credentials to access your account.
            </p>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={isVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className={styles.toggleBtn}
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                      <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                      <path d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <a href="#" className={styles.forgotLink}>Forgot Password?</a>

            <p className={styles.terms}>
              By signing in, you agree to our{' '}
              <a href="#_" className={styles.termsLink}>Terms of service</a>
              {' '}and{' '}
              <a href="#_" className={styles.termsLink}>Privacy Policy</a>.
            </p>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className={styles.footerText}>
            Don&apos;t have an account?{' '}
            <a href="/register" className={styles.link}>Sign Up</a>
          </p>
        </div>
      </div>

    </main>
  );
}