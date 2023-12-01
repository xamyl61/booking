<template>
    <div>
        <div class="header-line">
            <div class="container mx-auto flex">
                <div 
                    v-if="router.currentRoute.value.name == 'booking'"
                    class="cursor-pointer left"
                    :class="{booking: router.currentRoute.value.name == 'booking'}"
                    @click="router.push('/')"
                >
                    <span class="arrow"><IconSlideRight/></span>
                    <span class="text">Выбрать номер</span>
                </div>
                <div class="cursor-pointer center" @click="router.push('/booking')" :class="{complete: router.currentRoute.value.name == 'complete'}">
                    <span v-if="router.currentRoute.value.name == 'complete'" class="arrow"><IconSlideRight/></span>
                    <span class="text">Данные о гостях</span>
                </div>
                <div class="right" :class="{booking: router.currentRoute.value.name == 'booking'}">
                    <span
                        v-if="typeof bookingStore.bookedRooms.rooms == 'undefined'"
                        style="opacity: .5;"
                    >
                        <span class="text desktop">Завершить бронирование</span>
                        <span class="text mobile">Завершить</span>
                        <span class="arrow"><IconSlideRight/></span>
                    </span>
                    <span
                    v-else
                        class="cursor-pointer" @click="router.push('/complete')">
                        <span class="text desktop">Завершить бронирование</span>
                        <span class="text mobile">Завершить</span>
                        <span v-if="router.currentRoute.value.name == 'booking'" class="arrow"><IconSlideRight/></span>
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
            @media (max-width: 1600px) {
                padding-left: 3.3rem;
                padding-right: 3.3rem;
            }
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
        .center {
            .arrow {
                transform: rotate(180deg);
                left: -2rem;
                @media (max-width: 1600px) {
                    left: 1rem;
                }
            }
            &.complete {
                @media (max-width: 1024px) {
                    width: auto;
                    .text {
                        display: none;
                    }
                }
            }
        }
        .left {
            .arrow {
                transform: rotate(180deg);
                left: -2rem;
                @media (max-width: 1600px) {
                    left: 1rem;
                }
            }
            .text {
                @media (max-width: 1024px) {
                    display: none;
                }
            }
            &.booking {
                @media (max-width: 1024px) {
                    width: auto;
                    .text {
                        display: none;
                    }
                }
            }
        }
        .right {
            .arrow {
                right: -2rem;
                @media (max-width: 1600px) {
                    right: 1rem;
                }
            }
            &.booking {
                @media (max-width: 1024px) {
                    width: auto;
                    .text {
                        display: none;
                    }
                }
            }
            .desktop {
                @media (max-width: 767px) {
                    display: none;
                }
            }
            .mobile {
                display: none;
                @media (max-width: 767px) {
                    display: inline-block;
                }
            }
        }
        .arrow {
            position: absolute;
        }
        .text {
            @media (max-width: 1024px) {
                // display: none;
            }
        }
    }

</style>