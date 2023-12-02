<template>
    <div class="filter-wr" :class="{'standalone': standalone}">
        <div
            class="booking-room-list container mx-auto"
            v-if="bookingStore.useBookingList.length"
        >
            <RoomsBooking
                v-for="(bookingRoom, index) in bookingStore.useBookingList"
                :bookingRoom="bookingRoom"
                :index="index"
            />
        </div>
        <h1 v-else v-if="!standalone">Выберите период проживания и количество гостей</h1>
        <div class="filter container mx-auto lg:flex lg:flex-wrap lg:gap-x-6 p-3 md:p-8 lg:px-20 lg:py-8">
            <IconSeashell/>
            <div class="grow p-4 lg:p-0">
                <div class=" ">
                    <div class="filter-title">Отель</div>
                    <div class="filter-controls">
                        <el-tree-select
                                v-model="choosedHotel"
                                :data="listCities"
                                placeholder="Выберите отель"
                                @change="changeMaxAdult"
                                class="dropdown-custom-styles"
                                default-expand-all
                                :disabled="bookingStore.useBookingList.length"
                        >
                        </el-tree-select>
                    </div>
                </div>
            </div>
            <div class="datepicker-wrapper p-4 lg:p-0">
                <div>
                    <div class="filter-title">Период проживания</div>
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
                                :min-date="new Date(choosedHotel?.bookingDateFrom)"
                                :max-date="new Date(choosedHotel?.bookingDateTill)"
                                @update:model-value="handleDate"
                                menu-class-name="m-datepicker"
                        >
                            <template #trigger>
                                <div class="daterange">
                                    <div class="daterange-item start-date whitespace-pre">
                                        {{ rangeStartDate }}
                                    </div>
                                    <div class="devide-line">
                                        &#9135;
                                    </div>
                                    <div class="daterange-item end-date whitespace-pre">
                                        {{ rangeEndDate }}
                                        <IconCalendar/>
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
                        </VueDatePicker>

                    </div>
                </div>
            </div>
            <div class="grow p-4 lg:p-0">
                <div>
                    <div class="filter-title">Количество гостей</div>
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
                                            <div class="dscr">старше 12 лет<br> на дату заезда</div>
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
                                            <div class="title">Дети</div>
                                            <div class="dscr">до 12 лет<br> на дату заезда</div>
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
                                    <div v-if="emptyPersons == 0" class="flex items-center justify-center accommodation-limit-message">
                                        <div class="max-w-lg pt-4">
                                            <div>
                                                Выбрано максимальное колличество гостей для размещения в 1 номере. Если колличество гостей не вмещается в 1 номер, пожалуйста, распределите гостей на несколько номеров или позвоните нам <br>тел. <a href="+79999999999">8 800 250 00 30 </a>
                                            </div>
                                            <div class="pt-4">
                                                <button class="btn btn-dark ">Перезвоните мне</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
            <div class="p-4 lg:p-0 btn-wrapper">
                <button
                        @click="getRoomTypes"
                        class="btn btn-yellow hover:scale-[1.06] ease-in duration-100"
                        :disabled="!choosedHotel"
                >
                    Найти номер
                </button>
            </div>
        </div>

        <div v-if="roomTypes.length == 0 && showNoRoomsNotification">
            <h6 class="text-3xl	 text-center">Онлайн бронирование недоступно. Вы можете забронировать номер по телефону 8-800-100-33-93</h6>
        </div>

        <template v-if="!standalone">
            <RoomTypeCard
                :startDateFormated="rangeStartDate"
                :endDateFormated="rangeEndDate"
                :countOfDays="countOfDays"
                :countOfPersons="countOfPersons"
                :adults="adults"
                :сhildren="сhildren"
                :infants="infants"
                :roomTypes="roomTypes"
                :dateFrom="startDateFormated"
                :dateTill="endDateFormated"
                :choosedHotelGuid="choosedHotel"

                v-loading="loading"
                @change-available-dates="changeAvailableDates"
                element-loading-text="Идет поиск номеров..."
            />

            <el-dialog
                v-model="dialogVisible"
                width="70%"
                class="room-detail"
                align-center
                destroy-on-close
            >
                <RoomCardDetails
                    :endDateFormated="parseDate(new Date(roomType.date_till))"
                    :startDateFormated="parseDate(new Date(roomType.date_from))"
                    :roomDetails="roomDetails"
                    :roomPrice="roomType.price_info.price"
                    :countOfDays="countOfDaysAvailable"
                    :countOfPersons="countOfPersons"
                    :сhildren="сhildren"
                    :dateFrom="dateFromAvailableDates"
                    :dateTill="dateTillAvailableDates"
                    :choosedHotelGuid="choosedHotel"
                    :adults="adults"
                    :bonus="bonus"
                />
            </el-dialog>
        </template>


    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, PropType} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconArrowLeftSircle from '@/components/icons/IconArrowLeftSircle.vue'
