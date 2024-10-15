/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header, { userInfoType } from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { getBankCard } from "@/service/api";


const Page = () => {
    const [userInfo, setUserInfo] = useState<userInfoType>();
    const [bankCard, setBankCard] = useState();

    useEffect(() => {
        (async () => {
            const newUserInfo = localStorage.getItem('userInfo');
            if(!newUserInfo)return;
            const parsedUserInfo = JSON.parse(newUserInfo);

            setUserInfo(parsedUserInfo);
            const card = await getBankCard(parsedUserInfo.id);
            console.log(card);
            setBankCard(card);
        })();
    }, []);

    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url('/img/bg2.png')` }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title}>
                    <Title>Settings</Title>
                    <div className={styles.line}></div>
                </div>
                <form className={styles.form} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="name" label="Name" placeholder="Enter your Name"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="Email" label="Email" placeholder="Enter your Email"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="phone" label="Phone" placeholder="Enter your Phone"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="Address" label="Address" placeholder="Enter your Address"/>
                    </div>
                    <Button type="submit" color="primary">Submit</Button>
                </form>
            </div>
        </div>
};

export default Page;