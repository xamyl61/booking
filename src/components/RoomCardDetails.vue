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
                            v-if="roomDetails?.gallery"
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
                                v-if="roomDetails?.gallery"
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
                    <h6 class="list-block-title pt-10 pb-6">Удобства в номере</h6>
                    <div class="flex">
                        <div class="w-1/4">
                            <div class="subtitle">Интернет/телефония:</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Wi-Fi</div>
                        </div>
                        <div class="w-1/4">
                            <div class="subtitle">Электроника:</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Фен</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Мини-холодильник</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Утюг</div>
                        </div>
                        <div class="w-1/4">
                            <div class="subtitle">Ванная комната:</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Душ</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Косметические средства</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Тапочки</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Халаты</div>
                        </div>
                        <div class="w-1/4">
                            <div class="subtitle">Внешняя территория и вид из окон:</div>
                            <div class="flex pb-2"><IconFen class="mr-3"/> Вид на город</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="room-detail-foot flex justify-end ">
            <div class="cost-block">
                <div class="cost">192420 р.</div>
                <div class="persons-nights">3 чел. / 2 ночи</div>
            </div>
            <div class="btns-block">
                <div class="bonus text-xs text-center pb-1">3 000 бонусов</div>
                <button class="btn">Выбрать</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack, Options } from '@splidejs/vue-splide';
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
        ]
    }

    const props = defineProps({
        // roomGuid: {
        //     type: String,
        //     default: 'No content found!'
        // },
        roomDetails: {
            type: Object as PropType<Details>,
            required: true,
        }
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
    font-family: 'Geometria';
    padding-bottom: .8rem;
}



</style>