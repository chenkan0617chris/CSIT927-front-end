/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header, { userInfoType } from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { FormEvent, useEffect, useState } from "react";
import { getBankCard, saveBankCard } from "@/service/api";


export interface bankCard {
    [bankCardNumber: string]: string;
    name: string;
    expirationDate: string;
    cvv: string;
    balance: any;
}

const Page = () => {
    const [userInfo, setUserInfo] = useState<userInfoType>({} as userInfoType);
    const [bankCard, setBankCard] = useState<bankCard>({} as bankCard);

    useEffect(() => {
        (async () => {
            const newUserInfo = localStorage.getItem('userInfo');
            if(!newUserInfo)return;
            const parsedUserInfo = JSON.parse(newUserInfo);

            setUserInfo(parsedUserInfo);
            const res = await getBankCard(parsedUserInfo.id);
            if(res.code === 200){
                setBankCard(res.data);
            }
        })();
    }, []);

    async function handleBankCardSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formObject = {} as any;
        formData.forEach((value, key) => {
            if(typeof key === 'string'){
                formObject[key] = value;
            }
          });
    
        const res = await saveBankCard({
            ...formObject,
            userId: userInfo?.id,
        });

        if(res.code === 200){
            alert('Saved successfully');
            setBankCard(res.data);
        } else {
            alert(res.message);
        }
    }

    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url('/img/bg2.png')` }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title}>
                    <Title>Settings</Title>
                    <div className={styles.line}></div>
                </div>
                <form className={styles.form} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={userInfo?.firstName} type="name" label="firstName" placeholder="Enter your firstName"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={userInfo?.lastName} type="name" label="lastName" placeholder="Enter your lastName"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={userInfo?.nickname} type="name" label="nickname" placeholder="Enter your nickname"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={userInfo?.email} type="Email" label="Email" placeholder="Enter your Email"/>
                    </div>
                </form>
                <div style={{ display: 'flex'}}>
                    <h1 style={{ textAlign: 'left', color: 'white'}}>Bank Card</h1>
                </div>
                <form onSubmit={handleBankCardSubmit} className={styles.form} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={bankCard?.bankCardNumber} name="bankCardNumber" type="string" label="bankCardNumber" placeholder="Enter your bank Card Number"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={bankCard?.name} name="name" type="string" label="Name" placeholder="Enter your Name"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={bankCard?.expirationDate} name="expirationDate" type="string" label="expirationDate" placeholder="Enter your expiration Date (YYYY-MM-DD)"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input value={bankCard?.cvv} name="cvv" type="string" label="cvv" placeholder="Enter your cvv"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input disabled value={bankCard?.balance} name="balance" type="number" label="balance" placeholder="your balance"/>
                    </div>
                    <Button type="submit" color="primary">Submit</Button>
                </form>
            </div>
        </div>
};

export default Page;