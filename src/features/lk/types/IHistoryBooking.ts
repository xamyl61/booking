export interface IHistoryBooking {
    number_booking: string
    city: string
    hotel: string
    room: string
    date_from: string
    date_till: string
    guests: IGuest[]
    total_price: number
}

export interface IGuest {
    last_name: string
    first_name: string
    middle_name: string
    birthday: string
    email: string
    phone: string
}
