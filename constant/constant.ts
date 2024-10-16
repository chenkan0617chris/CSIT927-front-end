export interface cityType {
    id: number;
    cityName: string;
    cityDescription: string;
}

export const CITY: cityType[]  = [
    {
        "id": 1,
        "cityName": "Wollongong",
        "cityDescription": "Wollongong is a coastal city located in New South Wales, Australia. Known for its beautiful beaches, lush rainforests, and vibrant culture, Wollongong is a popular tourist destination offering a variety of outdoor activities and a relaxed coastal lifestyle."
    },
    {
        "id": 2,
        "cityName": "Sydney",
        "cityDescription": "Sydney is the capital city of New South Wales and one of Australia's largest cities. Famous for its Sydney Opera House, with a distinctive sail-like design, the Sydney Harbour Bridge, and stunning beaches, Sydney is a vibrant and bustling city with a rich cultural scene."
    }
]

export const ROOM_TYPE = ['single', 'double', 'suite'];

export const attractionImg = [
    '/img/img1.jfif',
    '/img/img2.jfif',
    '/img/img2.jfif',
    '/img/img1.jfif',
]

export const BOOKING_TYPE = ['attractionBooks', 'rideBookings', 'hotelBookings'];

export const LIST_TYPE = ['Attraction Booking', 'Riding Booking', 'Hotel Booking'];