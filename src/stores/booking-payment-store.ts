import { defineStore } from 'pinia'
import type { IUser } from '@/features/authentication/types/IUser';

export type BookingPaymentStore = {
  bookingPayment: any;
};


export const useBookingPaymentStore = defineStore({
  id: 'bookingPaymentStore',
  state: () =>
    ({
      bookingPayment: {}
    } as BookingPaymentStore),
  getters: {},
  actions: {
  
  },
});