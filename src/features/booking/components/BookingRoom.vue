<template>
<div class="booking-room">

  <div class="booking-room__info">
    <div class="booking-room__number">
        <span>{{ room.hotel }}</span>
    </div>
    <div class="booking-room__description">
      <span>Номер {{ room.roomNumber }}</span>
      <span>Даты {{ Format.formatDate(room.from) }} - {{ Format.formatDate(room.to) }}</span>
    </div>
    <div class="booking-room__check">
        <span>Проверить данные гостей</span>
    </div>
  </div>

  <div class="booking-room__photo">
    <img src="https://picsum.photos/200/300" alt="room photo">
  </div>

</div>
</template>

<script setup lang="ts">

import type {IBookingRoom} from "@/features/booking/types/IBookingRoom";
import type {PropType} from "vue";
import {Format} from "@/utils/format";

const props = defineProps({
  room: {
    type: Object as PropType<IBookingRoom>,
    required: true
  }
})

</script>

<style scoped lang="scss">
.booking-room {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 5px;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__number {
    font-size: 1.5rem;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__check {
    font-size: 1.5rem;
    color: var(--color-primary);
    cursor: pointer;
  }

  &__photo {
    width: 200px;
    height: 300px;
  }
}
</style>