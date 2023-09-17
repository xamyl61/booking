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
  getters: {},
  actions: {
    setBookingRoom(bookingRoom: IBookingInfoData | null) {
      if (bookingRoom !== null) {
        this.useBookingList.push(bookingRoom)
      }
    },
  },
});