import Link from 'next/link';
import styles from '../styles/about.module.css';

export default function Home() {
    return (
        <div>
            <nav className={`${styles.navbar} ${styles.glass}` }>
                <h1 className={styles.logo}>ADVENTURE</h1>
                <ul className={styles.navLinks}>
                    <li><Link href="#home" id="pri" className={styles.cirBorder}>Home</Link></li>
                    <li><Link href="#events"  id="sec" className={styles.cirBorder}>Tours</Link></li>
                    <li><Link href="#explore" id="tri" className={styles.cirBorder}>Explore</Link></li>
                    <li><Link href="#about" id="quad" className={styles.cirBorder}>About</Link></li>
                    <li><Link href="#contribution" id="quint" className={styles.cirBorder}>Contributions</Link></li>
                    <li><Link href="#contact" className={styles.ctn}>Contact</Link></li>
                </ul>
                {/* <img className={`${styles.menuBtn} ${styles.img}`} src="/img/menu-btn.png" alt='' /> */}
            </nav>
            <header className={styles.home} id="home">
                <div className={styles.headerContent}>
                    <h2 className={styles.headerContentH2}>Explore the colourful World</h2>
                    <div className={styles.line}></div>
                    <h1 className={styles.headerContentH1}>A WONDERFUL GIFT</h1>
                    <Link href="#" className={styles.ctn}>Learn more</Link>
                </div>
            </header>

            <section className={`${styles.events} ${styles.section}`} id="events">
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h1 className={`${styles.fontColor} ${styles.headerContentH1} `}>Upcoming Events</h1>
                        <div className={styles.line}></div>
                    </div>
                    <div className={styles.row}>
                        <article className={`${styles.card} ${styles.col}`}>
                            <img className={styles.img} src="/img/img1.jfif" alt='' />
                            <h4 className={styles.fontColor}>Everest camp trek</h4>
                            <p className={styles.fontColor}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus dolor eius cum itaque repellat asperiores.</p>
                            <Link href="#" className={styles.ctn}>All Details</Link>
                        </article>
                        <article className={`${styles.card} ${styles.col}`}>
                            <img className={styles.img} src="/img/img2.jfif" alt='' />
                            <h4 className={styles.fontColor}>Walking holidays</h4>
                            <p className={styles.fontColor}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus dolor eius cum itaque repellat asperiores.</p>
                            <Link href="#" className={styles.ctn}>All Details</Link>
                        </article>
                        <article className={`${styles.card} ${styles.col}`}>
                            <img className={styles.img} src="/img/img2.jfif" alt='' />
                            <h4 className={styles.fontColor}>Andaman Beaches</h4>
                            <p className={styles.fontColor}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus dolor eius cum itaque repellat asperiores.</p>
                            <Link href="#" className={styles.ctn}>All Details</Link>
                        </article>
                    </div>
                </div>
            </section>

            <section className={`${styles.explore} ${styles.section}`} id="explore">
                <div className={styles.exploreContent}>
                    <h1 className={styles.exploreContentH1}>EXPLORE THE WORLD</h1>
                    <div className={styles.line}></div>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae labore voluptatum fuga id iusto cumque possimus asperiores eligendi quo laboriosam?</p>
                    <Link href="#" className={styles.ctn}>Explore more</Link>
                </div>
            </section>
            <section className={`${styles.tours} ${styles.section}`} id="tours">
                <div className={`${styles.container} ${styles.row}`}>
                    <div className={`${styles.col} ${styles.contentCol}`}>
                        <h1 className={`${styles.contentColH1} ${styles.fontColor}`}>UPCOMING TOURS & DESTINATION</h1>
                        <div className={styles.line}></div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum, officia! Odio tempore quisquam voluptatibus? Odit laboriosam sunt reprehenderit voluptas ipsa aliquam ea ipsum aperiam corrupti nisi, alias optio perferendis sed?</p>
                        <Link href="#" className={styles.ctn}>Learn more</Link>
                    </div>
                    <div className={styles.imageCol}>
                        <div className={styles.imageGallery}>
                            <img className={styles.img} src="/img/img3.png" alt='' />
                            <img className={styles.img} src="/img/img4.png" alt='' />
                            <img className={styles.img} src="/img/img5.png" alt='' />
                            <img className={styles.img} src="/img/img6.png" alt='' />
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section}`} id="about">
                <div className={styles.title}>
                    <h1 className={styles.fontColor}>About Us</h1>
                    <div className={styles.line}></div>
                </div>
                <div id="about_us">
                    <div className={styles.boxx}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi asperiores deleniti dolor, provident veritatis libero quo voluptatibus repellat nostrum, accusantium expedita assumenda placeat? Fugit, magni aliquid eaque dolorum dolore, deleniti ea molestiae ducimus atque doloribus ipsam repellendus assumenda ullam tenetur vero perferendis quam corporis, nam dolores distinctio libero esse. Quaerat libero facilis nam, tempore natus optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur incidunt doloribus quaerat placeat harum nesciunt sequi cupiditate. Libero neque voluptatum ea fugit.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}