import IconArrowRightSircle from '@/components/icons/IconArrowRightSircle.vue'
import IconPerson from '@/components/icons/IconPerson.vue'
import IconSeashell from '@/components/icons/IconSeashell.vue'

import RoomCardDetails from '@/features/hotels/components/RoomCardDetails.vue';
import RoomTypeCard from '@/features/hotels/components/RoomTypeCard.vue'
import RoomsBooking from '@/features/hotels/components/RoomsBooking.vue'


import { useBookingRoomsStore } from '@/stores/booking-store';
import { useFilteredRoomsStore } from '@/stores/filtered-room-store';
import { useFilterStore } from '@/stores/filter-params-store';
import {IBookingInfo} from "@/features/booking/types/IBookingInfo";


const bookingStore = useBookingRoomsStore()
const roomsStore = useFilteredRoomsStore()
const filterStore = useFilterStore()


const props = defineProps({
    standalone: {
        type: Boolean,
        required: false,
        default: false
    }
})


const loading = ref(false)
let choosedHotel = ref()


let date = ref()
let rangeStartDate = ref()
let rangeEndDate = ref()

let startDateFormated = ref('')
let endDateFormated = ref('')


const adults = ref<number>(2)
const teenagers = ref<any>(0)
const сhildren = ref<number>(0)
const infants = ref<number>(0)

const dialogVisible = ref<Boolean>(false)
const roomType = ref()
const roomTypes = ref<any>([])
const roomDetails = ref()
const showNoRoomsNotification = ref<boolean>(false)
const bonus = ref<number>(0)


let maxHostedPeople = ref<number>(0)
let sumHosted = ref<number>(adults.value)
let emptyPersons = ref<number>(1)


let countOfDays = ref()
const countOfDaysAvailable = ref()
let countOfPersons = ref()


// const filteredRoomsdata = reactive({
//     startDateFormated: rangeStartDate,
//     endDateFormated: rangeEndDate,
//     countOfDays: countOfDays,
//     countOfPersons: countOfPersons,
//     adults: adults,
//     сhildren: сhildren,
//     infants: infants,
//     roomTypes: roomTypes,
//     dateFrom: startDateFormated,
//     dateTill: endDateFormated,
//     choosedHotelGuid: choosedHotel,
// })

const dateFromAvailableDates = ref<string>("")
const dateTillAvailableDates = ref<string>("")

async function changeAvailableDates(event: Event, roomGuid: string) {
    dateFromAvailableDates.value =  dateFormateding(new Date(event[0]))
    dateTillAvailableDates.value = dateFormateding(new Date(event[1]))
    await getRoomTypeByDates(event, roomGuid)
    await getRoomDeatails(roomGuid)
    dialogVisible.value = true
}

const runCounterMaxHosted = () => {
    sumHosted.value = adults.value + teenagers.value + сhildren.value + infants.value
    emptyPersons.value = maxHostedPeople.value - sumHosted.value
}

const changeMaxAdult = () => {
    // roomTypes.value = excludeBookingRooms()
    maxHostedPeople.value = choosedHotel.value.nuberOfPersonsPerRoom
    adults.value = 2
    teenagers.value = 0
    сhildren.value = 0
    infants.value = 0
    sumHosted.value = adults.value + teenagers.value + сhildren.value + infants.value
    emptyPersons.value = maxHostedPeople.value - sumHosted.value
}

const parseDate = (date: Date) => {
    let year = date.getFullYear();
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.toLocaleString("default", { day: "numeric" });
    let weekday = date.toLocaleString("default", { weekday: "short" });
    let formattedDate = day  + " " + month + " " + year + "г., " + weekday;

    return formattedDate
}

const dateFormateding = (date: Date) => {
    let year = date.getFullYear();
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    let formattedDate = year + "-" + month + "-" + day;

    return formattedDate
}

const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('ru', {
        month: 'long',
    });
}

