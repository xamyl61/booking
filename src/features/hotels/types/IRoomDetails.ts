export interface IRoomDetails {
    title: string,
    room_square: number,
    price: number,
    description: string,
    room_rate_description: string,
    room_type: {
        number_of_beds_per_room: number,
        number_of_persons_per_room: number,
        guid: string
    },
    cover_image: {
        full_url: string
    },
    gallery: [
        {
            image: {
                full_url: string,
                alt: string
            }
        }
    ],
    amenity_title: string,
    amenity_categories: [
        {
            title: string,
            amenity_items: [
                {
                    amenity: {
                        title: string,
                        icon: {
                            alt: string,
                            full_url: string
                        }
                    }
                }
            ]
        }
    ],
    arrival_service_title: string,
    arrival_service_categories: [
        {
            title: string,
            arrival_service_sub_categories: [
                {
                    title: string,
                    arrival_service_items: [
                        {
                            arrival_service: {
                                title: string,
                                icon: {
                                    full_url: string
                                }
                            }
                        }
                    ]
                    
                }
            ]
        }
    ],
    arrival_service_header_items: [
        {
            arrival_service: {
                title: string,
                icon: {
                    full_url: string
                }
            }
        }
    ],
    checkout_hours: string
}