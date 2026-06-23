import styles from './userstable.module.css';

const users = [
  { id: 1, name: "Christina Bersh", email: "christina@site.com", position: "Director", department: "Human resources", status: "Active", progress: 25, date: "28 Dec, 12:12" },
  { id: 2, name: "David Harrison", email: "david@site.com", position: "Seller", department: "Branding products", status: "Warning", progress: 78, date: "20 Dec, 09:27" },
  // Add more rows as needed
];

export default function UsersTable() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Users</h2>
          <p className={styles.subtitle}>Add users, edit and more.</p>
        </div>
        <button className={styles.addButton}>
          + Add user
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Name</th>
              <th>Position</th>
              <th>Status</th>
              <th>Portfolio</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className={styles.userInfo}>
                    <img src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?w=150" alt="" className={styles.avatar} />
                    <div>
                      <div className={styles.name}>{user.name}</div>
                      <div className={styles.email}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.position}>{user.position}</div>
                  <div className={styles.department}>{user.department}</div>
                </td>
                <td>
                  <span className={`${styles.status} ${user.status === 'Active' ? styles.active : styles.warning}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.progressContainer}>
                    <span className={styles.progressText}>{user.progress}/5</span>
                    <div className={styles.progressBar}>
                      <div className={styles.progress} style={{width: `${user.progress}%`}}></div>
                    </div>
                  </div>
                </td>
                <td className={styles.date}>{user.date}</td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}