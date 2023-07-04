<template>
    <div class="room-type container mx-auto md:flex md:flex-wrap lg:gap-2 p-3 md:p-8 lg:px-20 lg:py-8">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div
                v-for="roomType in roomTypes" class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                <article class="overflow-hidden h-full flex flex-col">
                    <Splide 
                        :has-track="false"
                        :options="{ type: 'loop' }"
                    >

                        <div class="custom-wrapper">
                            <SplideTrack>
                                <SplideSlide>
                                    <img :src="`https://backmb.aleancollection.ru/` + roomType.cover_image.file" alt="">
                                </SplideSlide>
                  
                                <SplideSlide
                                    v-for="room_image in roomType.gallery"
                                >
                                    <img :src="`https://backmb.aleancollection.ru/` + room_image.image.file" alt="">
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
                    <div class="leading-tight grow">
                        <h1 class="">
                            <a class="no-underline text-black" href="#">
                                {{ roomType.room_type.title }}
                            </a>
                        </h1>
                    </div>
                    
                    <div class="flex items-center params">
                        <div class="flex items-center">
                            <div class="flex items-center pr-4 text-xs">
                                <IconPerson/>
                                {{ roomType.room_type.number_of_persons_per_room }} человека
                            </div>
                            <div class="flex items-center pr-4 text-xs">
                                <IconSquare/>
                                {{ roomType.room_square }} м2
                            </div>
                            <div class="flex items-center text-xs">
                                <IconHome/>
                                {{ roomType.room_type.number_of_beds_per_room }} комнаты
                            </div>
                        </div>
                    </div>

                    <div class="flex room-description pr-4">
                        <a class="flex items-center no-underline hover:underline text-black" href="#">
                            Подробнее о номере
                            <IconArrowLeftInCircle/>
                        </a>
                    </div>

                    <div class="card-foot flex justify-between px-4">
                        <div class="">
                            <div class="flex justify-between mb-1 h-4">
                                <div class="discount-percent text-xs">-20%</div>
                                <div class="discount-cost text-xs line-through">245 659 р.</div>
                            </div>
                            <div class="cost text-2xl h-9">{{ roomType.price * countOfPersons  }} р.</div>
                            <div class="person-nights text-xs">{{ countOfPersons }} чел. / {{ countOfDays }} ночи</div>
                        </div>
                        <div class="pt-3">
                            <div class="flex justify-center align-center h-5">
                                <IconRuble/>
                                <div class="text-xs pl-1 bonus-counts">3 000 бонусов</div>
                            </div>
                            <Button  @click="">Выбрать</Button>
                        </div>
                    </div>
                    
                </article>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';

    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconPerson from '@/components/icons/IconPerson.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';

    import Button from '@/components/Button.vue';

    interface Room {
        room_type: {
            title: string
            number_of_persons_per_room: number
            number_of_adults: number
            number_of_beds_per_room: number
            
        }
        cover_image: {
            file: string
        }
        gallery: [
            {
                image: {
                    file: string
                }
            }
        ]
        room_square: number
        price: number

         
    }

    const props = defineProps({
        roomTypes: Object as PropType<Room[]>,
        countOfDays: Number,
        countOfPersons: Number
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
        font-family: 'Optima Cyr';
    }
    .room-type .params {
        padding: 1rem 1.8rem;
        border-top: 1px solid #EAEAEA;
        border-bottom: 1px solid #EAEAEA;
        font-size: .9rem;
    }
    .room-type .params .icon {
        padding-right: .4rem;
    }


    .card-foot {
        padding: 0 1.8rem 1rem;
    }

    .card-foot .cost {
        font-family: 'Optima Cyr';
    }
    .card-foot .btn {
        width: 11rem;
    }
    .discount-percent {
        font-family: 'Optima Cyr';
        color: #EB5757;
    }
    .discount-cost,
    .person-nights,
    .bonus-counts {
        font-family: 'Optima Cyr';
        color: #939393;
    }




</style>