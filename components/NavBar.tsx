import Link from 'next/link';
import styles from './Wireframe.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link href="/" className={styles.navHome}>
          Home
        </Link>
      </div>
    </nav>
  );
}
