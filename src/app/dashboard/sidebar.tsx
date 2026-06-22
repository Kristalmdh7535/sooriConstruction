'use client';
import styles from './sidebar.module.css';

const navItems = [
  { name: 'Dashboard', icon: '🏠', active: true },
  { name: 'Users', icon: '👥' },
  { name: 'Account', icon: '👤' },
  { name: 'Projects', icon: '📁' },
  { name: 'Calendar', icon: '📅' },
  { name: 'Documentation', icon: '📖' },
];

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img 
        src= "/images/logo.jpg"
        alt= "Soori Logo"
        width= {88}
        height= {68}
        className={styles.logoImage}
        // priority
        />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`${styles.navLink} ${item.active ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );
}