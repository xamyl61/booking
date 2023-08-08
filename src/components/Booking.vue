<template>
    <div>
        <div class="header-line">
            <div class="container mx-auto flex justify-between ">
                <div class="left">Выбрать номер</div>
                <div class="center">Данные о гостях</div>
                <div class="left">Завершить бронирование</div>
            </div>
        </div>
        <div class="booking-block container mx-auto">
            <div class="booking-main">
                <div class="booking-rooms">
                    <div class="booking-rooms-item">
                        <div class="booking-rooms-item-header flex justify-between items-center">
                            <div class="title">Номер 1</div>
                            <div class="remove flex items-center">Удалить номер <IconTrash/></div>
                        </div>
                        <div class="booking-rooms-item-content flex">
                            <div class="booking-rooms-item-image">
                                <div class="hearts flex">
                                    <IconHeart/>
                                    <IconHeart/>
                                    <IconHeart/>
                                    <IconHeart/>
                                </div>
                                <img src="@/assets/room1.jpg" alt="">
                            </div>
                            <div class="booking-rooms-item-dscr flex grow">
                                <div class="flex justify-between items-center grow">
                                    <div>
                                        <div class="title">Standart (2-местный 1-комнатный)</div>
                                        <div class="date">12 июля, ср - 13 июля, чт</div>
                                        <div class="time"><span>с 12:00</span> <span class="ml-16">до 15:00</span></div>
                                        <div
                                            class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                            Подробнее о номере
                                            <IconArrowLeftInCircle/>
                                        </div>
                                    </div>

                                    <div class="cost-wr text-center">
                                        <div class="cost cost text-3xl h-9">192 420 р.</div>
                                        <div class="bonus flex justify-center align-center h-5">
                                            <IconRuble/>
                                            <div class="text-xs pl-1 bonus-counts">2138 бонусов</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="booking-rooms-item">
                        <div class="booking-rooms-item-header flex justify-between items-center">
                            <div class="title">Номер 1</div>
                            <div class="remove flex items-center">Удалить номер <IconTrash/></div>
                        </div>
                        <div class="booking-rooms-item-content flex">
                            <div class="booking-rooms-item-image">
                                <div class="hearts flex">
                                    <IconHeart/>
                                    <IconHeart/>
                                    <IconHeart/>
                                    <IconHeart/>
                                </div>
                                <img src="@/assets/room1.jpg" alt="">
                            </div>
                            <div class="booking-rooms-item-dscr flex grow">
                                <div class="flex justify-between items-center grow">
                                    <div>
                                        <div class="title">Standart (2-местный 1-комнатный)</div>
                                        <div class="date">12 июля, ср - 13 июля, чт</div>
                                        <div class="time"><span>с 12:00</span> <span class="ml-16">до 15:00</span></div>
                                        <div
                                            class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                            Подробнее о номере
                                            <IconArrowLeftInCircle/>
                                        </div>
                                    </div>

                                    <div class="cost-wr text-center">
                                        <div class="cost cost text-3xl h-9">192 420 р.</div>
                                        <div class="bonus flex justify-center align-center h-5">
                                            <IconRuble/>
                                            <div class="text-xs pl-1 bonus-counts">2138 бонусов</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button class="btn ml-auto mb-10 btn-with-border">Добавить номер</Button>
                </div>
                <hr>
                <div class="more-comfort-block ">
                    <div class="title-line">Повысьте комфорт!</div>
                    <div class="booking-rooms-item">
                        <div class="booking-rooms-item-content flex">
                            <div class="booking-rooms-item-image">
                                <div class="hearts flex">
                                    <IconHeart/>
                                    <IconHeart/>
                                    <IconHeart/>
                                    <IconHeart/>
                                </div>
                                <img src="@/assets/room1.jpg" alt="">
                            </div>
                            <div class="booking-rooms-item-dscr flex grow">
                                <div class="flex justify-between items-center grow">
                                    <div>
                                        <div class="title">Superior 2-местный</div>
                                        <div class="params flex">
                                            <div class="flex items-center"><IconPeopleGroup/> 3 человека</div>
                                            <div class="flex items-center"><IconHome/> 21 м2</div>
                                            <div class="flex items-center"><IconSquare/> 2 комнаты</div>
                                        </div>
                                        <div
                                            class="flex items-center no-underline hover:underline text-black cursor-pointer text-with-circle-icon">
                                            Подробнее о номере
                                            <IconArrowLeftInCircle/>
                                        </div>
                                    </div>
    
                                    <div class="cost-wr text-center">
                                        <div class="bonus flex justify-center align-center h-5">
                                            <IconRuble/>
                                            <div class="text-xs pl-1 bonus-counts">2138 бонусов</div>
                                        </div>
                                        <Button class="btn">Да, поменять номер</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="booking-sidebar">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import Button from '@/components/Button.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import IconPeopleGroup from '@/components/icons/IconPeopleGroup.vue';

    

    
    const listCities = ref();

    onMounted(() => {

    })

  </script>
    
  <style scoped>
    .header-line {
        background-color: var(--color-primary);
        color: #fff;
        padding: 1rem 0;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }
    .title-line {
        font-size: 1.4rem;
    }
    .booking-block {
        padding-top: 3rem;
    }
    .booking-block hr {
        border-color: rgba(238, 234, 234, 1);
    }
    .booking-rooms {
        padding-bottom: 1rem;
    }
    .booking-rooms-item {
        margin-bottom: 1.5rem;
    }
    .booking-rooms-item-content {
        border: 1px solid rgba(238, 234, 234, 1);
    }
    .booking-rooms-item-image {
        position: relative;
    }
    .hearts {
        position: absolute;
        background: rgba(255, 255, 255, .6);
        padding: 1rem 0.2rem;
    }
    .hearts .icon {
        margin: 0 0.4rem
    }
    .booking-rooms-item-header {
        padding-bottom: 1rem;
        
    }
    .booking-rooms-item-header .title {
        font-size: 1.2rem;
    }
    .booking-rooms-item-header .remove {
        text-decoration: underline;
        font-size: .8rem;
        cursor: pointer;
        color: rgba(147, 147, 147, 1);
    }
    .booking-rooms-item-header .remove:hover {
        text-decoration: none;
    }
        
    .booking-rooms-item-header .remove .icon {
       margin-left: 1rem;
    }
    .booking-rooms-item-dscr {
        padding: 0 1.6rem 0 2rem;
    }
    .booking-rooms-item-dscr .title {
        font-size: 1.3rem;
        padding-bottom: 1rem;
    }
    .booking-rooms-item-dscr .date {
        font-size: 1rem;
        font-weight: 700;
    }
    .booking-rooms-item-dscr .params {
        font-size: 12px;
        padding-bottom: 1rem;
    }
    .booking-rooms-item-dscr .params > div {
        margin-right: 1rem;
    }
    .booking-rooms-item-dscr .params .icon {
        margin-right: 0.5rem;
    }
    .booking-rooms-item-dscr .time {
        font-size: 0.8rem;
        padding-bottom: .6rem;
    }
    .cost-wr {
        margin-top: 4.5rem;
    }
    .cost {
        font-family: 'Optima Cyr';
    }
    .bonus {
        color: rgba(147, 147, 147, 1);
    }

    .more-comfort-block .booking-rooms-item-dscr .title {
        font-size: 1.5rem;
    }
    .more-comfort-block .title-line {
        padding: 1.4rem 0 1rem;
    }
    .more-comfort-block .booking-rooms-item {
        margin-bottom: 3rem;
    }
    .more-comfort-block .booking-rooms-item-content {
        border-color: var(--color-primary);
    }
  </style>