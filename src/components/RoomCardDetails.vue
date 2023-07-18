<template>
    <div>
        <div class="room-detail-head">
            <p class="text-2xl">{{ roomDetails?.title }}</p>
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
                <div class="slider-thumblr">
                    <Splide 
                        :has-track="false"
                        :options="thumbsOptions"
                        :arrows="true"
                        ref="thumbs"
                        class="slider-thumblr-splide"
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
             
                        </div>
                    </Splide>
                </div>
            </div>
            <div class="details">
                <div class="flex pb-10">
                    <div class="description text-lg">
                        <!-- {{ roomDetails?.description }} -->
                        Полутороспальная кровать, кресло-кровать, стол, мини-холодильник, жк-телевизор, сейф, сплит-система телефон, чайная станция, охладитель под шампанское. На балконе: стулья и стол из искусственного ротанга. В комплектации номера гладильная доска и утюг, сушилка для белья.
                    </div>
                    <div class="type-of-service ">
                        Обслуживание производится по программе «Ультра всё включено»
                    </div>
                </div>

                <div class="flex base-detail">
                    <div class="text-block">
                        <div class="styled-text">{{ roomDetails?.room_square }} м2</div>
                        <div class="text">Площадь</div>
                    </div>
                    <div class="text-block">
                        <div class="styled-text">{{ roomDetails?.room_type.number_of_beds_per_room }}</div>
                        <div class="text">Комнаты</div>
                    </div>
                    <div class="text-block">
                        <div class="styled-text">{{ roomDetails?.room_type.number_of_persons_per_room }} человека</div>
                        <div class="text">Вместимость номера</div>
                    </div>
                </div>

                <div class="list-block">

                    <h6 class="list-block-title pt-10 pb-6">{{ roomDetails?.amenity_title }}</h6>
                    <div class="list-block-grid">
                        <div    
                            v-for="amenity in roomDetails?.amenity_categories"
                            class="list-block-grid-col"
                        >
                            <div class="">
                                <div class="subtitle">{{ amenity?.title }}:</div>
                                <div
                                    style=""
                                >
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

                    <h6 class="list-block-title pt-10 pb-6">{{ roomDetails?.arrival_service_title }}</h6>
                    <div class="list-block-grid">
                        <div    
                            v-for="amenity in roomDetails?.arrival_service_categories"
                            class="list-block-grid-col"
                        >
                            <div class="">
                                <div class="subtitle">{{ amenity?.title }}:</div>
                                <div
                                    style=""
                                >
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
                    </div>
                </div>
            </div>
        </div>
        <div class="room-detail-foot flex justify-end ">
            <div class="cost-block">
                <div class="cost">{{ roomPrice }} р.</div>
                
                <div class="persons-nights">{{ countOfPersons }} чел. / {{ countOfDays }} ночи</div>
            </div>
            <div class="btns-block">
                <div class="bonus text-xs text-center pb-1">3 000 бонусов</div>
                <button class="btn">Выбрать</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';


    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import IconFen from '@/components/icons/IconFen.vue';

    import plural  from 'plural-ru';

    const main   = ref<InstanceType<typeof Splide>>();
    const thumbs = ref<InstanceType<typeof Splide>>();

    const thumbsOptions = {
      type        : 'slide',
      rewind      : true,
      gap         : '1rem',
      pagination  : true,
    //   fixedWidth  : 160,
    //   fixedHeight : 70,
      cover       : true,
      focus       : 'center',
      isNavigation: true,
      updateOnMove: true,
      arrows: false,
    };


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
                arrival_service_items: [
                    {
                        arrival_service: {
                            title: string,
                            icon: {
                                alt: string,
                                full_url: string
                            }
                        }
                    }
                ]
            }
        ]
    }

    const props = defineProps({
        roomDetails: {
            type: Object as PropType<Details>,
            required: true,
        },
        roomPrice: {
            type: String,
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
    
    onMounted(() => {
        const thumbsSplide = thumbs.value?.splide;

        if ( thumbsSplide ) {
            main.value?.sync( thumbsSplide );
        }
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

.base-detail {

}
.text-block {
    width: 20%;
}
.styled-text {
    font-family: 'Optima Cyr';
    font-size: 1.6rem;
    padding-bottom: .5rem;
}
.text-block .text {

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
    /* border: 1px solid green; */
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
}





</style>