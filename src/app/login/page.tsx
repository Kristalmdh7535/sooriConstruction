import LoginForm from './login';
import styles from './login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.main}>
      <LoginForm />
    </div>
  );
}