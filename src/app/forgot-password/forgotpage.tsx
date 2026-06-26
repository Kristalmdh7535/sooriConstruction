'use client';

import styles from './forgotpage.module.css';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import TextType from '../login/TextType';

type ForgotPageResponse={
    success?: boolean;
    message?: string;
    token?: string;
    username?: string;
}

export default function ForgotPage(){
    const router= useRouter();

    const [formData, setFormData]= useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    });

    const [isVisible, setVisible]= useState(false);
    const [isLoading, setLoading]= useState(false);
    const [error, setError]= useState('');
    const [success, setSuccess]= useState('');

    const handleChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const toggleVisibility= () => setVisible(prev => !prev);

    const handleSubmit= async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError("New passwords don't match!");
            setLoading(false);
            return;
        }

        try {
            const res= await fetch('/api/change-password',{
                method: 'PATCH',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(formData),
            });

            const data: ForgotPageResponse= await res.json();

            if(!res.ok){
                throw new Error(data.message || "Failed to change password!")
            }else if(res.ok){
                setSuccess("Password changed successfully!");
            }

            if(data.token){
                localStorage.setItem('token', data.token);
            }

            setTimeout(()=>{
                router.push('/login');
            }, 1200);
            }catch(error:any){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

    return(
        <main className={styles.main}>
            <img src='/images/RegisterBackground.jpg'
            alt= ""
            aria-hidden= "true"
            className={styles.bgImage}
            />
            <div className={styles.bgOverlay}/>
            <div className={styles.leftContent}>
                <TextType
                text={['Innovate Daily.', 'Build Better.', 'Company Name']} 
                as= 'h2'
                typingSpeed={60}
                pauseDuration={2500}
                className={styles.companyName}
                />
                <p className={styles.companyTagline}>
                  Empowering workflows through exceptional software achitecture.
                </p>
            </div>
            
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h1 className= {styles.title}>Recover Password</h1>
                    <p className={styles.subtitle}>
                        Enter credentials to change your password.
                    </p>
                </div>

                <form className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="oldPassword">Old Password</label>
                         <div className={styles.passwordWrapper}>
                        <input
                        type= {isVisible ? 'text' : 'password'}
                        id= "oldPassword"
                        name= "oldPassword"
                        placeholder= "••••••••"
                        value={formData.oldPassword}
                        onChange= {handleChange}
                        required
                        />
                        <button
                        type="button"
                        onClick= {toggleVisibility}
                        className={styles.toggleBtn}
                        aria-label= "Toggle password visibility"
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

                    <div className={styles.field}>
                        <label htmlFor="password">New Password</label>
                        <div className={styles.passwordWrapper}>
                        <input
                        type= {isVisible ? 'text' : 'password'}
                        id= 'password'
                        name= 'password'
                        placeholder= '••••••••'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                        <button
                        type= 'button'
                        onClick={toggleVisibility}
                        className= {styles.toggleBtn}
                        aria-label= "Toggle password visibility"
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

                    <div className={styles.field}>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <div className={styles.passwordWrapper}>
                        <input
                        type= {isVisible ? 'text' : 'password'}
                        id= 'confirmPassword'
                        name= 'confirmPassword'
                        placeholder= '••••••••'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        />
                        <button
                        type='button'
                        onClick= {toggleVisibility}
                        className= {styles.toggleBtn}
                        aria-label= 'Toggle password visibility'
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
                    <button
                    type= "button"
                    onClick={handleSubmit}
                    className={styles.saveBtn}
                    >
                        Save Password
                    </button>
                </form>
            </div>
        </main>
    );
}

