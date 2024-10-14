/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";


const Page = () => {

    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url('/img/bg2.png')` }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title}>
                    <Title>Settings</Title>
                    <div className={styles.line}></div>
                </div>
                <form className={styles.form} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="name" label="name" placeholder="Enter your name"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="Email" label="Email" placeholder="Enter your Email"/>
                    </div>
                    <div style={{ margin: 8, width: 400}}>
                        <Input type="phone" label="phone" placeholder="Enter your phone"/>
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