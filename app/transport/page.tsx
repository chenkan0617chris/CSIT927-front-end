/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Header from "@/components/header";
import styles from '../../styles/style.module.css';
import Title from "@/components/title";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {Button, DatePicker, DateValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure} from "@nextui-org/react";
import { CITY } from "@/constant/constant";

const columns =[
    {
        uid: '1',
        name: 'transport'
    },
    {
        uid: '2',
        name: 'price'
    },
    {
        uid: '3',
        name: 'action'
    },
]

const items =[
    {
        id: '1',
        transport: 'Bus',
        price: 10
    },
    {
        id: '2',
        transport: 'Uber',
        price: 20
    },
    {
        id: '3',
        transport: 'Train',
        price: 5
    },
]

const Page = () => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [currentTransport, setCurrentTransport] = useState<any>();

    const [date, setDate] = useState<DateValue>();
    const [person, setPerson] = useState(1);

    useEffect(() => {
        (async() => {
 

        })();
    }, []);


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

    function onReserve(e: any){
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

    const renderCell = useCallback((user: any, columnKey: string) => {
        const cellValue = user[columnKey];
        console.log('columnKey', columnKey)
    
        switch (columnKey) {
          case "1":
            console.log('user.transport',user.transport)
            return (
              <div>
                {user.transport}
              </div>
            );
          case "2":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">${user.price}</p>
              </div>
            );
          case "3":
            return (
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Button onClick={() => handleBook(user.transport, user.price)}>Book</Button>
                  </span>
                </Tooltip>
              </div>
            );
          default:
            return cellValue;
        }
      }, []);

    

    function handleSearch() {

    }

    function renderTable(){
        if(items.length !== 0){
           return (
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={"start"}>
                        {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
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

    return <div className={styles.home} style={{ alignItems: 'center', background: 'black' }}>
            <Header></Header>
            <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    >
                        {CITY.map((city: string) => (
                        <SelectItem color="primary" key={city}>
                            {city}
                        </SelectItem>
                        ))}
                    </Select>
                    <Select 
                        label="Departure Station" 
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
                    <Select 
                        label="Arrival Station" 
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