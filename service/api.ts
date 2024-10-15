/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Attraction {
    id: number;
    attractionName: string;
    cityId: string;
    cityName: string;
    attractionDescription: string;
    img?: string;
    price: number;
}

export async function getCities(){
    let res: any = await fetch('http://localhost:8085/api/lam/getCities');

    if(!res){
        return null;
    }

    res = await res.json();

    return res.data;
}

export async function registerAPI(data: any){
    let res: any = await fetch('http://localhost:8081/api/tic/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(!res){
        return null;
    }

    res = await res.json();

    return res;
}

export async function login(data: any){
    let res: any = await fetch('http://localhost:8081/api/tic/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if(!res){
        return null;
    }

    res = await res.json();

    return res;
}

export async function listAttractions(data: any){
    let res: any = await fetch(`http://localhost:8085/api/lam/getAttractions/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(!res){
        return null;
    }

    res = await res.json();

    return res.data;
}

export async function bookAttractions(data: any){
    let res: any = await fetch(`http://localhost:8085/api/lam/saveBooking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });

    if(!res){
        return null;
    }

    res = await res.json();

    return res;
}


export async function listHotels(data: any){
    let res: any = await fetch(`http://localhost:8084/api/ap/getHotels/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(!res){
        return null;
    }

    res = await res.json();

    return res.data;
}

export async function bookHotel(data: any){
    let res: any = await fetch(`http://localhost:8084/api/ap/saveBooking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });
    if(!res){
        return null;
    }
    res = await res.json();
    return res;
}


export async function listStations(data: any){
    let res: any = await fetch(`http://localhost:8086/api/lts/getStations/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(!res){
        return null;
    }

    res = await res.json();

    return res.data;
}

export async function getPriceStation(from: string, to: string){
    let res: any = await fetch(`http://localhost:8086/api/lts/getPrice/${from}/${to}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!res){
        return null;
    }
    res = await res.json();
    return res.data;
}

export async function bookTransport(data: any){
    let res: any = await fetch(`http://localhost:8086/api/lts/saveBooking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });
    if(!res){
        return null;
    }
    res = await res.json();
    return res;
}

export async function getBankCard(data: any){
    let res: any = await fetch(`http://localhost:8088/api/pc/getBankAccount/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!res){
        return null;
    }
    res = await res.json();
    return res;
}

export async function saveBankCard(data: any){
    let res: any = await fetch(`http://localhost:8088/api/pc/saveBankAccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),

    });
    if(!res){
        return null;
    }
    res = await res.json();
    return res;
}

export async function getBookings(data: any){
    let res: any = await fetch(`http://localhost:8081/api/tic/getRideBookings/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(!res){
        return null;
    }
    res = await res.json();
    return res.data;
}







