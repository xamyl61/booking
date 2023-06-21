import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/features/authentication/types/IUser';

export type AuthStoreState = {
  authUser: IUser | null;
};

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () =>
    ({
      authUser: null,
    } as AuthStoreState),
  getters: {},
  actions: {
    setAuthUser(user: IUser | null) {
      this.authUser = user;
    },
  },
});