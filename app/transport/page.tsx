/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header, { userInfoType } from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, 
    SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure} from "@nextui-org/react";
import { CITY, cityType } from "@/constant/constant";
import { bookTransport, listStations } from "@/service/api";

const columns =[
    {
        uid: '1',
        name: 'Transport'
    },
    {
        uid: '2',
        name: 'Price'
    },
    {
        uid: '3',
        name: 'Action'
    },
]

export interface stationTable {
    id: string;
    transport: string;
    price: number;
}

export interface stationType {
    id: number;
    stationId: number;
    stationName: string;
    cityId: number;
    cityName: string;
    postcode: string;
}

const Page = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [currentTransport, setCurrentTransport] = useState<any>();

    const [date, setDate] = useState<DateValue>();
    const [person, setPerson] = useState(1);

    const [stations, setStations] = useState<stationType[]>([] as stationType[])
    const [city, setCity] = useState<string>('');
    
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    const [table, setTable] = useState<stationTable[]>([] as stationTable[]);
    const [userInfo, setUserInfo] = useState<userInfoType>()

    useEffect(() => {
        (async () => {
            const newStations = await listStations(city || CITY[0].id);
            setStations(newStations);
            const newUserInfo = localStorage.getItem('userInfo');
            if(!newUserInfo)return;
            setUserInfo(JSON.parse(newUserInfo));
        })();
    }, [city]);


    useEffect(() => {
        console.log(date);
        console.log(person);

    }, [date, person]);

    function handleBook(item: any, price: number) {
        setCurrentTransport({
            transport: item,
            price
        });
        onOpen();
    }

    async function onReserve(){
        const data = {
            startStationId: from,
            endStationId: to,
            transportationMode: currentTransport.transport,
            numberOfPassengers: person,
            price: currentTransport.price,
            totalPrice: currentTransport.price * person,
            bookingDate: `${date?.year}-${date?.month}-${date?.day}`,
            userId: userInfo?.id
        };

        const res = await bookTransport(data);

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

    const renderCell = useCallback((user: any, columnKey: string) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
          case "1":
            return (
              <div style={{ textAlign: 'center' }}>
                {user.transport}
              </div>
            );
          case "2":
            return (
              <div className="flex flex-col">
                <p style={{ textAlign: 'center' }} className="text-bold text-sm capitalize">${user.price}</p>
              </div>
            );
          case "3":
            return (
              <div className="relative flex items-center gap-2" style={{ justifyContent: 'center' }}>
                <Button style={{ display: 'flex', justifyContent: 'center' }} onClick={() => handleBook(user.transport, user.price)}>Book</Button>
              </div>
            );
          default:
            return cellValue;
        }
      }, []);

    async function handleSearch() {

        const fromStation = stations.find((station: stationType) => String(station.id) === from);
        const toStation = stations.find((station: stationType) => String(station.id) === to);
        if(!fromStation || !toStation)return;

        const postcodeDiff = Math.abs(Number(fromStation.postcode) - Number(toStation.postcode));

        const items =[
            {
                id: '1',
                transport: 'Bus',
                price: Math.round(postcodeDiff * 0.8)
            },
            {
                id: '2',
                transport: 'Uber',
                price: Math.round(postcodeDiff * 2)
            },
            {
                id: '3',
                transport: 'Train',
                price: Math.round(postcodeDiff * 1.2)
            },
        ]

        setTable(items);
    }

    function renderTable(){
        if(table.length !== 0){
           return (
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={"center"}>
                        {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={table}>
                    {(item) => (
                        <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
           )
        }
        return emptyTable();
    }

    function emptyTable() {
        return (
            <Table aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>Transport</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
            </Table>
        )
    }

    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url(/img/transportBg.jpg)` }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#1b1b1b', borderRadius: 8 ,opacity: 0.95, padding: 80 }}>
                <div className={styles.title}>
                    <Title>Local Transportation Services</Title>
                    <div className={styles.line}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
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
                    <Select 
                        label="Departure Station" 
                        className="max-w-xs" 
                        color="primary"
                        style={{ width: 250, marginRight: 16 }}
                        onChange={(e) => {
                            setFrom(e.target.value)
                            console.log(e)
                        }}
                    >
                         {stations.map((station: stationType) => (
                            <SelectItem value={from} color="primary" key={station.id}>
                                {station.stationName}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select 
                        label="Arrival Station" 
                        className="max-w-xs" 
                        color="primary"
                        style={{ width: 250, marginRight: 16 }}
                        onChange={(e) => setTo(e.target.value)}
                    >
                        {stations.map((station: stationType) => (
                            <SelectItem value={to} color="primary" key={station.id}>
                                {station.stationName}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button color="primary" onClick={handleSearch}>Search</Button>
                </div>
                {renderTable()}
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
                            <h3>Transport: <b>{currentTransport.transport}</b></h3>
                            <h3>Price: ${currentTransport.price}</h3>
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
                            <h3>Total Price:  {currentTransport.price * person}</h3>
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