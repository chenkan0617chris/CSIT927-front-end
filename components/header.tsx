'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import styles from '../styles/style.module.css';
import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';

export interface userInfoType {
    id: number;
    nickname: string;
    email: string;
    password: string;
    createdAt: string;
    firstName: string;
    lastName: string;
}

const Header = () => {
    
    const [userInfo, setUserInfo] = useState<userInfoType>({} as userInfoType)

    useEffect(() => {
        const newUserInfo = localStorage.getItem('userInfo');
        if(!newUserInfo)return;
        setUserInfo(JSON.parse(newUserInfo));
    }, []);

    return (
        <nav className={`${styles.navbar} ${styles.glass}` }>
            <h1 className={styles.logo}>ADVENTURE</h1>
            <ul className={styles.navLinks}>
                <li><Link href="/" id="pri" className={styles.cirBorder}>Home</Link></li>
                <li><Link href="/LAM"  id="sec" className={styles.cirBorder}>Local Attractions and Museums</Link></li>
                <li><Link href="/hotel" id="tri" className={styles.cirBorder}>Hotel</Link></li>
                <li><Link href="/transport" id="quad" className={styles.cirBorder}>Transport</Link></li>
                <li><Link href="/settings" id="quint" className={styles.cirBorder}>Settings</Link></li>
                {Object.keys(userInfo).length === 0 && <li><Link href="/login" className={styles.ctn} style={{ padding: 15, borderRadius: 6 }}>Login</Link></li>}
                {Object.keys(userInfo).length === 0 && <li><Link href="/register" className={styles.ctn} style={{ padding: 15, borderRadius: 6 }}>Register</Link></li>}
                {Object.keys(userInfo).length !== 0 && <li><Button onClick={() => {
                    localStorage.removeItem('userInfo');
                    setUserInfo({} as userInfoType);
                    alert("Logged out!");
                }} className={styles.ctn} style={{ padding: 15, borderRadius: 6 }}>Logout</Button></li>}
                
                
            </ul>
        </nav>
    )
};

export default Header;