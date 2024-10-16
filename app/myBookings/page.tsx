/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { useEffect, useState } from "react";
import {Select, 
    SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import { BOOKING_TYPE, LIST_TYPE } from "@/constant/constant";
import { getBookings } from "@/service/api";

const attractionBookings_Col = [
    {
        uid: '1',
        name: 'id'
    },
    {
        uid: '2',
        name: 'attractionName'
    },
    {
        uid: '3',
        name: 'cityName'
    },
    {
        uid: '4',
        name: 'homeAddress'
    },
    {
        uid: '5',
        name: 'phoneNumber'
    },
    {
        uid: '6',
        name: 'ticketPrice'
    },
    {
        uid: '7',
        name: 'numberOfPeople'
    },
    {
        uid: '8',
        name: 'totalPrice'
    },
    {
        uid: '9',
        name: 'bookingDate'
    },
]

const hotelBookings_columns =[
    {
        uid: '1',
        name: 'id'
    },
    {
        uid: '2',
        name: 'hotelName'
    },
    {
        uid: '3',
        name: 'cityName'
    },
    {
        uid: '4',
        name: 'homeAddress'
    },
    {
        uid: '5',
        name: 'roomType'
    },
    {
        uid: '6',
        name: 'pricePerRoom'
    },
    {
        uid: '7',
        name: 'numberOfRooms'
    },
    {
        uid: '8',
        name: 'totalPrice'
    },
    {
        uid: '9',
        name: 'checkinDate'
    },
    {
        uid: '10',
        name: 'checkoutDate'
    },
]

const riding_columns =[
    {
        uid: '1',
        name: 'id'
    },
    {
        uid: '2',
        name: 'startStationName'
    },
    {
        uid: '3',
        name: 'endStationName'
    },
    {
        uid: '4',
        name: 'cityName'
    },
    {
        uid: '5',
        name: 'homeAddress'
    },
    {
        uid: '6',
        name: 'price'
    },
    {
        uid: '7',
        name: 'numberOfPassengers'
    },
    {
        uid: '8',
        name: 'totalPrice'
    },
    {
        uid: '9',
        name: 'transportationMode'
    },
    {
        uid: '10',
        name: 'bookingDate'
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

interface currentListType {
    id: number;
}

const Page = () => {
    const [attractionList, setAttractionList] = useState<any>([]);
    const [ridingList, setRidingList] = useState<any>([]);
    const [hotelList, setHotelList] = useState<any>([]);
    const [currentList, setCurrentList] = useState<currentListType[]>([] as currentListType[]);
    const [currentCol, setCurrentCol] = useState(hotelBookings_columns);

    useEffect(() => {
        (async () => {
            const newUserInfo = localStorage.getItem('userInfo');
            if(!newUserInfo)return;
            const info = JSON.parse(newUserInfo);

            const list = await getBookings(info.id);
            setAttractionList(list[BOOKING_TYPE[0]]);
            setRidingList(list[BOOKING_TYPE[1]]);
            setHotelList(list[BOOKING_TYPE[2]]);
            setCurrentList(list[BOOKING_TYPE[2]]);
        })();
    }, []);

    const renderData = (item: any, key: number) => {
        const keyword = currentCol[key - 1].name;
        const cellValue = item[keyword];
        return (
            <div style={{ textAlign: 'center' }}>
            {cellValue}
            </div>
        );
    };

    function renderTable(){
        if(currentList.length !== 0){
           return (
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={currentCol}>
                    {(column) => (
                        <TableColumn key={column.uid} align={"center"}>
                        {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={currentList}>
                    {(item) => {
                           return  <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderData(item, Number(columnKey))}</TableCell>}
                            </TableRow>
                    }}
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

    return <div className={styles.home} style={{ alignItems: 'center', backgroundImage: `url(/img/hotel.jpg)` }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#1b1b1b', borderRadius: 8 ,opacity: 0.95, padding: 80 }}>
                <div className={styles.title}>
                    <Title>My Bookings</Title>
                    <div className={styles.line}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                    <Select 
                        label="Select booking" 
                        className="max-w-xs" 
                        color="primary"
                        style={{ width: 250, marginRight: 16 }}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if(value === 0){
                                setCurrentList(attractionList);
                                setCurrentCol(attractionBookings_Col);
                            } else if (value === 1) {
                                setCurrentList(hotelList);
                                setCurrentCol(hotelBookings_columns);
                            } else {
                                setCurrentList(ridingList);
                                setCurrentCol(riding_columns);
                            }
                        }}
                    >
                        {LIST_TYPE.map((type: string, index: number) => (
                            <SelectItem color="primary" key={index} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                {renderTable()}
            </div>
        </div>
};

export default Page;