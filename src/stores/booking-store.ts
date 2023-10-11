import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IBookingInfoData } from '@/features/booking/types/IBookingInfoData';


export type UseBookingRoomState = {
  useBookingList: IBookingInfoData[];
  bookedRooms: any
};

export const useBookingRoomsStore = defineStore({
  id: 'bookingRoomsStore',
  state: () =>
    ({
      useBookingList: [],
      bookedRooms: {}
    } as UseBookingRoomState),
  getters: {
    selectedRooms: (state) => 
      state.useBookingList.map(a => a.roomDetails.room_type.guid)
  },
  actions: {
    // addBookingRoom
    setBookingRoom(bookingRoom: IBookingInfoData | null) {
      if (bookingRoom !== null) {
        this.useBookingList.push(bookingRoom)
      }
    },
    removeRoomFromBooking(index: number | null) {
      if (index !== null) {
        this.useBookingList.splice(index-1, 1)
      }
    },
  },
});