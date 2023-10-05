import { defineStore } from 'pinia'
import type { IUser } from '@/features/authentication/types/IUser';

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
      bookingForm: [],
      needValidate: false,
      formsValidateResults: []
    } as BookingFormStore),
  getters: {},
  actions: {
    clearValidateResults() {
      this.formsValidateResults = []
    }
  },
});