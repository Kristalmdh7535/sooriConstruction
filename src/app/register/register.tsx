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
  birthDate: string;
  mobileNo: string;
  photo?: File | null;
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
    birthDate: '',
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
    if (formData.birthDate) payload.append('birthDate', formData.birthDate);
    if (formData.mobileNo) payload.append('mobileNo', formData.mobileNo);
    if (formData.photo) payload.append('photo', formData.photo);

    try {
      const res = await fetch('/api/register', { method: 'POST', body: payload });
      const data = await res.json();

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
      <div className={styles.container}>
        <div className={styles.formSide}>
          <div className={styles.logo}>
            <img src="/images/logo.jpg" alt="logo" />
          </div>
          <h1 className={styles.title}>Sign Up</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <div className={styles.passwordWrapper}>
                <input
                  type={isVisible ? "text" : "password"}
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
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    {!isVisible && (
                      <path d="M15 15l98 98" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
            <div className={styles.field}>
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} maxLength={50} />
            </div>
            <div className={styles.field}>
              <label>Middle Name</label>
              <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} maxLength={50} />
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} maxLength={50} />
            </div>
            <div className={styles.field}>
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label>Birth Date</label>
              <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
            </div>
            <div className={styles.field}>
              <label>Mobile No</label>
              <input type="tel" name="mobileNo" placeholder="Mobile number" value={formData.mobileNo} onChange={handleChange} maxLength={15} />
            </div>
            <div className={styles.field}>
              <label>Profile Photo</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <div className={styles.footerText}>
            Have an account?{' '}
            <a href="/login" className={styles.link}>Log in</a>
          </div>
        </div>
        <div className={styles.imageSide}>
          <img 
            src="/images/RegisterBackground.jpg" 
            alt="Sign up illustration" 
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h2>Sign Up!</h2>
            {/* <p>Join us and explore endless possibilities.</p> */}
          </div>
        </div>
      </div>
      {/* {error && <p className={styles.error}>{error}</p>} */}
      {/* {success && <p className={styles.success}>{success}</p>} */}
    </main>
  );
}