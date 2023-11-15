import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { IBookingInfoData } from '@/features/booking/types/IBookingInfoData';

import { useLocalStorage } from '@vueuse/core'


export type UseBookingRoomState = {
  useBookingList: IBookingInfoData[];
  bookedRooms: any;
};

export const useBookingRoomsStore = defineStore({
  id: 'bookingRoomsStore',
  state: () =>
    ({
      useBookingList: useLocalStorage('bookingList', []),
      // useBookingList: [],
      bookedRooms: useLocalStorage('bookedRooms', {})
  } as unknown as UseBookingRoomState),
  getters: {
    selectedRooms: (state) => 
      state.useBookingList.map((a: { roomDetails: { room_type: { guid: any; }; }; }) => a.roomDetails.room_type.guid)
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
    clear() {
      this.useBookingList = []
      this.bookedRooms = {}
    },

    watch: {
      useBookingList: {
        deep: true,
        handler() {
          useLocalStorage('bookingList', this.useBookingList)
        }
      }
    }
  },
  // watch(() useBookingList, (state) => {})
});