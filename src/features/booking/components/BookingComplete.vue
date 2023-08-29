<template>
    <div class="booking-complete">
        <div class="booking-complete__title">Проверьте ваше бронирование</div>

        <div class="booking-complete__container">
            <BookingInfo :booking="bookingInfo" />
        </div>

        <div class="booking-complete__container">
            <BookingRoom v-for="room in bookingRooms" :room="room" />
        </div>

        <div class="booking-complete__container">
            <BookingPay :pay="bookingPay" />
        </div>

    </div>
</template>

<script setup lang="ts">
import BookingInfo from "@/features/booking/components/BookingInfo.vue";
import BookingRoom from "@/features/booking/components/BookingRoom.vue";
import BookingPay from "@/features/booking/components/BookingPay.vue";
import {reactive, ref} from "vue";

const bookingInfo = ref({
    id: 1,
    number: '1209483'
})

const bookingRooms = reactive([
    {
        id: 1,
        roomId: 1,
        roomNumber: 'Standart 1-комнатный',
        from: '2021-09-01',
        to: '2021-09-05',
        hotel: 'Alean Family, г. Анапа'
    },
    {
        id: 2,
        roomId: 2,
        roomNumber: 'Standart 1-комнатный',
        from: '2021-09-01',
        to: '2021-09-05',
        hotel: 'Alean Family, г. Анапа'
    },
])

const bookingPay = ref({
    id: 1,
    cost: '10000',
    bonus: '1000'
})

</script>

<style scoped lang="scss">

.booking-complete {

  &__title {
    font-family: "Optima Cyr",serif;
    font-size: 24px;
    line-height: 30px;
    font-weight: 400;
  }

  &__container {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    gap: 1rem;
  }
}
</style>