import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IFilterData } from '@/features/hotels/types/IFilterData';
import { useLocalStorage } from '@vueuse/core'

export type FilterStoreState = {
  filter: IFilterData | null;
};

// export const useFilterStore = defineStore({
//   id: 'filterStore',
//   state: () =>
//   ({
// filter: null,
// } as unknown as FilterStoreState),
//   getters: {},
//   actions: {
//     setFilter(filt: IFilterData) {
//       this.filter = filt;
//       useLocalStorage('filter', this.filter)
//     },

//     watch: {
//       filter: {
//         deep: true,
//         handler() {
      
//         }
//       }
//     }
//   },
// });

export const useFilterStore = defineStore('filterStore', () => {
  const filter = ref<any>()

  const setFilter = (filterData: any) => {
    filter.value = filterData
    localStorage.setItem('filter', JSON.stringify(filterData))
  }

  if (localStorage.getItem('filter')) {
    filter.value = JSON.parse(localStorage.getItem('filter') || '')
  } 

  return {filter, setFilter}
})