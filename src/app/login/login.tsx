'use client';

import {useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';

type LoginResponse={
    success?: boolean;
    message?: string;
    token?: string;
    username?: string;
};

export default function LoginForm(){
  const router = useRouter();

    const [formData, setFormData]= useState({
        username: '',
        password: '',
    });

    const [isVisible, setVisible]= useState(false);
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState('');
    const [success, setSuccess]= useState('');

    const handleChange= (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prev=> ({...prev, [e.target.name]: e.target.value}))
    };

    const toggleVisibility = () => setVisible(prev => !prev);

    const handleSubmit= async(e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('')

        try{
            const res= await fetch('/api/login',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data= await res.json();

            if(!res.ok){
                throw new Error(data.message || 'Login Failed!!!');
            }

            setSuccess('Login successful! Redirecting...');

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            console.log('Login Success:', {
            token: data.token,
            username: data.username || formData.username
            });

            setTimeout(() => {
                router.push('/dashboard')
            }, 1200);
        }catch(err: any){
            setError(err.message)
        }finally{
            setLoading(false);
        }
    }
    return(
        <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.formSide}>
          <div className={styles.logo}>
            <img src="images/logo.jpg" alt="Soori Logo" />
          </div>

          <h1 className={styles.title}>Sign In</h1>

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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="20" height="20">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    {!isVisible && (
                      <path d="M15 15l98 98" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.footerText}>
            Don't have an account?{' '}
            <a href="/register" className={styles.link}>Sign Up<br/></a>
          </div>
          <a href="#" className={styles.forgotLink}>Forgot Password?</a>
        </div>

        <div className={styles.imageSide}>
          <img 
            src="/images/RegisterBackground.jpg" 
            alt="Login Background" 
            className={styles.image}
          />
          <div className={styles.overlay}>
            <h2>Welcome Back!</h2>
            <p>Sign in to continue to your dashboard</p>
          </div>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}
    </main>
  );
}
    