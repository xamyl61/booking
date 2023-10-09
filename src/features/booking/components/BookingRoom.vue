<template>
<div class="booking-room">

  <div class="booking-room__info">
    <div class="booking-room__number">
        <span>{{ room.hotel }}</span>
    </div>

      <el-descriptions :column="2" size="large">
          <el-descriptions-item label="Номер">{{ room.title }}</el-descriptions-item>
          <el-descriptions-item label="Даты">{{ dateFormat(new Date(room.date_from)) }} &nbsp; - &nbsp; {{ dateFormat(new Date(room.date_till)) }} <br> <span class="font-normal">{{room.checkout_hours}}</span></el-descriptions-item>
        </el-descriptions>

    <div class="booking-room__check">
        <span>Проверить данные гостей</span>
    </div>
  </div>

  <div class="booking-room__photo">
    <img :src="room.cover_image.full_url" alt="">
    <!-- <img src="https://via.placeholder.com/400x200" alt="room photo"> -->
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

const dateFormat = (date: Date) => {
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.toLocaleString("default", { day: "numeric" });
    let weekday = date.toLocaleString("default", { weekday: "short" });
    let formattedDate = day  + " " + month + " " + ", " + weekday;

    return formattedDate
}

</script>

<style scoped lang="scss">
.booking-room {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #EEEAEA;

  &__info {
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 1rem;
  }

  &__number {
    font-family: "Optima Cyr", serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__check {
    font-family: 'Geometria', sans-serif;
    color: #202020;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    text-decoration: underline;
  }

  &__photo {
    width: 400px;
    height: 190px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  :deep(.el-descriptions__label) {
    font-family: 'Geometria', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #939393;
  }

  :deep(.el-descriptions__content) {
    font-family: 'Geometria', sans-serif;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    color: #202020;
  }
}
</style>