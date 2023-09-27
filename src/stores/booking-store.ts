import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IBookingInfoData } from '@/features/booking/types/IBookingInfoData';

export type UseBookingRoomState = {
  useBookingList: IBookingInfoData[];
};

export const useBookingRoomsStore = defineStore({
  id: 'bookingRoomsStore',
  state: () =>
    ({
      useBookingList: [],
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
    updateBookingRoomGuestsData(bookingWithGuests: object[] | null, index: number) {
      if (bookingWithGuests !== null) {
        this.useBookingList.map((o, i) => {
          
          if (index === i+1) {
            return o["guestsData"] = bookingWithGuests;
          }
          return o;
        });
      }
    },
    removeRoomFromBooking(room: string | '') {
      if (room !== '') {
        this.useBookingList = this.useBookingList.filter(roomItem => room !== roomItem.roomDetails.room_type.guid)
      }
    },
  },
});