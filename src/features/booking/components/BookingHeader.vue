<template>
    <div>
        <!-- {{ bookingStore.bookedRooms.rooms.lnegth }} -->
        <div class="header-line">
            <div class="container mx-auto flex justify-between ">
                <div class="cursor-pointer left" @click="router.push('/')">Выбрать номер</div>
                <div class="cursor-pointer center" @click="router.push('/booking')">Данные о гостях</div>
                <!-- <div
                    v-if="typeof bookingStore.bookedRooms.rooms === undefined"
                    style="opacity: .5;"
                    class="left">Завершить бронирование
                </div>
                <div
                v-else
                    class="cursor-pointer left" @click="router.push('/complete')">Завершить бронирование
                </div> -->

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useBookingRoomsStore } from "@/stores/booking-store";

    const bookingStore = useBookingRoomsStore()

    const router = useRouter()

</script>
    
<style scoped  lang="scss">
    .header-line {
        background-color: var(--color-primary);
        color: #fff;
        padding: 1rem 0;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }

</style>