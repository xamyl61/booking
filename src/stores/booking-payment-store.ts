import { defineStore } from 'pinia'
import type { IUser } from '@/features/authentication/types/IUser';
import { useLocalStorage } from '@vueuse/core'

export type BookingPaymentStore = {
  bookingPayment: any;
};


export const useBookingPaymentStore = defineStore({
  id: 'bookingPaymentStore',
  state: () =>
    ({
      bookingPayment: useLocalStorage('bookingPayment', {})
    } as BookingPaymentStore),
  getters: {},
  actions: {
    watch: {
      bookingPayment: {
        deep: true,
        handler() {
          useLocalStorage('bookingPayment', this.bookingPayment)
        }
      }
    }
  },
});