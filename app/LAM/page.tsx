/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header, { userInfoType } from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { ChangeEvent, useEffect, useState } from "react";
import { Attraction, bookAttractions, listAttractions } from "@/service/api";
import {Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { attractionImg, CITY, cityType } from "@/constant/constant";

const Page = () => {

    const [list, setList] = useState<Attraction[]>([]);
    const [city, setCity] = useState<string>('');

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [currentAttraction, setCurrentAttraction] = useState<Attraction>();

    const [date, setDate] = useState<DateValue>();
    const [person, setPerson] = useState(1);

    const [userInfo, setUserInfo] = useState<userInfoType>()

    useEffect(() => {
        (async() => {
            const list = await listAttractions(CITY[0].id);
            setList(list);
            setCity(String(CITY[0].id));
            const newUserInfo = localStorage.getItem('userInfo');
            if(!newUserInfo)return;
            setUserInfo(JSON.parse(newUserInfo));

        })();
    }, []);

    function book(item: Attraction) {
        setCurrentAttraction(item);
        onOpen();
    }

    async function onReserve(){
        if(!currentAttraction)return ;
        let day = String(date?.day);
        if(date && date?.day < 10){
            day = '0' + day;
        }
        const data = {
            attractionId: currentAttraction?.id,
            bookingDate: `${date?.year}-${date?.month}-${day}`,
            numberOfPeople: person,
            totalPrice: currentAttraction?.price * person,
            userId: userInfo?.id
        }

        const res = await bookAttractions(data);

        if(res.code === 200){
            alert('Booked successfully');
            onOpenChange();
        } else {
            alert(res.message);
        }
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

    async function handleSearch() {
        const list = await listAttractions(city);
        setList(list);
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
                        onChange={(e) => setCity(e.target.value)}
                    >
                        {CITY.map((city: cityType) => (
                            <SelectItem color="primary" key={city.id}>
                                {city.cityName}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button onClick={handleSearch} color="primary">Search</Button>
                </div>
           
                {list?.length > 0 && <div className={styles.row}>
                    {list?.map((item: Attraction, index: number) => {
                        return <article key={index} className={`${styles.card} ${styles.col}`}>
                            <img className={styles.img} src={item.img || attractionImg[index]} alt='' />
                            <h4 className={styles.fontColor}>{item.attractionName}</h4>
                            <p className={styles.fontColor}>{item.attractionDescription}</p>
                            <button onClick={() => book(item)} className={styles.ctn}>Book</button>
                        </article>
                    })}
                </div>}
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
                            <h3>Your Attraction: <b>{currentAttraction?.attractionName}</b></h3>
                            <h3>Price: ${currentAttraction?.price}</h3>
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
                            <h3>FirstName: {userInfo?.firstName}</h3>
                            <h3>LastName: {userInfo?.lastName}</h3>
                            <h3>Email: {userInfo?.email}</h3>
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
            </div>
        </div>
};

export default Page;