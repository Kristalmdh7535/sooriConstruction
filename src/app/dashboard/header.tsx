'use client';
import styles from './header.module.css';
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineQueryStats } from "react-icons/md";


export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className="flex items-center gap-4">
          <button className={styles.mobileMenu}>☰</button>
        </div>

        <div className={styles.rightSection}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
            />
          </div>

          {/* Icons */}
          <button className={styles.iconButton}><IoMdNotificationsOutline /></button>
          <button className={styles.iconButton}><MdOutlineQueryStats/></button>

          {/* User */}
          <div className={styles.userProfile}>
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150"
              alt="User"
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <p className={styles.userName}>James</p>
              <p className={styles.userRole}>Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}