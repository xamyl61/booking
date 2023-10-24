<template>
    <div>
        <BookingHeader/>   
        <div class="booking-complete container mx-auto mt-10">
            <div class="booking-complete__title">Проверьте ваше бронирование</div>

            <div class="booking-complete__container">
                <BookingInfo :booking="bookingInfo" />
            </div>

            
            <div class="booking-complete__container">
                <BookingRoom v-for="(room, index) in bookingStore.bookedRooms.rooms" :room="room" :bookingIndex="index"/>
            </div>
            
            <div class="booking-complete__container">
                <BookingPay :pay="bookingPay" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import BookingHeader from "@/features/booking/components/BookingHeader.vue";
import BookingInfo from "@/features/booking/components/BookingInfo.vue";
import BookingRoom from "@/features/booking/components/BookingRoom.vue";
import BookingPay from "@/features/booking/components/BookingPay.vue";
import {reactive, ref} from "vue";

import { useBookingRoomsStore } from "@/stores/booking-store";

const bookingStore = useBookingRoomsStore()

const bookingInfo = ref({
    id: 1,
    number: '1209483'
})



const bookingPay = ref({
    id: 1,
    cost: bookingStore.bookedRooms.total_price,
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