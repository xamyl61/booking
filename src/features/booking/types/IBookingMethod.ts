export interface IBookingMethod {
    id: number;
    cost: string;
    method: BookingPayMethod;
    part?: number;
}

export enum BookingPayMethod {
    Full = 1,
    Part = 2,
}