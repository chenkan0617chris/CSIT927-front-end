import Link from 'next/link';
import styles from '../styles/style.module.css';

const Header = () => {
    return (
        <nav className={`${styles.navbar} ${styles.glass}` }>
            <h1 className={styles.logo}>ADVENTURE</h1>
            <ul className={styles.navLinks}>
                <li><Link href="/" id="pri" className={styles.cirBorder}>Home</Link></li>
                <li><Link href="/LAM"  id="sec" className={styles.cirBorder}>Local Attractions and Museums</Link></li>
                <li><Link href="#explore" id="tri" className={styles.cirBorder}>Explore</Link></li>
                <li><Link href="#about" id="quad" className={styles.cirBorder}>About</Link></li>
                <li><Link href="#contribution" id="quint" className={styles.cirBorder}>Contributions</Link></li>
                <li><Link href="#contact" className={styles.ctn}>Contact</Link></li>
            </ul>
        </nav>
    )
};

export default Header;