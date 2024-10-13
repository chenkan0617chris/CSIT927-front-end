/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { useEffect, useState } from "react";
import { Attraction, getLAM } from "@/service/api";
import {Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { CITY } from "@/constant/constant";

const Page = () => {

    const [list, setList] = useState<Attraction[]>();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [currentAttraction, setCurrentAttraction] = useState<Attraction>();

    useEffect(() => {
        (async() => {
            const data = await getLAM();
            setList(data);

        })();
    }, []);

    function book(item: Attraction) {
        setCurrentAttraction(item);
        onOpen();
    }

    function onReserve(e: any){
        console.log(e);
    }

    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url('/img/bg2.png')` }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title}>
                    <Title>Local Attractions and Museums</Title>
                    <div className={styles.line}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Select 
                        label="Select a City" 
                        className="max-w-xs" 
                        color="primary"
                        style={{ width: 250, marginRight: 16 }}
                    >
                        {CITY.map((city: string) => (
                        <SelectItem color="primary" key={city}>
                            {city}
                        </SelectItem>
                        ))}
                    </Select>
                    <Button color="primary">Search</Button>
                </div>
           
                <div className={styles.row}>
                    {list?.map((item: Attraction, index: number) => {
                        return <article key={index} className={`${styles.card} ${styles.col}`}>
                            <img className={styles.img} src={item.img} alt='' />
                            <h4 className={styles.fontColor}>{item.name}</h4>
                            <p className={styles.fontColor}>{item.description}</p>
                            <button onClick={() => book(item)} className={styles.ctn}>Book</button>
                        </article>
                    })}
                </div>
                <Modal 
                    isOpen={isOpen} 
                    onOpenChange={onOpenChange}
                    placement="top-center"
                >
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Reservation</ModalHeader>
                        <ModalBody>
                            <h3>Your Attraction: <b>{currentAttraction?.name}</b></h3>
                            <h3>Price: ${currentAttraction?.price}</h3>
                            <DatePicker fullWidth labelPlacement="outside" label="Booking Date" className="max-w-[284px]" isRequired />

                            <Input
                                type="number"
                                label="Person"
                                placeholder="0"
                                labelPlacement="outside"
                                
                                width={200}
                            />

                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                            Cancel
                            </Button>
                            <Button color="primary" onPress={onReserve}>
                            Reserve
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
};

export default Page;