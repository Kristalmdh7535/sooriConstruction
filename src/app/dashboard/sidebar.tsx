'use client';
import { TbLayoutDashboard } from "react-icons/tb";
import { LuUsersRound } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoDocumentAttachOutline } from "react-icons/io5";
import styles from './sidebar.module.css';

const navItems = [
  { name: 'Dashboard', icon: TbLayoutDashboard, active: true },
  { name: 'Users', icon: LuUsersRound, active: true },
  { name: 'Account', icon: MdAccountCircle, active: true },
  { name: 'Projects', icon: GoProjectSymlink, active: true },
  { name: 'Calendar', icon: FaRegCalendarAlt, active: true },
  { name: 'Documentation', icon: IoDocumentAttachOutline, active: true },
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
        />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href="#"
              className={`${styles.navLink} ${item.active ? styles.active : ''}`}
            >
              <span className={styles.icon}>
                {typeof Icon === 'string' ? Icon : <Icon size={20} />}
              </span>
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
}