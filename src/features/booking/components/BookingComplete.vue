<template>
  <h3>Проверьте ваше бронирование</h3>

  <BookingInfo :booking="bookingInfo" />

    <div class="booking-room__container">
        <BookingRoom v-for="room in bookingRooms" :room="room" />
    </div>

  <BookingPay :pay="bookingPay" />

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
.booking-room__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>