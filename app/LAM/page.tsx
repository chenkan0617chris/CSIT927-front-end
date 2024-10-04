/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { getLAM } from "@/service/api";
import {DatePicker} from "@nextui-org/react";

const Page = () => {

    const [list, setList] = useState<any[]>();

    useEffect(() => {
        (async() => {
            const data = await getLAM();
            setList(data);

        })();
    }, []);

    function book() {

    }

    return <div className={styles.home} style={{ alignItems: 'center', background: 'black' }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title}>
                    <Title>Local Attractions and Museums</Title>
                    <div className={styles.line}></div>
                </div>
                <DatePicker label="Booking date" className="max-w-[284px]" isRequired />
                <div className={styles.row}>
                    {list?.map((item: any, index: number) => {
                        return <article key={index} className={`${styles.card} ${styles.col}`}>
                            <img className={styles.img} src={item.img} alt='' />
                            <h4 className={styles.fontColor}>{item.name}</h4>
                            <p className={styles.fontColor}>{item.description}</p>
                            <button onClick={book} className={styles.ctn}>Book</button>
                        </article>
                    })}
                </div>
            </div>
        </div>
};

export default Page;