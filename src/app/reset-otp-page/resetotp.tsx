'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import TextType from '../login/TextType';
import styles from './resetotp.module.css';

export default function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      setTimeout(() => {
        router.push('/new-password');
      }, 800);
    } catch (err) {
      setError('Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <main className={styles.main}>
      <img src="/images/RegisterBackground.jpg" alt="" className={styles.bgImage} />
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
          <h1 className={styles.title}>Enter OTP</h1>
          <p className={styles.subtitle}>
            We&apos;ve sent a 6-digit code to your email
          </p>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputsRef.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={styles.otpInput}
              />
            ))}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <button
          type="button"
          className={styles.resendLink}
          onClick={() => router.push('/reset-page')}
        >
          Didn't receive code? Resend
        </button>
      </div>
    </main>
  );
}