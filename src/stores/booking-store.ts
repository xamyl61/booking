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
    removeRoomFromBooking(room: string | '') {
      if (room !== '') {
        this.useBookingList = this.useBookingList.filter(roomItem => room !== roomItem.roomDetails.room_type.guid)
      }
    },
  },
});