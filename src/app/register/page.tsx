import RegisterForm from './register';
import styles from './register.module.css';

export default function RegisterPage(){
    return(
        <div className={styles.main}>
            <RegisterForm/>
        </div>
    )
}