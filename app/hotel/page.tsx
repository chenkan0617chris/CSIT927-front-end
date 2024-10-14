/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { ChangeEvent, useEffect, useState } from "react";
import { Attraction, getLAM } from "@/service/api";
import {Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { CITY, ROOM_TYPE } from "@/constant/constant";

const Page = () => {

    const [list, setList] = useState<Attraction[]>();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [currentHotel, setCurrentHotel] = useState<Attraction>();
    const [currentRoom, setCurrentRoom] = useState<string>();

    const [date, setDate] = useState<DateValue>();
    const [person, setPerson] = useState(1);

    useEffect(() => {
        (async() => {
            const data = await getLAM();
            setList(data);

        })();
    }, []);


    useEffect(() => {
        console.log(date);
        console.log(person);

    }, [date, person]);

    function book(item: string) {
        setCurrentRoom(item);
        onOpen();
    }

    function onReserve(e: any){
        onOpenChange();
        alert('Booking successfully');
        console.log(e);
    }

    function handlePersonChange(e: ChangeEvent<HTMLInputElement>){
        setPerson(Number(e.target.value));
    }

    function handleCloseModal(onClose: any){
        init();
        onClose();
    }

    function init(){
        setPerson(1);
        setDate(undefined);
    }

    function renderModal(){
        return <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Reservation</ModalHeader>
                <ModalBody>
                    <h3>Your Hotel: <b>{currentHotel?.name}</b></h3>
                    <h3>Your Room Type: <b>{currentRoom}</b></h3>
                    <h3>Price: ${currentHotel?.price}</h3>
                    <DatePicker value={date} onChange={setDate} fullWidth labelPlacement="outside" label="Booking Date" className="max-w-[284px]" isRequired />

                    <Input
                        type="number"
                        label="Person"
                        placeholder="0"
                        labelPlacement="outside"
                        required
                        width={200}
                        value={String(person)}
                        onChange={handlePersonChange}
                        
                    />

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={() => handleCloseModal(onClose)}>
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
    }


    function renderHotelItem(item: Attraction, index: number){
        return (
            <div key={index} className={`${styles.card}`} style={{ display:'flex', flexDirection: 'row', 
            justifyContent: 'space-between', width: 1000, margin: 16, background: '#1b1b1b', padding: 24, borderRadius: 8, opacity: .8 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <img className={styles.img} style={{width: 300}} src={item.img} alt='' />
                    <div style={{ margin: 8 }}>
                        <h2 className={styles.fontColor} style={{ fontSize: 32, textAlign: 'left' }}>{item.name}</h2>
                        <p className={styles.fontColor}>{item.description}</p>
                    </div>
                </div>
                <button onClick={() => setCurrentHotel(item)} className={styles.ctn} style={{ height: 60, alignSelf: 'center' }}>View</button>
            </div>
        )
    }

    function renderRoomItem(item: string, index: number){
        return (
            <div key={index} className={`${styles.card}`} style={{ display:'flex', flexDirection: 'row', 
            justifyContent: 'space-between', width: 1000, margin: 16, background: '#1b1b1b', padding: 24, borderRadius: 8, opacity: .8 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <img className={styles.img} style={{width: 300}} src={item.img} alt='' /> */}
                    <div style={{ margin: 8 }}>
                        <h2 className={styles.fontColor} style={{ fontSize: 32, textAlign: 'left' }}>{item}</h2>
                        {/* <p className={styles.fontColor}>{item?.description}</p> */}
                    </div>
                </div>
                <button onClick={() => book(item)} className={styles.ctn} style={{ height: 60, alignSelf: 'center' }}>Book</button>
            </div>
        )
    }

    function content() {
        if(currentHotel){
            return (
                <div className="flex" style={{ flexDirection: 'column' }}>
                    {ROOM_TYPE.map((item: string, index: number) => {
                        return renderRoomItem(item, index);
                    })}
                </div>
            )
        } 
        return (
            <div className="flex" style={{ flexDirection: 'column' }}>
                {list?.map((item: Attraction, index: number) => {
                    return renderHotelItem(item, index);
                })}
            </div>
        )
    }


    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url('/img/hotel.jpg')`, height: '100%', minHeight: '100vh' }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title}>
                    <Title>Accommodation</Title>
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
           
                {content()}
                {renderModal()}
            </div>
        </div>
};

export default Page;