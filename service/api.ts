/* eslint-disable @typescript-eslint/no-explicit-any */
const mockData = [
    {
        "id": 1,
        "name": 'Wollongong museum',
        "description": 'this is test description',
        "img": '/img/img1.jfif'
    },
    {
        "id": 2,
        "name": 'Art gallery',
        "description": 'this is test description',
        "img": '/img/img2.jfif'
    },
    {
        "id": 3,
        "name": 'Darling harbor',
        "description": 'this is test description',
        "img": '/img/img2.jfif'
    },
];

export async function getLAM() {
    // const res = await fetch('/getLAM');

    // if(!res.ok){
    //     throw new Error('Failed to fetch data');
    // }

    return mockData;
}

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