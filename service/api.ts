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


// const mockData: Attraction[] = [
//     {
//         "id": 1,
//         "name": 'Wollongong museum',
//         "description": 'this is test description',
//         "img": '/img/img1.jfif',
//         "price": 10
//     },
//     {
//         "id": 2,
//         "name": 'Art gallery',
//         "description": 'this is test description',
//         "img": '/img/img2.jfif',
//         "price": 10
//     },
//     {
//         "id": 3,
//         "name": 'Darling harbor',
//         "description": 'this is test description',
//         "img": '/img/img2.jfif',
//         "price": 10
//     },
// ];

// export async function getLAM() {
//     // const res = await fetch('/getLAM');

//     // if(!res.ok){
//     //     throw new Error('Failed to fetch data');
//     // }

//     return mockData;
// }

export async function bookLAM(data: any){
    console.log(data);
    //   const res = await fetch('/bookLAM', {
    //     body: JSON.stringify(data)
    //   });

    // if(!res.ok){
    //     throw new Error('Failed to fetch data');
    // }
    // return res.json();
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
    return res.data;
}




