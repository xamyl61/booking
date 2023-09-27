import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IRoomType } from '@/features/hotels/types/IRoomType';


export type FilteredRoomsState = {
  filteredRooms: IRoomType[];
};


export const useFilteredRoomsStore = defineStore({
  id: 'filteredRoomsStore',
  state: () =>
    ({
      filteredRooms: [],
    } as FilteredRoomsState),
  getters: {},
  actions: {
    setRooms(rooms: IRoomType | null) {
      if (rooms !== null) {
        this.filteredRooms.push(rooms)
      }
    },
  },
});