import { defineStore } from 'pinia'
import type { IUser } from '@/features/authentication/types/IUser';

import { useLocalStorage } from '@vueuse/core'

export type BookingFormStore = {
  bookingForm: BookingPerson[],
  needValidate: boolean,
  formsValidateResults: boolean[],
};

type BookingPerson = {
  guests: any[]
}

export const useBookingFormStore = defineStore({
  id: 'bookingFormStore',
  state: () =>
    ({
      bookingForm: useLocalStorage('bookingForm', []),
      needValidate: false,
      formsValidateResults: []
    } as unknown as BookingFormStore),
  getters: {},
  actions: {
    clearValidateResults() {
      this.formsValidateResults = []
    },
    removeGuestsFromRoom(index: number | null) {
      if (index !== null) {
        this.bookingForm.splice(index-1, 1)
      }
    },
    clear() {
      this.bookingForm = []
      this.needValidate = false
      this.formsValidateResults = []
    },

    watch: {
      useBookingList: {
        deep: true,
        handler() {
          useLocalStorage('bookingForm', this.bookingForm)
        }
      }
    }
  },
});