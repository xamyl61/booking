<template>
    <div>
        <div class="room-detail-head">
            <p class="text-2xl">{{ roomDetails?.title }}</p>
        </div>

        <div>
            <vue-easy-lightbox
                :visible="visibleRef"
                :imgs="imgLightBoxUrlsList()"
                :index="indexRef"
                :loop="true"
                :moveDisabled="true"
                :rotateDisabled="true"
                :zoomDisabled="true"
                @hide="onHide"
                class="m-lightbox"
            >
            <template v-slot:prev-btn="{ prev }">
                <button @click="prev" class="prev">
                    <IconSlideRight/>
                </button>
            </template>
            <template v-slot:next-btn="{ next }">
                <button @click="next" class="next">
                    <IconSlideRight/>
                </button>
            </template>
            </vue-easy-lightbox>
        </div>


        <div class="room-detail-body">
            <div class="slider">
                <Splide 
                    :has-track="false"
                    :arrows="false"
                    ref="main"
                    class="main-slider"
                    :updateOnMove="true"
                    :options="{ rewind: true, type: 'fade'}"
                >
        
                    <div
                        :class="roomDetails?.gallery.length > 0 ? '' : 'hide-arrows'"
                        class="custom-wrapper"
                    >
                        <SplideTrack>

                            <SplideSlide>
                                <img :src="roomDetails?.cover_image.full_url" alt="">
                            </SplideSlide>
                
                            <SplideSlide
                                v-for="(room_image, index) in roomDetails?.gallery"
                            >
                                <!-- <div> <b>{{ index }}</b></div> -->
                                <img :src="room_image.image.full_url" :alt=room_image.image.alt>
                            </SplideSlide>
                        </SplideTrack>
        
                        <div
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

                <div class="slider-thumblr">
                    <Splide 
                        :has-track="false"
                        :options="thumbsOptions"
                        :arrows="false"
                        ref="thumbs"
                        class="slider-thumblr-splide"
                    >
                        <div
                            :class="roomDetails?.gallery.length > 0 ? '' : 'hide-arrows'"
                            class="custom-wrapper"
                        >
                            <SplideTrack
                                :class="`image-in-thumblr-` + (roomDetails?.gallery.slice(0,5).length)"
                            >
                                <!-- скрываем первое изображение, но не удаляем для правильного расчета индексов к другому слайдеру -->
                                <SplideSlide
                                    class="hidden"
                                >
                                    <img :src="roomDetails?.cover_image.full_url" alt="" style="display: none;">
                                </SplideSlide>
                    
                                <SplideSlide
                                    v-for="(room_image, i) in roomDetails?.gallery.slice(0,5)"
                                    :key="room_image.image.full_url"
                                >
                                    <img :src="room_image.image.full_url" alt="">
                                    <div
                                        v-if="i == 4"
                                        @click="showMultiple($event, i)"
                                        class="open-lightbox-btn"
                                    >Смотреть еще</div>
                                </SplideSlide>
                            </SplideTrack>
                        </div>
                    </Splide>
                </div>
            </div>
            <div class="details">
                <div class="flex justify-between">
                    <div class="left-block">
                        <div class="header-icon">
                            <div
                                v-for="service in roomDetails?.arrival_service_header_items"
                                class="header-icon-item"
                            >
                                <img
                                    class="list-block-icons"
                                    :class="service.arrival_service.icon ? '' : 'hidden'"
                                    :src="service.arrival_service.icon?.full_url"
                                    alt=""
                                >
                                <div>{{ service.arrival_service.title }}</div>
                            </div>
                        </div>

                        <div class="justify-between  pb-8">
                            <div
                            >
                                <div
                                    class="description bottom-shadow text-lg"
                                    :class="!showMore ? 'show' : ''"
                                    v-snip="{ lines: 3, onSnipped }"
                                >
                                    {{ roomDetails?.description }}
                                </div>
                                <button
                                    v-if="showMoreBtn"
                                    class="more mt-4"
                                    @click="showDscr"
                                >
                                    <b>{{ !showMore ? 'Свернуть' : 'Подробнее' }}</b>
                                </button>
                            </div>
                    
                        </div>
                    </div>

                    <div class="right-block">
                        <div class="header-icon">
                            <div class="header-icon-item">
                                    <IconPerson v-if="roomDetails.room_type.number_of_persons_per_room == 1"/>
                                    <IconPerson2 v-if="roomDetails.room_type.number_of_persons_per_room == 2"/>
                                    <IconPersons v-if="roomDetails.room_type.number_of_persons_per_room > 2"/>
                                    {{ roomDetails?.room_type.number_of_persons_per_room }}
                                    
                                    {{ pluralPeopletext(roomDetails?.room_type.number_of_persons_per_room) }}
                            </div>
                            <div class="header-icon-item"><IconSquare/> {{ roomDetails?.room_square }} м2</div>
                            <div class="header-icon-item"><IconHome/> {{ roomDetails?.room_type.number_of_beds_per_room }} {{ pluralRoomsText(roomDetails?.room_type.number_of_beds_per_room) }}</div>
                        </div>
                        <div>
                            <div class="subtitle">Расчётные часы</div>
                            {{ roomDetails?.checkout_hours }}
                        </div>
                    </div>
                </div>

                <div class="list-block">

                    <div class="list-block-grid">
                        <div    
                            v-for="amenity in roomDetails?.amenity_categories"
                            class="list-block-grid-col"
                        >
                            <div>
                                <div>
                                    <div
                                        v-for="item in amenity.amenity_items"
                                        class="item flex pb-2 content-center"
                                    >
                                        <div>
                                            <img
                                                class="list-block-icons"
                                                :class="item.amenity.icon?.full_url ? '' : 'invisible'"
                                                :src="item.amenity.icon?.full_url"
                                                alt=""
                                            >
                                        </div>
                                        <p>{{ item.amenity.title }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div
                        v-for="amenity in roomDetails?.arrival_service_categories"
                        class="block amenity"
                    >
                        <ShowHideMore :amenity="amenity">
                            <div class="list-block-title">{{ amenity?.title }}</div>
                            <div class="list-block-grid">
                                <div
                                    v-for="amenSubCutegory in amenity.arrival_service_sub_categories"
                                    class="list-block-grid-col"
                                >
                    
                                    <div class="list-block-subtitle">{{ amenSubCutegory?.title }}</div>
                                    <div>
                                        <div
                                            class=" icon-text"
                                            v-for="arrivalServiceItem in amenSubCutegory?.arrival_service_items" 
                                        >
                                            <img
                                                class="list-block-icons"
                                                :class="arrivalServiceItem?.arrival_service.icon ? '' : 'invisible'"
                                                :src="arrivalServiceItem?.arrival_service.icon?.full_url"
                                            >
                                            {{ arrivalServiceItem?.arrival_service.title }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ShowHideMore>
                    </div>

                   
                </div>
            </div>
        </div>
        <div class="room-detail-foot flex justify-between ">
            <div class="period">
                <div class="period-title">Период проживания:</div>
                <div class="period-date">{{ parseDate(new Date(props.dateFrom)) }} &nbsp;&#8212;&nbsp; {{ parseDate(new Date(props.dateTill)) }}</div>
            </div>
            <div class="flex justify-end">
                <div class="cost-block">
                    <div class="cost">{{ props.roomPrice.toLocaleString('ru-RU') }} р.</div>
                    
                    <div class="persons-nights">{{ countOfPersons }} чел. / {{ countOfDays }} {{ pluralNightText(countOfDays) }}</div>
                </div>
                <div class="btns-block" v-if="showButton">
                    <div class="bonus text-xs text-center pb-1"><IconRuble/>  {{ props.bonus }} бонусов</div>
                    <Button @click="openBooking(props.roomDetails, props.сhildren, props.adults, props.dateFrom, props.dateTill, props.choosedHotelGuid, props.bonus, props.roomPrice)" class="btn-yellow">Выбрать</Button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';

    import { useRouter } from "vue-router";
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';

    import ShowHideMore from '@/components/ShowHideMore.vue';
    


    import plural  from 'plural-ru';
    import Button from '@/components/Button.vue';
    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconPerson from '@/components/icons/IconPerson.vue';
    import IconPerson2 from '@/components/icons/IconPerson2.vue';
    import IconPersons from '@/components/icons/IconPersons.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';

    
    const showMore = ref(true) 

    const visibleRef = ref(false)
    const indexRef = ref(0) // default 0

    const main   = ref<InstanceType<typeof Splide>>();
    const thumbs = ref<InstanceType<typeof Splide>>();

    const hasEllipsis = ref(false)

    const thumbsOptions = {
        type        : 'slide',
        rewind      : true,
        gap         : '1rem',
        pagination  : true,
        cover       : true,
        focus       : 'center',
        isNavigation: true,
        updateOnMove: true,
        arrows: false,
    };

    const parseDate = (date: Date) => {
        let year = date.getFullYear();
        let month = date.toLocaleString("default", { month: "long" });
        let day = date.toLocaleString("default", { day: "numeric" });
        let weekday = date.toLocaleString("default", { weekday: "short" });
        let formattedDate = day  + " " + month + " " + year + "г., " + weekday;

        return formattedDate
    }

    const router = useRouter()

    // const openBooking = (roomDetails: object, сhildren: number, adults: number, dateFrom: string, dateTill: string, choosedHotelGuid: string, bonus: number, roomPrice: number) => {
    //     router.push({name: 'booking', query: {
    //         сhildren: сhildren,
    //         adults: adults,
    //         dateFrom: dateFrom,
    //         dateTill: dateTill,
    //         choosedHotelGuid: choosedHotelGuid,
    //         bonus: bonus,
    //         roomPrice: roomPrice}})
    // }




    import { useBookingRoomsStore } from '@/stores/booking-store';   
    import { useBookingFormStore } from '@/stores/booking-form-store';
        
    const bookingRoomsStore = useBookingRoomsStore()
    const formStore = useBookingFormStore()
    const newCountOfDays = ref()







    const openBooking = async (roomDetails: any, сhildren: number, adults: number, dateFrom: string, dateTill: string, choosedHotelGuid: string, bonus: number, roomPrice: number) => {
        
        const count = adults + сhildren
        const guests: any[] = []
        for(let i = 0; i<count;i++) {
        guests.push({
            first_name: '',
            last_name: '',
            middle_name: '',
            birthday: '',
            email: '',
            phone: ''
        })
        }

        formStore.bookingForm.push({
            guests: guests
        })

        const bookingInfoData = {
            adults: adults,
            сhildren: сhildren,
            roomDetails: roomDetails,
            dateFrom: dateFrom,
            dateTill: dateTill,
            roomPrice: roomPrice,
            bonus: bonus,
            choosedHotel: choosedHotelGuid,
            needUpSail: true
        }
        bookingRoomsStore.setBookingRoom(bookingInfoData)

        router.push({name:"booking"})
    }







    

    const imgLightBoxUrlsList = () => {
        const imgUrlsList = props.roomDetails.gallery.map(gall => {
            return gall.image.full_url
        }) 

        return imgUrlsList
    }



    const pluralPeopletext = (count: number) => {
        return plural(count, 'человек', 'человека', 'человек');
    }

    const pluralRoomsText = (count: number) => {
        return plural(count, 'комната', 'комнаты', 'комнат');
    }

    const pluralNightText = (count: number) => {
        return plural(count, 'ночь', 'ночи', 'ночей');
    }

    interface Details {
        title: string,
        room_square: number,
        price: number,
        description: string,
        room_rate_description: string,
        room_type: {
            number_of_beds_per_room: number,
            number_of_persons_per_room: number
        },
        cover_image: {
            full_url: string
        },
        gallery: [
            {
                image: {
                    full_url: string,
                    alt: string
                }
            }
        ],
        amenity_title: string,
        amenity_categories: [
            {
                title: string,
                amenity_items: [
                    {
                        amenity: {
                            title: string,
                            icon: {
                                alt: string,
                                full_url: string
                            }
                        }
                    }
                ]
            }
        ],
        arrival_service_title: string,
        arrival_service_categories: [
            {
                title: string,
                arrival_service_sub_categories: [
                    {
                        title: string,
                        arrival_service_items: [
                            {
                                arrival_service: {
                                    title: string,
                                    icon: {
                                        full_url: string
                                    }
                                }
                            }
                        ]
                        
                    }
                ]
            }
        ],
        arrival_service_header_items: [
            {
                arrival_service: {
                    title: string,
                    icon: {
                        full_url: string
                    }
                }
            }
        ],
        checkout_hours: string
    }

    const props = defineProps({
        roomDetails: {
            type: Object as PropType<Details>,
            required: true,
        },
        roomPrice: {
            type: Number,
            required: true,
        },
        countOfDays: {
            type: Number,
            required: true,
        },
        сhildren: {
            type: Number,
            required: true,
        },
        countOfPersons: {
            type: Number,
            required: true,
        },
        startDateFormated: {
            type: String,
        },
        endDateFormated: {
            type: String,
        },
        bonus: {
            type: Number,
            default: 0
        },
        choosedHotelGuid: {
            type: String,
            default: ''
        },
        dateFrom: {
            type: String,
            required: true,
        },
        dateTill: {
            type: String,
            required: true,
        },
        adults: {
            type: Number,
            required: true,
        },
        showButton: {
            type: Boolean,
            default: true
        }
        
    })


    const onShow = () => {
      visibleRef.value = true
    }

    const showMultiple = (event: Event, i: number) => {
        event.stopPropagation()
        indexRef.value = i // index of imgList
        onShow()
    }
    const onHide = () => (visibleRef.value = false)

    onMounted(() => {
        const thumbsSplide = thumbs.value?.splide;

        if ( thumbsSplide ) {
            main.value?.sync( thumbsSplide );
        }
    })

    const showMoreBtn = ref(false)
    const onSnipped = (newState: any) => {
        hasEllipsis.value = newState.hasEllipsis
        if (hasEllipsis.value) {
            showMoreBtn.value = true
        }
    }


    const showDscr = () => {
        showMore.value = !showMore.value
    }

    

</script>
  
<style scoped>
.left-block {
    width: 70%;
}
.right-block {
    width: 30%;
}
.description {
    font-size: 1.2rem;
}
.description {
    padding-right: 2rem;
    font-size: 1.2rem;
}

.details {
    color: #202020;
}
.description.show {
    display: block!important;
    overflow: auto!important;
}
.bottom-shadow {
    position: relative;
}
.bottom-shadow::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.4rem;
    background: rgb(255,255,255);
    opacity: 0.4;
}
.bottom-shadow.show::after {
    display: none;
}

.amenity {
    padding-bottom: 2rem;
}
.type-of-service {
    flex-basis: 16rem;
    flex-grow: 0;
    flex-shrink: 0;
}
.list-block-grid {
    position: relative;
}
.hide-list .list-block-grid:after {
    content: "";
    height: 2.4rem;
    left: 0;
    right: 0;
    position: absolute;
    background: #fff;
    opacity: 0.4;
    bottom: 0;
}

.show-all .list-block-grid:after {
    display: none;
}




/* list-block */
.list-block-grid {
    display: flex;
    /* gap: 1rem; */
}
.list-block-grid-col {
    display: flex;
    flex-flow: column;
    width: 25%;
    padding-right: 3rem;
}
.list-block-grid-col .icon-text {
    align-items: center;
}
.list-block-grid-col .icon-text img {
    margin-right: .5rem;
}
.icon-text {
    flex: 1 2.4rem;
    flex-grow: 1;
    display: flex;
    min-height: 3rem;
    align-items: center;
}
.list-block-title {
    font-family: 'Optima Cyr';
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
    color: #000;
}
.more {
    color: #121326;
    font-size: 1rem;
}
.list-block-subtitle {
    color: #939393;
    font-weight: 700;
    font-size: 1rem;
    padding-bottom: .8rem;
}

/* .header-icon */
.header-icon {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0 1.5rem;
}
.header-icon .icon-text {
    display: inline-block;
    margin-right: 1rem;
    display: flex;
    white-space: pre;
}
.header-icon-item {
    display: flex;
    align-items: center;
    padding-right: 1.4rem;
}
.header-icon-item img,
.header-icon-item i {
    margin-right: 1rem;
}






.vel-img-wrapper {
    transition: none!important;
}

/* sliders */
.main-slider {
    width: 70%;
}

.open-lightbox-btn {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(18, 19, 38, .5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
}

.period {

}
.period-title {
    font-size: 1.38rem;
    padding-bottom: .5rem;
    font-family: 'Optima Cyr';
}


</style>