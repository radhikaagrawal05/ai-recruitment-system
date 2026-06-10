import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>RECRU·AI</div>
        <nav className={styles.nav}>
          <a className={styles.navItemActive}>Dashboard</a>
          <a className={styles.navItem}>Jobs</a>
          <a className={styles.navItem}>Candidates</a>
          <a className={styles.navItem}>AI reviews</a>
        </nav>
        <button onClick={handleLogout} className={styles.logout}>
          Sign out
        </button>
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.greeting}>Good morning, {user?.name}</h1>
          <span className={styles.role}>{user?.role}</span>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Open jobs</div>
            <div className={styles.statVal}>12</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Candidates</div>
            <div className={styles.statVal}>48</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>In review</div>
            <div className={styles.statVal}>7</div>
          </div>
        </div>
      </main>
    </div>
  );
}