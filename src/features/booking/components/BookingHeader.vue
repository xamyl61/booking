<template>
    <div>
        <div class="header-line">
            <div class="container mx-auto flex  ">
                <div 
                    v-if="router.currentRoute.value.name == 'booking'"
                    class="cursor-pointer left"
                    @click="router.push('/')"
                >
                    <span class="arrow"><IconSlideRight/></span>
                    <span class="text">Выбрать номер</span>
                </div>
                <div class="cursor-pointer" @click="router.push('/booking')">Данные о гостях</div>
                <div class="right">
                    <span
                        v-if="typeof bookingStore.bookedRooms.rooms == 'undefined'"
                        style="opacity: .5;"
                    >
                        <span class="text">Завершить бронирование</span>
                        <span class="arrow"><IconSlideRight/></span>
                    </span>
                    <span
                    v-else
                        class="cursor-pointer" @click="router.push('/complete')">
                        <span class="text">Завершить бронирование</span>
                        <span class="arrow"><IconSlideRight/></span>
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

    import IconSlideRight from '@/components/icons/IconSlideRight.vue';

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
            position: relative;
            padding-left: 1.3rem;
            padding-right: 1.3rem;
            & > div {
                width: 33.33%;
                &:first-child {
                    text-align: left;
                }
                &:nth-child(2) {
                    text-align: center;
                    @media (max-width: 1024px) {
                        width: 100%;
                    }
                }
                &:nth-child(3) {
                    text-align: right;
                }
            }
        }
        .arrow {
            display: inline-block;
            top: 4px;
            scale: 1.2;
        }
        .left {
            .arrow {
                transform: rotate(180deg);
                left: -2rem;
                @media (max-width: 1024px) {
                    left: 1rem;
                }
            }
        }
        .right {
            .arrow {
                right: -2rem;
                @media (max-width: 1024px) {
                    right: 1rem;
                }
            }
        }
        .arrow {
            position: absolute;
        }
        .text {
            @media (max-width: 1024px) {
                display: none;
            }
        }
    }

</style>