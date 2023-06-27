<template>




    <div class="container mx-auto">
            <div class="container my-12 mx-auto px-4 md:px-12 room-type">
                <div class="flex flex-wrap -mx-1 lg:-mx-4">
                    <div
                        v-for="roomType in roomTypes" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article class="overflow-hidden">
                            <a href="#">
                                <!-- <img alt="Placeholder" class="block h-auto w-full" src="@/assets/room1.jpg"> -->
                                <Splide 
                                    :has-track="false"
                                    :options="{ type: 'loop' }"
                                >

                                    <div class="custom-wrapper">
                                        <SplideTrack>
                                            <SplideSlide>
                                            <img src="@/assets/room1.jpg" alt="Sample 1">
                                            </SplideSlide>
                                            <SplideSlide>
                                            <img src="@/assets/room1.jpg" alt="Sample 2">
                                            </SplideSlide>
                                        </SplideTrack>

                                        <div class="splide__arrows">
                                            <button class="splide__arrow--prev">
                                                <IconSlideRight/>
                                            </button>
                                            <button class="splide__arrow--next">
                                                <IconSlideRight/>
                                            </button>
                                        </div>

                                        <ul class="splide__pagination sircle-items">
                                            
                                        </ul>
                                    </div>
                                </Splide>   
                            </a>
                            <div class="leading-tight">
                                <h1 class="">
                                    <a class="no-underline text-black" href="#">
                                        {{ roomType.title }}
                                    </a>
                                </h1>
                            </div>
                            
                            <div class="flex items-center params">
                                <div class="flex items-center">
                                    <IconPerson/>
                                    {{ roomType.number_of_persons_per_room }} человека
                                </div>
                            </div>

                            <div class="flex room-description">
                                <a class="flex items-center no-underline hover:underline text-black" href="#">
                                    Подробнее о номере
                                    <IconArrowLeftInCircle/>
                                </a>
                            </div>

                        </article>
                    </div>
                </div>
                <!-- <div
                    v-if="roomTypes.length == 0 && showNoRoomsNotification"
                >
                    <h6 class="text-3xl	 text-center">Онлайн бронирование недоступно. Вы можете забронировать номер по телефону 8-800-100-33-93</h6>
                </div> -->
            </div>
        </div>

</template>
  
<script setup lang="ts">
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';

    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    


    interface Room {
        title: string
        guid: string
        number_of_persons_per_room: number
        number_of_adults: number
    }

    const props = defineProps({
        roomTypes: Object as PropType<Room[]>
    })


</script>
  
<style scoped>

.room-type {
        
    }
    .room-type article {
        border: 1px solid #EAEAEA;
    }
    .room-type h1 {
        padding: 1.5rem 1.8rem 1.5rem;
        font-size: 1.8rem;
        line-height: 1;
        text-align: left;
    }
    .room-type .params {
        padding: 1rem 1.8rem;
        border-top: 1px solid #EAEAEA;
        border-bottom: 1px solid #EAEAEA;
        font-size: .9rem;
    }
    .room-type .params .icon {
        padding-right: .8rem;
    }

</style>