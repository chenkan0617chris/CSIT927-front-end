import Link from 'next/link';
import styles from '../styles/style.module.css';

const Header = () => {
    return (
        <nav className={`${styles.navbar} ${styles.glass}` }>
            <h1 className={styles.logo}>ADVENTURE</h1>
            <ul className={styles.navLinks}>
                <li><Link href="/" id="pri" className={styles.cirBorder}>Home</Link></li>
                <li><Link href="/LAM"  id="sec" className={styles.cirBorder}>Local Attractions and Museums</Link></li>
                <li><Link href="/hotel" id="tri" className={styles.cirBorder}>Hotel</Link></li>
                <li><Link href="/transport" id="quad" className={styles.cirBorder}>Transport</Link></li>
                <li><Link href="/settings" id="quint" className={styles.cirBorder}>Settings</Link></li>
                <li><Link href="/login" className={styles.ctn} style={{ padding: 15, borderRadius: 6 }}>Login</Link></li>
                <li><Link href="/register" className={styles.ctn} style={{ padding: 15, borderRadius: 6 }}>Register</Link></li>
            </ul>
        </nav>
    )
};

export default Header;