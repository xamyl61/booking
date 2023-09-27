import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IFilterData } from '@/features/hotels/types/IFilterData';

export type FilterStoreState = {
  filter: IFilterData | null;
};

export const useFilterStore = defineStore({
  id: 'filterStore',
  state: () =>
    ({
      filter: null,
    } as FilterStoreState),
  getters: {},
  actions: {
    setFilter(filter: IFilterData) {
      this.filter = filter;
    },
  },
});