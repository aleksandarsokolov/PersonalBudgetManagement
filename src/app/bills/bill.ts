export interface IBill {
    billId: number;
    date: string;
    memo: string;
    company: string;
    city: string;
    country: string;
    totalPrice: number;
    utcTimeStamp: string;
    userId: number;
    lat: number;
    long: number;
    verified: boolean;
    products: any[];
}