const filter = reactive({
    choosedHotel: choosedHotel,
    date: date,
    adults: adults,
    сhildren: сhildren,
    sumHosted: sumHosted,
    maxHostedPeople: maxHostedPeople,
    emptyPersons: emptyPersons,
    infants: infants
})


const handleDate = () => {
    // date.value = modelData;
    rangeStartDate.value = parseDate(date.value[0]);
    rangeEndDate.value =  parseDate(date.value[1]);

    startDateFormated.value = dateFormateding(date.value[0]);
    endDateFormated.value =  dateFormateding(date.value[1]);

}

async function getRoomDeatails(guid: string) {
    try {
        const res = await fetch(`https://backmb.aleancollection.ru/api/v1/room-type-info/${guid}/`);
        const finalRes = await res.json();
        roomDetails.value = finalRes.res;

    } catch (error) {
        console.log(error)
    }
}


const listCities = ref();
async function getCities() {
    try {
        const res = await fetch("https://backmb.aleancollection.ru/api/v1/cities/");
        const finalRes = await res.json();
        const listCities = finalRes.res.map(function(city: any) {

            let hotels = city.hotels.map(function(hotel: any) {
                let myHotel = {
                    value: {
                        value: hotel.guid,
                        nuberOfPersonsPerRoom: hotel.number_of_persons_per_room,
                        bookingDateFrom: hotel.booking_date_from,
                        bookingDateTill: hotel.booking_date_till
                    },
                    label: hotel.title
                }
                return myHotel
            })

            city.title = 'г. ' + city.title

            let newCities = {
                value: city.guid,
                label: city.title,
                children: hotels
            }
            return newCities
        })
        return listCities
    } catch (error) {
        console.log(error)
    }

}

// const storeRoomFiltered = use

