<template>
    <div>
       
        <h1>Выберите период проживания и количество гостей</h1>
        <div class="filter container mx-auto md:flex md:flex-wrap lg:gap-2 p-3 md:p-8 lg:px-20 lg:py-8">
            <IconSeashell/>
            <div class="md:w-1/2 lg:basis-72 p-2 lg:p-0">
                <div class=" ">
                    <div class="filter-title">Отель</div>
                    <div class="filter-controls">
                        <el-tree-select
                            v-model="choosedHotel"
                            :data="listCities"
                            placeholder="Выберите отель"
                            @change="changeMaxAdult"
                            class="dropdown-custom-styles"
                        >
                        </el-tree-select>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2 lg:w-2/6 p-2 lg:p-0">
                <div class="">
                    <div class="filter-title">Дата заезда</div>
                    <div class="filter-controls">
                        <VueDatePicker
                            range
                            multi-calendars
                            v-model="date"
                            :enable-time-picker="false"
                            auto-apply
                            locale="ru"
                            position="left"
                            :six-weeks="true"
                            :offset="1"
                            @update:model-value="handleDate"
                        >
                            <template #trigger>
                                <div class="daterange">
                                    <div class="daterange-item start-date">
                                        {{ rangeStartDate }}
                                        <IconCalendar/>
                                    </div>
                                    <div class="daterange-item">
                                        {{ rangeEndDate }}
                                    </div>
                                </div>
                            </template>

                            <template 
                                #month-year="{
                                    month,
                                    year,
                                    handleMonthYearChange
                            }">
                                <div class="custom-month-year-component">
                                    {{ getMonthName(month) }} {{ year }}
                                </div>
                                <div class="icons">
                                <span 
                                    class="datepicker-arrow arrow-left" 
                                    @click="handleMonthYearChange(false)">
                                    <IconArrowLeftSircle/>
                                </span>
                                <span 
                                    class="datepicker-arrow arrow-right" 
                                    @click="handleMonthYearChange(true)">
                                    <IconArrowRightSircle/>
                                </span>
                                </div>
                            </template>
                        
                            <template #action-buttons>
                                <!-- Empty block to hide select button -->
                                <div></div>
                            </template>
                        </VueDatePicker>
                    </div>
                </div>
            </div>
            <div class="md:w-1/2 lg:lg:basis-56 p-2 lg:p-0">
                <div class="">
                    <div class="filter-title">Размещение</div>
                    <div
                        class="filter-controls accommodation"
                        
                    >
                        <el-dropdown
                            trigger="click"
                            placement="bottom-start"
                            :class="{'disabled': !choosedHotel}"
                        >
                            <span class="el-dropdown-link">
                                <span v-if="sumHosted == 1">1 гость</span>
                                <span v-else>{{ sumHosted }} гостей</span>
                                <IconPerson/>
                            </span>

                            <template #dropdown>
                                <div class="accommodation-dropdown">
                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Взрослые</div>
                                        <div class="dscr">старше 18 лет<br> на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number
                                            v-model="adults"
                                            :min="1"
                                            :max="adults + emptyPersons"
                                            @change="runCounterMaxHosted"
                                        />
                                    </div>
                                   </div>

                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Подростки</div>
                                        <div class="dscr">от 12 до 18 лет<br> на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number
                                            v-model="teenagers"
                                            :min="0"
                                            :max="teenagers + emptyPersons"
                                            @change="runCounterMaxHosted"
                                        />
                                    </div>
                                   </div>

                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Дети</div>
                                        <div class="dscr">от 2 до 12 лет<br>  на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number
                                            v-model="сhildren"
                                            :min="0"
                                            :max="сhildren + emptyPersons"
                                            @change="runCounterMaxHosted"
                                        />
                                    </div>
                                   </div>

                                   <div class="accommodation-dropdown-item">
                                    <div class="left">
                                        <div class="title">Младенцы</div>
                                        <div class="dscr">до 2 лет<br> на дату заезда</div>
                                    </div>
                                    <div class="right">
                                        <el-input-number
                                            v-model="infants"
                                            :min="0"
                                            :max="infants + emptyPersons"
                                            @change="runCounterMaxHosted"
                                        />
                                    </div>
                                   </div>
                                </div>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
            <div class="btn-wrapper p-2 lg:p-0">
                <button
                    @click="getRoomTypes"
                    class="btn btn-dark"
                    :disabled="!choosedHotel"
                >
                    Найти номер
                </button>
            </div>
        </div>   

       


        <div v-if="emptyPersons == 0" class="flex items-center justify-center">
            <div class="max-w-lg py-8">
                <div class="">
                    Такое колличество гостей не вмещаяется в 1 номер. Пожалуйста, распределите гостей на несколько номеров или позвоните нам. <a href="+79999999999">+79999999999</a>
                </div>
                <div class="pt-4">
                    <button class="btn btn-dark ">Перезвоните мне</button>
                </div>
            </div>
        </div>

        <RoomTypeCard
            :roomTypes="roomTypes"
        />

    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'

    import IconCalendar from '@/components/icons/IconCalendar.vue'
    import IconArrowLeftSircle from '@/components/icons/IconArrowLeftSircle.vue'
    import IconArrowRightSircle from '@/components/icons/IconArrowRightSircle.vue'
    import IconPerson from '@/components/icons/IconPerson.vue'
    import IconSeashell from '@/components/icons/IconSeashell.vue'
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue'
    
    import RoomTypeCard from './RoomTypeCard.vue';

    
    

    let choosedHotel = ref()
    
    
    let date = ref()
    let rangeStartDate = ref()
    let rangeEndDate = ref()
    
    
    const adults = ref<any>(2)
    const teenagers = ref<any>(0)
    const сhildren = ref<any>(0)
    const infants = ref<any>(0)
    
    const roomTypes = ref<any>([]);
    const showNoRoomsNotification = ref<boolean>(false)
    
    
    let maxHostedPeople = ref<any>(0)
    let sumHosted = ref<any>(adults.value)
    let emptyPersons = ref<any>(1)
    
    const runCounterMaxHosted = () => {   
        sumHosted.value = adults.value + teenagers.value + сhildren.value + infants.value
        emptyPersons.value = maxHostedPeople.value - sumHosted.value
    }

    const changeMaxAdult = () => {
        maxHostedPeople.value = choosedHotel.value.nuberOfPersonsPerRoom
        emptyPersons.value = 1
        adults.value = 2
        teenagers.value = 0
        сhildren.value = 0
        infants.value = 0
        sumHosted.value = adults.value
    }
    
    const parseDate = (date: any) => {
        const options = {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            
        };

        return date.toLocaleString('ru', options)
    }

    const getMonthName = (monthNumber: number) => {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        return date.toLocaleString('ru', {
            month: 'long',
        });
    }

    const handleDate = (modelData:any) => {
        date.value = modelData;
        rangeStartDate.value = parseDate(date.value[0]);
        rangeEndDate.value =  parseDate(date.value[1]);
    }


    const listCities = ref();
    async function getCities() {
        try {
            const res = await fetch("https://backmb.aleancollection.ru/api/v1/cities/");
            const finalRes = await res.json();
            listCities.value = finalRes.res.map(function(city: any) {

                let hotels = city.hotels.map(function(hotel: any) {
                    let myHotel = {
                        value: {
                            value: hotel.guid,
                            nuberOfPersonsPerRoom: hotel.number_of_persons_per_room
                        },
                        label: hotel.title
                    }
                    return myHotel
                })

                let newCities = {
                    value: city.guid,
                    label: city.title,
                    children: hotels
                }
                return newCities
                })
        } catch (error) {
            console.log(error)
        }

    }
    getCities()

    
    async function getRoomTypes() {
        try {
            const res = await fetch(`https://backmb.aleancollection.ru/api/v1/rooms-request/${choosedHotel.value.value}/?number_of_adults=${adults.value}&number_of_teenagers=${teenagers.value}&number_of_children=${сhildren.value}&number_of_infants=${infants.value}`);
            const finalRes = await res.json();
            roomTypes.value = finalRes.res;
            if (roomTypes.value == 0) {
                showNoRoomsNotification.value = true
            }
        } catch (error) {
            console.log(error)
        }
    }


    onMounted(() => {
        const startDate = new Date();
        const endDate = new Date(new Date().setDate(startDate.getDate() + 1));
        date.value = [startDate, endDate];
        rangeStartDate.value = parseDate(startDate)
        rangeEndDate.value = parseDate(endDate)
    })

  </script>
    
  <style scoped>
  .btn[disabled] {
    opacity: .3;
  }
    .filter .btn-wrapper {
        margin-left: auto;
        display: flex;
        align-items:flex-end;
        justify-content: flex-end; 
    } 
  .icon-seashell {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
  }
    h1 {
        font-size: 44px;
        font-family: 'Optima Cyr';
        text-align: center;
        padding: 4.2rem 0 3.2rem;
    }
    .filter {
        /* padding: 2rem 5rem 1.9rem; */
        background-color: var(--color-primary);
        position: relative;
    }
    .col-1 {
        width: 21%;
        padding-right: 20px;
    }
    .col-2 {
        width: 36%;
        padding-right: 20px;
    }
    .col-3 {
        width: 18%;
        padding-right: 20px;
    }
    .col-4 {
        width: 20%;
        margin-left: 5%;
        display: flex;
        align-items: self-end;
        justify-content: flex-end;
    }
    .filter-title {
        color: #fff;
        padding-bottom: .5rem;
        font-size: 1.2rem;
        font-family: 'Optima Cyr';
    }
    .btn {
        height: 3.1rem;
        width: 12.5rem;
    }
    .dropdown-head {
        width: 100%;
        height: 3rem;
        background: #fff;
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: #939393;
        padding: 0 1.3rem;
        cursor: pointer;
    }
    .dropdown-list {
        padding: 0 1.3rem;
        border: 1px solid #fff;
        background: var(--color-primary);
        color: #fff;
    }
    .dropdown-list-item:not(:first-child) {
        border-top: 1px solid #BFC1C1;
    }
    .dropdown-list-item {
        padding: .7rem 0;
        cursor: pointer;
        line-height: 1.2;
    }


    /* datepicker */
    .dp__main {
        height: 100%;
        background: #fff;
        border: 1px solid #BFC1C1;
        cursor: pointer;
    }
    .dp__main > div {
        height: 100%;
    }
    .daterange {
        display: flex;
        justify-content: space-between;
    }
        .daterange-item {
            height: 100%;
            width: 50%;
            display: flex;
            align-items: center;
            padding: 0.7rem 1rem;
        }
        .daterange-item.start-date {
            border-right: 1px solid #BFC1C1;
        }
        .daterange-item.start-date i {
            margin-left: auto;
        }

        
        .accommodation .el-dropdown {
            height: 3rem;
            width: 100%;
        }
        .accommodation .el-dropdown .el-dropdown-link {
            background: #fff;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.2rem;
            font-size: 1rem;
            color: #000;
        }

        .accommodation-dropdown {
            padding: 1.4rem 1.9rem;
        }
        .accommodation-dropdown-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .accommodation-dropdown-item:not(:first-child) {
            margin-top: 1rem;
        }
        .accommodation-dropdown .title {
            color: #fff;
            font-size: 1rem;
        }
        .accommodation-dropdown .dscr {
            color: #BFC1C1;
            font-size: .8rem;
            line-height: 1;
            padding-top: .5rem;
        }
        
    /* room-type */
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