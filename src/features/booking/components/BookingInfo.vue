<template>
  <div class="booking-info">
      <div class="booking-info__number">
        <span>Бронь № {{ booking.number }}</span>
      </div>
      <div class="booking-info__actions">
        <el-button type="primary" size="small">Распечатать</el-button>
        <el-button type="primary" size="small">Скачать</el-button>
        <el-button type="primary" size="small">Редактировать данные</el-button>
      </div>
  </div>

</template>

<script setup lang="ts">


import type {IBookingInfo} from "@/features/booking/types/IBookingInfo";
import type {PropType} from "vue";

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
  padding: 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 5px;

  &__number {
    font-size: 1.5rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }
}
</style>