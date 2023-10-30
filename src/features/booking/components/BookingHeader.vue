<template>
    <div>
        <div class="header-line">
            <div class="container mx-auto flex  ">
                <div 
                    v-if="router.currentRoute.value.name == 'booking'"
                    class="cursor-pointer left"
                    @click="router.push('/')"
                >Выбрать номер</div>
                <div class="cursor-pointer" @click="router.push('/booking')">Данные о гостях</div>
                <div>
                    <span
                        v-if="typeof bookingStore.bookedRooms.rooms == 'undefined'"
                        style="opacity: .5;"
                    >
                        Завершить бронирование
                    </span>
                    <span
                    v-else
                        class="cursor-pointer" @click="router.push('/complete')">Завершить бронирование
                    </span>
                </div>

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
        
        .container {
            padding-left: 1.3rem;
            padding-right: 1.3rem;
            & > div {
                width: 33.33%;
                &:first-child {
                    text-align: left;
                }
                &:nth-child(2) {
                    text-align: center;
                }
                &:nth-child(3) {
                    text-align: right;
                }
            }
        }
    }

</style>