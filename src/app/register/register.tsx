'use client';

import { useState } from 'react';
import styles from './register.module.css';

type RegisterFormData = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  mobileNo: string;
  photo?: File | null;
};

type RegisterResponse = {
  success?: boolean;
  message?: string;
  token?: string;
  user?: any;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'male',
    mobileNo: '',
    photo: null,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const toggleVisibility = () => setIsVisible(prev => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const payload = new FormData();
    payload.append('username', formData.username);
    payload.append('password', formData.password);
    payload.append('email', formData.email);
    payload.append('firstName', formData.firstName);
    payload.append('middleName', formData.middleName);
    payload.append('lastName', formData.lastName);
    payload.append('gender', formData.gender);
    if (formData.mobileNo) payload.append('mobileNo', formData.mobileNo);
    if (formData.photo) payload.append('photo', formData.photo);

    try {
      const res = await fetch('/api/register', { method: 'POST', body: payload });
      const data: RegisterResponse = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Account created successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>
            Set up your account the straightforward way — fill in, submit, done.
          </p>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                maxLength={50}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                placeholder="(optional)"
                value={formData.middleName}
                onChange={handleChange}
                maxLength={50}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                maxLength={50}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="mobileNo">Mobile No</label>
              <input
                type="tel"
                id="mobileNo"
                name="mobileNo"
                placeholder="+977 98XXXXXXXX"
                value={formData.mobileNo}
                onChange={handleChange}
                maxLength={15}
              />
            </div>
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

          <p className={styles.terms}>
            By creating an account, you agree to our{' '}
            <a href="#_" className={styles.termsLink}>Terms of service</a>
            {' '}and{' '}
            <a href="#_" className={styles.termsLink}>Privacy Policy</a>.
          </p>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className={styles.footerText}>
          Already have an account?{' '}
          <a href="/login" className={styles.link}>Sign in</a>
        </p>
      </div>
    </main>
  );
}