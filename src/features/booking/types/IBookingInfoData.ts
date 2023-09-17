
import type {IRoomDetails} from "@/features/hotels/types/IRoomDetails";

export interface IBookingInfoData {
    adults: number;
    сhildren: number;
    roomDetails: object;
    dateFrom: string;
    dateTill: string;
    roomPrice: number;
    bonus: number;
    choosedHotel: string;
}