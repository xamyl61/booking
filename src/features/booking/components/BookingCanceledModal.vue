<template>
    <div v-if="props.show" class="booking-canceled">
        <div class="booking-canceled__block">
            <div class="booking-canceled__text">Ваше бронирование аннулировано. <br/> Пожалуйста, воспользуйтесь новым поиском.</div>
            <button class="btn" @click="openFilter">Выбрать номер</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue";

import { useBookingRoomsStore } from "@/stores/booking-store";
import { useBookingFormStore } from '@/stores/booking-form-store';
import { useBookingPaymentStore } from '@/stores/booking-payment-store';
import { useRouter } from "vue-router";

const bookingStore = useBookingRoomsStore()
const bookingFormStore = useBookingFormStore()
const bookingPaymentStore = useBookingPaymentStore()
const router = useRouter()



const props = defineProps({
  show: {
    type: Boolean,
    required: true
  }
})



const openFilter = () => {
    bookingStore.clear()
    bookingFormStore.clear()
    bookingPaymentStore.clear()
    router.push('/')
}
</script>

<style scoped lang="scss">
.booking-canceled {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    align-items: center;
    justify-content: center;

    &__block {
        padding: 3rem;
        background: #fff;
    }
    &__text {
        font-size: 1rem;
        padding-bottom: 1.4rem;
    }
}
</style>