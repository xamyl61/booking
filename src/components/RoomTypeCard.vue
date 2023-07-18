<template>
    <div class="room-type container mx-auto md:flex md:flex-wrap lg:gap-2 p-3 md:p-8 lg:px-20 lg:py-8">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <div
                v-for="roomType in roomTypes"
                class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
            >
                <article class="overflow-hidden h-full flex flex-col">
                    <Splide 
                        :has-track="false"
                        :options="{ type:  roomType.gallery.length > 0 ? 'loop' : ''}"
                        :arrows="false"
                    >

                        <div
                            :class="roomType.gallery.length > 0 ? '' : 'hide-arrows'"
                            class="custom-wrapper"
                        >
                            <SplideTrack>
                                <SplideSlide>
                                    <img :src="roomType.cover_image.full_url" alt="">
                                </SplideSlide>
                  
                                <SplideSlide
                                    v-for="room_image in roomType.gallery"
                                >
                                    <img :src="room_image.image.full_url" alt="">
                                </SplideSlide>
                            </SplideTrack>

                            <div
                                v-if="roomType.gallery"
                                class="splide__arrows"
                            >
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
                                {{ roomType.title }}
                            </a>
                        </h1>
                    </div>
                    
                    <div class="flex items-center params">
                        <div class="flex items-center">
                            <div class="flex items-center pr-4 text-xs">
                                <IconPerson/>
                                {{ roomType.room_type.number_of_persons_per_room }} {{ pluralPeopletext(roomType.room_type.number_of_persons_per_room) }}
                            </div>
                            <div class="flex items-center pr-4 text-xs">
                                <IconSquare/>
                                {{ roomType.room_square }} м2
                            </div>
                            <div class="flex items-center text-xs">
                                <IconHome/>
                                {{ roomType.room_type.number_of_beds_per_room }} {{ pluralRoomsText(roomType.room_type.number_of_beds_per_room) }}
                            </div>
                        </div>
                    </div>

                    <div class="flex room-description pr-4">
                        <div
                            @click="showRoomDetails(roomType.room_type.guid)"
                            class="flex items-center no-underline hover:underline text-black cursor-pointer">
                            Подробнее о номере
                            <IconArrowLeftInCircle/>
                        </div>

                        
                    </div>

                    <div class="card-foot flex justify-between px-4">
                        <div class="">
                            <div class="flex justify-between mb-1 h-4">
                                <div class="discount-percent text-xs">-20%</div>
                                <div class="discount-cost text-xs line-through">245 659 р.</div>
                            </div>
                            <div class="cost text-2xl h-9">{{ (roomType.price * countOfDays).toLocaleString('ru-RU') }} р.</div>
                            <div class="person-nights text-xs">{{ countOfPersons }} чел. / {{ countOfDays }} {{ pluralNightText(countOfDays) }}</div>
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

        <el-dialog
            v-model="dialogVisible"
            width="70%"
            class="room-detail"
            align-center
            destroy-on-close
        >
            <RoomCardDetails
                :roomDetails="roomDetails"
            />
        </el-dialog>

    </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';


    import RoomCardDetails from '@/components/RoomCardDetails.vue';

    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconPerson from '@/components/icons/IconPerson.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';

    import Button from '@/components/Button.vue';

    import plural  from 'plural-ru';

    const peoplePerRoomPlurals = ref('')
    const dialogVisible = ref(false)
    const roomGuid = ref('')

    interface Room {
        title: string
        room_type: {
            guid: string
            number_of_persons_per_room: number
            number_of_adults: number
            number_of_beds_per_room: number
            
        }
        cover_image: {
            full_url: string
            url: string
        }
        gallery: [
            {
                image: {
                    full_url: string
                    url: string
                }
            }
        ]
        room_square: number
        price: number

         
    }

    const props = defineProps({
        roomTypes: Object as PropType<Room[]>,
        countOfDays: {
            type: Number,
            default: 1
        },
        countOfPersons: Number
    })

    const pluralPeopletext = (count: number) => {
        return plural(count, 'человек', 'человека', 'человек');
    }

    const pluralRoomsText = (count: number) => {
        return plural(count, 'комната', 'комнаты', 'комнат');
    }

    const pluralNightText = (count: number) => {
        return plural(count, 'ночь', 'ночи', 'ночей');
    }

    const showRoomDetails = (guid: string) => {
        dialogVisible.value = true
        getRoomDeatails(guid)
    }

    const roomDetails = ref()
    async function getRoomDeatails(guid: string) {
        try {
            const res = await fetch(`https://backmb.aleancollection.ru/api/v1/room-type-info/${guid}/`);
            const finalRes = await res.json();
            roomDetails.value = finalRes.res;
        } catch (error) {
            console.log(error)
        }
    }

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