<template>
    <div>
        <div class="room-detail-head">
            <p class="text-2xl">{{ roomDetails?.title }}</p>
        </div>

        <div>
            <vue-easy-lightbox
                :visible="visibleRef"
                :imgs="imgsRef"
                :index="indexRef"
                :loop="true"
                :moveDisabled="true"
                :rotateDisabled="true"
                :zoomDisabled="true"
                @hide="onHide"
            ></vue-easy-lightbox>
        </div>


        <div class="room-detail-body">
            <div class="slider">
                <Splide 
                    :has-track="false"
                    :options="{ type: 'loop'}"
                    :arrows="false"
                    pagination: true
                    ref="main"
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
                                v-for="room_image in roomDetails?.gallery"
                            >
                                <img :src="room_image.image.full_url" alt="">
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
                <div class="parent">
                    <div
                        v-for="(src, index) in imgsRef"
                        :key="index"
                        :class="`div${index + 1}`"
                        @click="() => showMultiple(index)"
                    >
                        <img :src="src"/>
                    </div>
                </div>
            </div>
            <div class="details">

                <div class="flex justify-between">
                    <div>
                        <div class="flex">
                            <div
                                v-for="service in roomDetails?.arrival_service_header_items"
                                class="flex"
                            >
                                <img
                                    class="list-block-icons"
                                    :class="service.arrival_service.icon ? '' : 'hidden'"
                                    :src="service.arrival_service.icon"
                                    alt=""
                                >
                                <div class="">{{ service.arrival_service.title }}</div>
                            </div>
                        </div>

                        <div class="flex justify-between pb-10">
                            <div class="description text-lg">
                                {{ roomDetails?.description }}
                            </div>
                        </div>
                    </div>


                    <div>
                        <div class="flex base-detail">
                            <div class="flex">
                                <div class="">{{ roomDetails?.room_type.number_of_persons_per_room }} {{ pluralPeopletext(roomDetails?.room_type.number_of_persons_per_room) }}</div>
                            </div>
                            <div class="flex">
                                <div class="">{{ roomDetails?.room_square }} м2</div>
                            </div>
                            <div class="flex">
                                <div class="">{{ roomDetails?.room_type.number_of_beds_per_room }}</div>
                                <div class="">{{ pluralRoomsText(roomDetails?.room_type.number_of_beds_per_room) }}</div>
                            </div>
         
                        </div>
                        <div>
                            <div class="subtitle">Расчётные часы</div>
                            {{ roomDetails?.checkout_hours }}
                        </div>
                    </div>
                </div>





                <div class="list-block">

                    <h6 class="list-block-title pt-10 pb-6">{{ roomDetails?.amenity_title }}</h6>
                    <div class="list-block-grid">
                        <div    
                            v-for="amenity in roomDetails?.amenity_categories"
                            class="list-block-grid-col"
                        >
                            <div>
                                <div class="subtitle">{{ amenity?.title }}:</div>
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
                    >
                        {{ amenity?.title }}
                        <div
                        v-for="amenSubCutegory in amenity.arrival_service_sub_categories"
                            
                        >
                            {{ amenSubCutegory?.title }}
                            <div
                               v-for="arrivalServiceItem in amenSubCutegory?.arrival_service_items" 
                            >
                                {{ arrivalServiceItem?.arrival_service.title }}
                                {{ arrivalServiceItem?.arrival_service.icon }}
                            </div>
                        </div>
                    </div>


                    <!-- <div class="list-block-grid">
                        <div    
                            v-for="amenity in roomDetails?.arrival_service_categories"
                            class="list-block-grid-col"
                        >
                            <div>
                                <div class="subtitle">{{ amenity?.title }}:</div>
                                <div>
                                    <div
                                        v-for="item in amenity.arrival_service_items"
                                        class="item flex pb-2 content-center"
                                    >
                                        <div>
                                            <img
                                                class="list-block-icons"
                                                :class="item.arrival_service.icon?.full_url ? '' : 'invisible'"
                                                :src="item.arrival_service.icon?.full_url"
                                                alt=""
                                            >
                                        </div>
                                        <p>{{ item.arrival_service.title }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="room-detail-foot flex justify-end ">
            <div class="cost-block">
                <div class="cost">{{ props.roomPrice }} р.</div>
                
                <div class="persons-nights">{{ countOfPersons }} чел. / {{ countOfDays }} {{ pluralNightText(countOfDays) }}</div>
            </div>
            <div class="btns-block">
                <div class="bonus text-xs text-center pb-1">3 000 бонусов</div>
                <button class="btn">Выбрать</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted, computed } from 'vue';
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';


    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import plural  from 'plural-ru';



    const visibleRef = ref(false)
    const indexRef = ref(0) // default 0
    const imgsRef = ref<string[]>()



    const main   = ref<InstanceType<typeof Splide>>();

    imgsRef.value = [
        'https://via.placeholder.com/600/92c952',
        'https://via.placeholder.com/600/771796',
        'https://via.placeholder.com/600/24f355',
        'https://via.placeholder.com/600/d32776',
        'https://via.placeholder.com/600/92c952'
    ]

    const imgLightBoxUrlsList = () => {
        const imgUrlsList = props.roomDetails.gallery.map(gall => {
            return gall.image.full_url
        }) 
        console.log("!!! imgUrlsList: ", imgUrlsList)
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
                    full_url: string
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
                                    icon: string
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
                    icon: string
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
        countOfPersons: {
            type: Number,
            required: true,
        },
        
    })





    // const getImageUrlsList = () => {
    //     imgsRef.value = props.roomDetails.gallery.map(gallery => { return gallery.image.full_url }) 
    // }
    


    const onShow = () => {
      visibleRef.value = true
    }

    const showMultiple = (index: number) => {
      indexRef.value = index // index of imgList
      onShow()
    }
    const onHide = () => (visibleRef.value = false)

    onMounted(() => {
        console.log("props: ", props)
    })



</script>
  
<style scoped>
.description {
    margin-right: 5%;
    border-bottom: 1px solid #EAEAEA;
    padding-bottom: 2rem;
}
.type-of-service {
    flex-basis: 16rem;
    flex-grow: 0;
    flex-shrink: 0;
}



.list-block-title {
    font-family: 'Optima Cyr';
    font-size: 1.6rem;
}
.subtitle {
    color: #939393;
    font-weight: 700;
    font-size: .8rem;
    padding-bottom: .8rem;
}


/* list-block */
.list-block {
    
}
.list-block-grid {
    display: flex;
    gap: 1rem;
}
.list-block-grid-col {
    display: flex;
    flex-flow: column;
    width: 25%;
    padding-right: 3rem;
}
.item {
    flex: 1 50px;
    flex-grow: 1;
    display: flex;
}
.item p {
    min-height: 3rem;
}

.list-block-icons {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
    position: relative;
    top: -3px;
}


.vel-img-wrapper {
    transition: none!important;
}

.splide {
    width: 75%;
}

.parent img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
}

.parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 30%;
    gap: 0.5vw;
}

.div1 { 
    grid-column: 1 / -1;
    height: 12vw;
}
.div2,
.div3,
.div4,
.div5 {
    height: 6vw;
}

.slider > .splide .splide__slide img {
    width: 100%;
    height: 25vw;
}




</style>