export interface IRoomType {
    title: string
    room_type: {
        guid: string
        number_of_persons_per_room: number
        number_of_adults: number
        number_of_beds_per_room: number

    }
    cover_image: {
        full_url: string
        url: string
    }
    gallery: [
        {
            image: {
                full_url: string
                url: string
            }
        }
    ]
    room_square: number
    price: number
    price_info: {
        full_price: number
        discount: number
        bonus: number
        price: number

    }
    is_available: boolean
    is_available_index: number
}