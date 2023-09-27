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
        console.log(bookingRoom)
        // localStorage.setItem("bookingRoom", JSON.stringify(this.useBookingList))
      }
    },
    updateBookingRoomGuestsData(bookingWithGuests: object[] | null, index: number) {
      if (bookingWithGuests !== null) {
        this.useBookingList.map((o, i) => {
          
          if (index === i+1) {
            // console.log("i: ", i+1)
            // console.log("index: ", index)
            // console.log("bookingWithGuests: ", bookingWithGuests)
            // console.log("o: ", o)
            return o["guestsData"] = bookingWithGuests;
          }
          return o;
        });
        console.log("this.useBookingList: ", this.useBookingList)
        // console.log("bookingListWithGuestsData: ", bookingListWithGuestsData)
        // this.useBookingList = bookingListWithGuestsData
      }
    },
    removeRoomFromBooking(room: string | '') {
      if (room !== '') {
        this.useBookingList = this.useBookingList.filter(roomItem => room !== roomItem.roomDetails.room_type.guid)
        // localStorage.setItem("bookingRoom", JSON.stringify(this.useBookingList))
      }
    },
  },
});