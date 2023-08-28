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
            <div class="flex gap-4">
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
                                            <div class="plus-cost">всего + 20 000 р.</div>
                                            <div class="nights">за 6 ночей</div>
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
                    <div class="enter-guest-details mt-10">
                        <h3 class="title-line">Введите данные гостей</h3>
                        <div class="my-4"><b class="text-sm">Гость 1. Взрослый</b></div>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="">
                                <Input v-model="firstName" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Фамилия" />
                            </div>
                            <div class="">
                                <Input v-model="secondName" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Имя" />
                            </div>
                            <div class="">
                                <Input v-model="patronymic" v-maska data-maska="A" data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple" placeholder="Отчество" />
                            </div>
                            <div class="">
                                <VueDatePicker 
                                    v-model="date"
                                    ignore-time-validation
                                    placeholder="Дата рождения" />
                            </div>
                            <div class="">
                                <Input v-model="email" v-maska data-maska="" placeholder="_____@__" />
                            </div>
                            <div class="">
                                <Input v-model="phone" v-maska data-maska="+7 ### ###-##-##" placeholder="+7 ___ ___ __ __" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-10">
                        <Button class="btn ml-auto mt-10 btn-with-border">Добавить номер</Button>
                    </div>
                    <hr>


                    <div class="select-services">
                        <div class="title-line">Выберите услуги</div>
                        <div class="demo-collapse">
                        <el-collapse >
                            <el-collapse-item name="1">
                                <template #title>
                                    <div>
                                        <div class="title flex items-center"><IconHome/> <b class="pl-4 text-lg">Экскурсии</b></div>
                                        <div class="dscr ">Выберите экскурсии себе по душе</div>
                                    </div>
                                </template>
                                <div class="services">
                                    <div class="service">
                                        <div class="service-offer flex items-center">
                                            <div class="name">Единство души и тела</div>
                                            <div class="days">
                                                <select name="" id="">
                                                <option value="1">1 день</option>
                                                <option value="2">2 дня</option>
                                                <option value="3">1 дня</option>
                                            </select>
                                            </div>
                                            <div class="cost">20 000 р.</div>
                                            <button class="btn">Выбрать</button>
                                        </div>
                                        <div class="adding-to-order">
                                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                                        </div>
                                    </div>

                                    <div class="service">
                                        <div class="service-offer flex items-center">
                                            <div class="name">Единство души и тела</div>
                                            <div class="days">
                                                <select name="" id="">
                                                    <option value="1">1 день</option>
                                                    <option value="2">2 дня</option>
                                                    <option value="3">1 дня</option>
                                                </select>
                                            </div>
                                            <div class="cost">20 000 р.</div>
                                            <button class="btn">Выбрать</button>
                                        </div>
                                        <div class="adding-to-order">
                                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                                            <div class="guests">
                                                <div class="guest flex items-center py-4">
                                                    <div class="mr-4">
                                                        <input class="mr-4" type="checkbox" id="g1">
                                                        <label for="g1">Гость 1. Иванов Иван Иванович.</label>
                                                    </div>
                                                    <select name="" id="">
                                                        <option value="1">1 день</option>
                                                        <option value="2">2 дня</option>
                                                        <option value="3">3 дня</option>
                                                    </select>
                                                </div>
                                                <div class="guest flex items-center">
                                                    <div class="mr-4">
                                                        <input class="mr-4" type="checkbox" id="g2">
                                                        <label for="g2">Гость 1. Иванов Иван Иванович.</label>
                                                    </div>
                                                    <select name="" id="">
                                                        <option value="1">1 день</option>
                                                        <option value="2">2 дня</option>
                                                        <option value="3">3 дня</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="finaly flex items-center">
                                                <div class="cost mr-10 ml-auto">20 000 р.</div>
                                                <button class="btn">Добавить в заказ</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item name="2">
                                <template #title>
                                    <div>
                                        <div class="title flex items-center"><IconHome/> <b class="pl-4 text-lg">Для детей</b></div>
                                        <div class="dscr ">Выберите экскурсии себе по душе</div>
                                    </div>
                                </template>
                                <div class="services">
                                    <div class="service">
                                        <div class="service-offer flex items-center">
                                            <div class="name">Единство души и тела</div>
                                            <div class="days">
                                                <select name="" id="">
                                                <option value="1">1 день</option>
                                                <option value="2">2 дня</option>
                                                <option value="3">1 дня</option>
                                            </select>
                                            </div>
                                            <div class="cost">20 000 р.</div>
                                            <button class="btn">Выбрать</button>
                                        </div>
                                        <div class="adding-to-order">
                                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                                        </div>
                                    </div>

                                    <div class="service">
                                        <div class="service-offer flex items-center">
                                            <div class="name">Единство души и тела</div>
                                            <div class="days">
                                                <select name="" id="">
                                                    <option value="1">1 день</option>
                                                    <option value="2">2 дня</option>
                                                    <option value="3">1 дня</option>
                                                </select>
                                            </div>
                                            <div class="cost">20 000 р.</div>
                                            <button class="btn">Выбрать</button>
                                        </div>
                                        <div class="adding-to-order">
                                            <div>Укажите гостей, которые будут пользоваться услугой. Услуги персонифицированы.</div>
                                            <div class="guests">
                                                <div class="guest flex items-center">
                                                    <div class="mr-4">
                                                        <input class="mr-4" type="checkbox" id="g1">
                                                        <label for="g1">Гость 1. Иванов Иван Иванович.</label>
                                                    </div>
                                                    <select name="" id="">
                                                        <option value="1">1 день</option>
                                                        <option value="2">2 дня</option>
                                                        <option value="3">3 дня</option>
                                                    </select>
                                                </div>
                                                <div class="guest flex items-center">
                                                    <div class="mr-4">
                                                        <input class="mr-4" type="checkbox" id="g2">
                                                        <label for="g2">Гость 1. Иванов Иван Иванович.</label>
                                                    </div>
                                                    <select name="" id="">
                                                        <option value="1">1 день</option>
                                                        <option value="2">2 дня</option>
                                                        <option value="3">3 дня</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="finaly flex items-center">
                                                <div class="cost mr-10 ml-auto">20 000 р.</div>
                                                <button class="btn">Добавить в заказ</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                    </div>

                </div>
                <div class="booking-sidebar">
                    <div class="booking-sidebar-inner">
                        <div class="headline">Ваше бронирование</div>
                        <div class="demo-collapse">
                            <el-collapse :class="'m-collapse'" v-model="activeNames">
                                <el-collapse-item name="11">
                                    <template #title>
                                        <div class="">
                                            <div class="room-title">Room 1</div>
                                            <IconTrash/>
                                        </div>
                                    </template>
                                    <div>
                                        <div><b>17 ночей</b></div>
                                        <div>1 марта - 18 марта</div>
                                        <div class="py-2"><b>Номер</b></div>
                                        <div>Standart plus 2-местный</div>
                                        <div class="py-2"><b>Гости</b></div>
                                        <div>1 взрослый на основном месте</div>
                                        <div class="py-2"><b>Выбранные услуги</b></div>
                                        <div class="room-service-list">
                                            <div class="room-service-list-item flex items-center py-1">
                                                <div class="room-service-list-icon "><IconCloseCircle/></div>
                                                <div>Единство тела и души </div>
                                                <div class="multiply">x2</div>
                                            </div>
                                            <div class="room-service-list-item flex items-center py-1">
                                                <div class="room-service-list-icon "><IconCloseCircle/></div>
                                                <div>Заряд бодрости </div>
                                                <div class="multiply">x1</div>
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-item>
                                <el-collapse-item name="22">
                                    <template #title>
                                        <div class="">
                                            <div class="room-title">Room 2</div>
                                            <IconTrash/>
                                        </div>
                                    </template>
                                    <div>
                                        <div><b>17 ночей</b></div>
                                        <div>1 марта - 18 марта</div>
                                        <div class="py-2"><b>Номер</b></div>
                                        <div>Standart plus 2-местный</div>
                                        <div class="py-2"><b>Гости</b></div>
                                        <div>1 взрослый на основном месте</div>
                                        <div class="py-2"><b>Выбранные услуги</b></div>
                                        <div class="room-service-list">
                                            <div class="room-service-list-item flex items-center py-1">
                                                <div class="room-service-list-icon "><IconCloseCircle/></div>
                                                <div>Единство тела и души </div>
                                                <div class="multiply">x2</div>
                                            </div>
                                            <div class="room-service-list-item flex items-center py-1">
                                                <div class="room-service-list-icon "><IconCloseCircle/></div>
                                                <div>Заряд бодрости </div>
                                                <div class="multiply">x1</div>
                                            </div>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                        <div class="cost">
                            <div class="line">Стоимость</div>
                            <div class="price">
                                <div class="cost">192 420 р.</div>
                                <div class="bonus"><IconRuble/> 3000 бонусов</div>
                            </div>
                        </div>
                        <div class="footline">Забронировать</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, reactive } from 'vue';
    import { vMaska } from "maska"
    import VueDatePicker from '@vuepic/vue-datepicker';
    import { InfoFilled } from '@element-plus/icons-vue'

    import Button from '@/components/Button.vue';
    import IconHeart from '@/components/icons/IconHeart.vue';
    import IconRuble from '@/components/icons/IconRuble.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
    import IconSquare from '@/components/icons/IconSquare.vue';
    import IconHome from '@/components/icons/IconHome.vue';
    import IconPeopleGroup from '@/components/icons/IconPeopleGroup.vue';
    import IconTrash from '@/components/icons/IconTrash.vue';
    import IconCloseCircle from '@/components/icons/IconCloseCircle.vue';

    import Input from '@/components/Input.vue'

    
    const listCities = ref();

    const activeNames = ref(['11', '22'])
    // const handleChange = (val: string[]) => {
    // console.log(val)
    // }


    const firstName = ref('')
    const secondName = ref('')
    const patronymic = ref('')

    
    
    const phone = ref('')
    const email = ref('')
    const date = ref('')
    

    const maskedValue = ref('')

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
        background: rgba(238, 234, 234, 1);
        display: flex;
        align-items: center;
        height: 3rem;
        padding: 0 2rem;
        font-family: 'Optima Cyr';
        
    }
    .booking-rooms-item-header .title {
        font-size: 1.2rem;
        top: 0.2rem;
        position: relative;
    }
    .booking-rooms-item-header .remove {
        text-decoration: underline;
        font-size: .9rem;
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
    .more-comfort-block .plus-cost {
        padding-top: .5rem;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }
    .more-comfort-block .nights {
        padding-top: .5rem;
        font-size: .8rem;
        color: #939393;
    }


    .service {

    }
    .service-offer {
        padding: 2rem 0;
    }
    .service-offer .name {
        width: 25%;
        font-size: 1.2rem;
        font-family: 'Optima Cyr';
        text-decoration: underline;
    }
    .service-offer .days {
        width: 20%;
    }
    .service-offer .cost {
        width: 20%;
        font-size: 1.2rem;
        font-family: 'Optima Cyr';
    }
    .service-offer .btn {
        width: 12rem;
        margin-left: auto;
    }
    .service select {
        width: 6.5rem;
        height: 2rem;
        line-height: 2rem;
        padding: 0 1.5rem 0 1rem;
        border: 1px solid var(--color-primary);
        border-radius: 1rem;
    }

    .adding-to-order {
        width: 80%;
        margin-left: auto;
        font-size: 1.1rem;
    }
    .adding-to-order .btn {
        width: 12rem;
    }
    .adding-to-order .cost {
        font-size: 1.2rem;
        font-family: 'Optima Cyr';
    }

    /* .booking-sidebar */
    .booking-sidebar {
        flex: 0 0 20em;
    }
    .booking-sidebar-inner {
        border: 1px solid #EEEAEA;
    }
    .booking-sidebar .headline {
        height: 4.2rem;
        display: flex;
        align-items: center;
        background: var(--color-primary);
        color: #fff;
        font-size: 1.3rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
    }
    .booking-sidebar .footline {
        height: 4.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-primary);
        color: #fff;
        font-size: 1.3rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
    }
    .booking-sidebar .price {
        padding: 1.4rem;
    }
    .booking-sidebar .cost {
        font-size: 1.4rem;
        font-family: 'Optima Cyr';
    }
    .booking-sidebar .bonus {
        display: flex;
        font-size: .8rem;
    }
    .booking-sidebar .bonus i {
        margin-right: .5rem;
    }
    .booking-sidebar .line {
        height: 3.2rem;
        display: flex;
        align-items: center;
        background: #EEEAEA;
        font-size: 1.1rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
        color: #000;
    }
    .room-title {
       font-size: 1.1rem;
       font-family: 'Optima Cyr';
    }
    .room-service-list-icon {
        width: 3rem;
    }
    .room-service-list-icon i {
        cursor: pointer;
    }
    .room-service-list .multiply {
        margin-left: auto;
        color: var(--color-primary);
        font-weight: 700;
    }
    
  </style>