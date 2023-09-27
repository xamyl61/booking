import { defineStore } from 'pinia'
import type { IUser } from '@/features/authentication/types/IUser';

export type AuthStoreState = {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () =>
    ({
      user: null,
        isAuthenticated: false,
        isLoading: false,
    } as AuthStoreState),
  getters: {},
  actions: {
    login(user: IUser) {
        this.user = user;
        this.isAuthenticated = true;
    },
    setUser(user: IUser) {
      this.user = user;
    },
    logout() {
      this.user = null;
        this.isAuthenticated = false;
    },
    setLoading(isLoading: boolean) {
        this.isLoading = isLoading;
    }
  },
});