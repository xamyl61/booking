<template>

    <div class="my-booking">
        <LkHeader>
            <template #title>
                Планируется заезд
            </template>
            <template #icon>
                <BirdIcon />
            </template>
        </LkHeader>

        <div class="my-booking__content">
            <BookingCard />
        </div>

        <LkHeader>
            <template #title>
                История бронирований
            </template>
            <template #icon>
                <ShellIcon />
            </template>
        </LkHeader>

        <div class="my-booking__content">
            <template v-if="isLoading">
                <el-skeleton :rows="1" />
            </template>
            <template v-else>
                <BookingHistoryCard v-for="(history) in histories" :history="history" />
                <span v-if="histories.length === 0">История бронирований отсутствует</span>
            </template>
        </div>
    </div>

</template>

<script setup lang="ts">
import LkHeader from "@/features/lk/components/LkHeader.vue";
import BirdIcon from "@/features/lk/components/Icons/BirdIcon.vue";
import BookingCard from "@/features/lk/components/BookingCard.vue";
import ShellIcon from "@/features/lk/components/Icons/ShellIcon.vue";
import BookingHistoryCard from "@/features/lk/components/BookingHistoryCard.vue";
import {onMounted, ref} from "vue";
import client from "@/api/client";
import {toast} from "vue3-toastify";

const histories = ref([])
const bookings = ref([])
const isLoading = ref(true)

onMounted(() => {
    getMyBookingInfo()
})

const getMyBookingInfo = async () => {

    try {
        const currentBooking = await client.get('/v2/users/booking/');
        histories.value = currentBooking.data.history_booking;
        bookings.value = currentBooking.data.current_booking
    } catch (e) {
        toast('Не удалось получить бонусный счет', {
            type: 'error',
            position: 'top-center',
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<style scoped lang="scss">
.my-booking {
    padding-top: 50px;

    &__content {
        padding: 3rem 5rem 2rem 5rem;
    }

    &__submit {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    &__title {
        font-family: Geometria, sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;
    }
}
</style>