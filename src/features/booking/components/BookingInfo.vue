<template>
  <div class="booking-info">
      <div class="booking-info__number">
        <span>Бронь № {{ bookingStore.bookedRooms.number_booking }}</span>
      </div>
      <div class="booking-info__actions">
        <el-button round type="info" size="default">Распечатать</el-button>
        <el-button round type="info" size="default">Скачать</el-button>
        <el-button round type="info" size="default">Редактировать данные</el-button>
      </div>
  </div>

</template>

<script setup lang="ts">


import type {IBookingInfo} from "@/features/booking/types/IBookingInfo";
import type {PropType} from "vue";
import { useBookingRoomsStore } from "@/stores/booking-store";

const bookingStore = useBookingRoomsStore()

const props = defineProps({
  booking: {
    type: Object as PropType<IBookingInfo>,
    required: true
  }
})


</script>

<style scoped lang="scss">
.booking-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__number {
    font-family: 'Geometria', sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
  }

  &__actions {
    display: flex;

    :deep(.el-button) {
      background-color: #EEEAEA;
      border-color: #EEEAEA;
      color: black;
    }

  }
}
</style>