async function getRoomTypes() {

    if(props.standalone) {
        return;
    }

    try {
        countOfPersons.value = sumHosted.value
        countOfDays.value = (new Date(date.value[1]).getTime() - new Date(date.value[0]).getTime())/(1000 * 3600 * 24)
        loading.value = true
        const res = await fetch(`https://backmb.aleancollection.ru/api/v1/rooms-request/${choosedHotel.value.value}/?number_of_adults=${adults.value}&number_of_teenagers=${teenagers.value}&number_of_children=${сhildren.value}&number_of_infants=${infants.value}&date_from=${startDateFormated.value}&date_till=${endDateFormated.value}`);
        const finalRes = await res.json();
        roomTypes.value = finalRes.res;
        // roomsStore.$reset()
        // roomsStore.setRooms(roomTypes.value)
        filterStore.setFilter(filter)
        if (roomTypes.value == 0) {
            showNoRoomsNotification.value = true
        }

        //added index if not available, it needs to open picker
        let index = 0;
        roomTypes.value.forEach(function(item:any) {
            if (!item.is_available) {
                item.is_available_index = index++
            }
            return roomTypes
        })

    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

async function getRoomTypeByDates(availableDate: any, roomGuid: string) {
    try {
        loading.value = true
        countOfDaysAvailable.value = (new Date(availableDate[1]).getTime() - new Date(availableDate[0]).getTime())/(1000 * 3600 * 24)
        const res = await fetch(`https://backmb.aleancollection.ru/api/v1/rooms-request/room-type/${roomGuid}/?number_of_adults=${adults.value}&number_of_children=${сhildren.value}&date_from=${dateFormateding(availableDate[0])}&date_till=${dateFormateding(availableDate[1])}&number_of_infants=${infants.value}`);
        const finalRes = await res.json();
        roomType.value = finalRes.res;
        bonus.value = finalRes.res.price_info.bonus;
        if (roomTypes.value == 0) {
            showNoRoomsNotification.value = true
        }

    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

// const excludeBookingRooms = () => {
//     return roomsStore.filteredRooms.filter(room => !bookingStore.selectedRooms.includes(room.room_type.guid))
// }

const getUrlParams = () => {
    return new URL(window.location.href)
}

const getHotelByGuid = async (guid: string) => {
    let hotel = Object({})
    const list = listCities.value
    for (let i=0; i < list.length; i++ ) {
        for (let j=0; j < list[i].children.length; j++ ) {
            if (list[i].children[j].value.value == guid) {
                hotel = list[i].children[j]
            }
        }
    }
    return hotel.value
}




onMounted(async () => {
    // if (roomsStore.filteredRooms.length) {
    //     roomTypes.value = excludeBookingRooms()
    // }
    const urlSearch = getUrlParams()
    listCities.value = await getCities()

    if (urlSearch.search) {
        // if (urlSearch.searchParams.get('return_url') != null) {
        //     localStorage.setItem("return_url", <string>urlSearch.searchParams.get('return_url'))
        // }
        console.log("return_url: ", urlSearch.searchParams.get('return_url'))
        choosedHotel.value = await getHotelByGuid(<any>urlSearch.searchParams.get('hotel')) 
        const startDate = new Date(<any>urlSearch.searchParams.get('date_from'))
        const endDate = new Date(<any>urlSearch.searchParams.get('date_till'))
        
        date.value = [startDate, endDate];

        rangeStartDate.value = parseDate(startDate)
        rangeEndDate.value = parseDate(endDate)

        startDateFormated.value = dateFormateding(startDate)
        endDateFormated.value = dateFormateding(endDate)

        adults.value = <any> Number(urlSearch.searchParams.get('number_of_adults'))
        сhildren.value =  <any> Number(urlSearch.searchParams.get('number_of_children'))
        maxHostedPeople.value = choosedHotel.value.nuberOfPersonsPerRoom

        runCounterMaxHosted()

        await getRoomTypes()

    } else {
        if (filterStore.filter) {
            date.value = filterStore.filter.date
            const startDate = new Date(date.value[0]);
            const endDate = new Date(date.value[1])
    
            rangeStartDate.value = parseDate(startDate)
            rangeEndDate.value = parseDate(endDate)
    
            startDateFormated.value = dateFormateding(startDate)
            endDateFormated.value = dateFormateding(endDate)
    
            choosedHotel.value = filterStore.filter.choosedHotel
            adults.value = filterStore.filter.adults
            сhildren.value = filterStore.filter.сhildren
            sumHosted.value = filterStore.filter.sumHosted
            maxHostedPeople.value = filterStore.filter.maxHostedPeople
            emptyPersons.value = filterStore.filter.emptyPersons
        } else {
            const startDate = new Date();
            const endDate = new Date(new Date().setDate(startDate.getDate() + 1))
            date.value = [startDate, endDate];
    
            rangeStartDate.value = parseDate(startDate)
            rangeEndDate.value = parseDate(endDate)
    
            startDateFormated.value = dateFormateding(startDate)
            endDateFormated.value = dateFormateding(endDate)
        }
    }

    
})

</script>

<style scoped lang="scss">
.filter-wr {
    @media (max-width: 768px) {
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
.btn[disabled] {
    opacity: .3;
}
.filter .btn-wrapper {
    margin-left: auto;
    display: flex;
    align-items:flex-end;
    justify-content: flex-end;
    @media (max-width: 768px) {
        display: block;
        margin-top: 1rem;
    }
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
    @media (max-width: 767px) {
        font-size: 1.8rem;
        line-height: 1;
        padding: 3rem 0 2rem;
    }
}
.filter {
    /* padding: 2rem 5rem 1.9rem; */
    background-color: var(--color-primary);
    position: relative;
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
.datepicker-wrapper {
    flex-basis: 27rem;
}
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
    font-family: 'Geometria';
    display: flex;
    align-items: center;
    padding: 0.7rem 1rem;
    color: #121326;
    @media (max-width: 767px) {
        font-size: .7rem;
    }
}
.daterange-item.start-date {
    @media (max-width: 767px) {
        padding-right: .5rem;
    }
}
.daterange-item.end-date {
    flex-grow: 1;
    @media (max-width: 767px) {
        padding-left: .5rem;
    }
}
.daterange-item.end-date i {
    margin-left: auto;
}
.daterange .devide-line {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10%;
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
    color: #121326;
}

.accommodation-dropdown {
    padding: 1.4rem 1.9rem;
    width: 19rem;
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
    font-family: 'Arial';
}
.accommodation-limit-message {
    font-size: .7rem;
    line-height: 1.4;
    color: rgba(204, 204, 204, .5);
}
.accommodation-limit-message .btn {
    height: 2.1rem;
    width: 10.5rem;
    font-size: 0.8rem;
}

/* room-type */
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

.booking-room-list {
    padding: 2rem 7rem 1.5rem;
    @media (max-width: 1024px) {
        padding: 1rem 0 0;
    }
}

.standalone {
    margin-top: 3rem;
    margin-bottom: 2.5rem;
}


</style>