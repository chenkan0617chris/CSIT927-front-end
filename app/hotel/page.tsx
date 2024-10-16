/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header, { userInfoType } from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { ChangeEvent, useEffect, useState } from "react";
import { bookHotel, listHotels } from "@/service/api";
import {Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { attractionImg, CITY, cityType, ROOM_TYPE } from "@/constant/constant";

export interface hotelType{
    id: number;
    hotelName: string;
    hotelDescription: string;
    singleRoomPrice: number;
    doubleRoomPrice: number;
    suiteRoomPrice: number;
    cityId: number;
    cityName: string;
}

const Page = () => {

    const [list, setList] = useState<hotelType[]>();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [city, setCity] = useState<string>('');

    const [currentHotel, setCurrentHotel] = useState<hotelType>({} as hotelType);
    const [currentRoom, setCurrentRoom] = useState<string>(ROOM_TYPE[0]);

    const [startDate, setStartDate] = useState<DateValue>();
    const [endDate, setEndDate] = useState<DateValue>();
    const [person, setPerson] = useState(1);
    const [userInfo, setUserInfo] = useState<userInfoType>()

    useEffect(() => {
        (async() => {
            const newList = await listHotels(CITY[0].id);
            setList(newList);
            const newUserInfo = localStorage.getItem('userInfo');
            if(!newUserInfo)return;
            setUserInfo(JSON.parse(newUserInfo));
        })();
    }, []);

    function book(item: string) {
        setCurrentRoom(item);
        onOpen();
    }

    async function onReserve(){
        if(Object.keys(currentHotel).length === 0)return;
        let startDay = String(startDate?.day);
        let endDay = String(endDate?.day);

        if(startDate && startDate?.day < 10){
            startDay = '0' + startDay;
        }
        if(endDate && endDate?.day < 10){
            endDay = '0' + endDay;
        }
        const data = {
            hotelId: currentHotel?.id,
            roomType: currentRoom,
            checkinDate: `${startDate?.year}-${startDate?.month}-${startDay}`,
            checkoutDate: `${endDate?.year}-${endDate?.month}-${endDay}`,
            numberOfRooms: person,
            pricePerRoom: priceRoom(currentRoom),
            totalPrice: priceRoom(currentRoom) * person,
            userId: userInfo?.id
        }
        const res = await bookHotel(data);
        console.log(res);
        onOpenChange();
        alert('Booking successfully');
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
        setStartDate(undefined);
        setEndDate(undefined);
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
                    <h3>Your Hotel: <b>{currentHotel?.hotelName}</b></h3>
                    <h3>Your Room Type: <b>{currentRoom}</b></h3>
                    <h3>Price: ${priceRoom(currentRoom)}</h3>
                    <DatePicker value={startDate} onChange={setStartDate} fullWidth labelPlacement="outside" label="Start Date" className="max-w-[284px]" isRequired />
                    <DatePicker value={endDate} onChange={setEndDate} fullWidth labelPlacement="outside" label="End Date" className="max-w-[284px]" isRequired />
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
                    <h3>Total Price: ${priceRoom(currentRoom) * person}</h3>
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


    function renderHotelItem(item: hotelType, index: number){
        return (
            <div key={index} className={`${styles.card}`} style={{ display:'flex', flexDirection: 'row', 
            justifyContent: 'space-between', width: 1000, margin: 16, background: '#1b1b1b', padding: 24, borderRadius: 8, opacity: .8 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <img className={styles.img} style={{width: 300}} src={attractionImg[index]} alt='' />
                    <div style={{ margin: 8 }}>
                        <h2 className={styles.fontColor} style={{ fontSize: 32, textAlign: 'left' }}>{item.hotelName}</h2>
                        <p className={styles.fontColor}>{item.hotelDescription}</p>
                    </div>
                </div>
                <button onClick={() => setCurrentHotel(item)} className={styles.ctn} style={{ height: 60, alignSelf: 'center' }}>View</button>
            </div>
        )
    }

    const priceRoom = (item: string) => {
        switch(item) {
            case ROOM_TYPE[0]:
                return currentHotel?.singleRoomPrice;
            case ROOM_TYPE[1]:
                return currentHotel?.doubleRoomPrice;
            case ROOM_TYPE[2]:
                return currentHotel?.suiteRoomPrice;
            default:
                return currentHotel?.singleRoomPrice;
        }
    }

    function renderRoomItem(item: string, index: number){
        
        return (
            <div key={index} className={`${styles.card}`} style={{ display:'flex', flexDirection: 'row', 
            justifyContent: 'space-between', width: 1000, margin: 16, background: '#1b1b1b', padding: 24, borderRadius: 8, opacity: .8 }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    {/* <img className={styles.img} style={{width: 300}} src={item.img} alt='' /> */}
                    <div style={{ margin: 8 }}>
                        <h2 className={styles.fontColor} style={{ fontSize: 32, textAlign: 'left' }}>{item}</h2>
                        <h3 style={{ color: '#ffffff' }}>Single Room: ${priceRoom(item)}</h3>
                        
                    </div>
                </div>
                <button onClick={() => book(item)} className={styles.ctn} style={{ height: 60, alignSelf: 'center' }}>Book</button>
            </div>
        )
    }

    function content() {
        if(Object.keys(currentHotel).length !== 0){
            return (
                <div className="flex" style={{ flexDirection: 'column' }}>
                    <div style={{ marginLeft: 16 }}><Button onClick={() => setCurrentHotel({} as hotelType)}>Back</Button></div>
                    {ROOM_TYPE.map((item: string, index: number) => {
                        return renderRoomItem(item, index);
                    })}
                </div>
            )
        } 
        return (
            <div className="flex" style={{ flexDirection: 'column' }}>
                {list?.map((item: hotelType, index: number) => {
                    return renderHotelItem(item, index);
                })}
            </div>
        )
    }

    async function handleSearch(){
        const newList = await listHotels(city);
        setCurrentHotel({} as hotelType);
        setList(newList);
    }


    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url('/img/hotel.jpg')`, height: '100%', minHeight: '100vh' }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={styles.title} style={{ marginTop: 60 }}>
                    <Title>Accommodation</Title>
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
           
                {content()}
                {renderModal()}
            </div>
        </div>
};

export default Page;