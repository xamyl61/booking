<template>
    <div class="room-type container mx-auto">
        <div class="backdrop" v-if="dpOpen"></div>
        <div class="cards">
            <div
                    v-for="(roomType, index) in roomTypes"
                    :key="roomType.room_type.guid"
                    class="card w-full "
            >
                <article class="h-full flex flex-col">
                    <Splide
                            :has-track="false"
                            :options="{ rewind: true, type: 'fade'}"
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
                        <h1>
                            <span
                                    
                                    @click="showRoomDetails(roomType.room_type.guid, roomType.price, roomType.price_info.bonus, roomType.is_available)"
                                    class="hover:underline cursor-pointer" href="#"
                            >
                                {{roomType.title}}
                            </span>
                        </h1>
                    </div>

                    <div class="flex items-center params">
                        <div class="flex items-center">
                            <div class="flex items-center pr-4 text-xs">
                                <IconPerson v-if="roomType.room_type.number_of_persons_per_room == 1"/>
                                <IconPerson2 v-if="roomType.room_type.number_of_persons_per_room == 2"/>
                                <IconPersons v-if="roomType.room_type.number_of_persons_per_room > 2"/>
                                {{roomType.room_type.number_of_persons_per_room}}
                                {{pluralPeopletext(roomType.room_type.number_of_persons_per_room)}}
                            </div>
                            <div class="flex items-center pr-4 text-xs">
                                <IconSquare/>
                                {{roomType.room_square}} м2
                            </div>
                            <div class="flex items-center text-xs">
                                <IconHome/>
                                {{roomType.room_type.number_of_beds_per_room}}
                                {{pluralRoomsText(roomType.room_type.number_of_beds_per_room)}}
                            </div>
                        </div>
                    </div>

                    <div class="flex room-description pr-4">
                        <div
                                @click="showRoomDetails(roomType.room_type.guid, roomType.price, roomType.price_info.bonus, roomType.is_available)"
                                class="flex items-center no-underline hover:underline cursor-pointer">
                            Подробнее о номере
                            <IconArrowLeftInCircle class="ml-3"/>
                        </div>


                    </div>

                    <div
                            v-if="roomType.is_available"
                            class="card-foot flex justify-between px-4">
                        <div class="shrink-0">
                            <div class="flex justify-between mb-1 h-4">
                                <div
                                        :class="{invisible: !roomType.price_info.discount}"
                                        class="discount-percent text-xs"
                                >-{{roomType.price_info.discount}}%
                                </div>
                                <div
                                        :class="{invisible: !roomType.price_info.full_price}"
                                        class="discount-cost text-xs line-through"
                                >{{(roomType.price_info.full_price).toLocaleString('ru-RU')}} р.
                                </div>
                            </div>
                            <div class="cost text-2xl h-9">{{(roomType.price_info.price).toLocaleString('ru-RU')}} р.
                            </div>
                            <div class="person-nights text-xs">{{countOfPersons}} чел. / {{countOfDays}}
                                {{pluralNightText(countOfDays)}}
                            </div>
                        </div>
                        <div class="pt-3 w-32 lg:w-44">
                            <div class="flex justify-center align-center h-5">
                                <IconRuble/>
                                <div
                                        :class="{invisible: !roomType.price_info.bonus}"
                                        class="text-xs pl-1 bonus-counts"
                                >{{roomType.price_info.bonus}} бонусов
                                </div>
                            </div>
                            <Button
                                @click="openBooking(roomType.room_type.guid, props.сhildren, props.adults, props.dateFrom, props.dateTill, choosedHotelGuid.value, roomType.price_info.bonus, roomType.price_info.price)" class="w-full">Выбрать</Button>
                        </div>
                    </div>
                    <div
                            v-else
                            class="card-foot flex justify-between px-4"
                    >
                        <div class="shrink-0">
                            <div class="cost h-9 flex items-center">Распродано</div>
                        </div>
                        <div>
                            <Button
                                    :loading="selectedRoomGuid === roomType.room_type.guid"
                                    @click="openDatePickerMenu(roomType.is_available_index, roomType.room_type.guid)"
                                    class="w-full btn-grey"
                            >
                                Доступные даты
                            </Button>
                        </div>
                        <VueDatePicker
                                input-class-name="qweasd"
                                @open="bodyStopScrolling"
                                @closed="bodyAutoScrolling"
                                auto-apply
                                range
                                multi-calendars
                                v-model="changedToAvailableDate"
                                :enable-time-picker="false"
                                locale="ru"
                                :six-weeks="true"
                                :max-date="maxDate || null"
                                :offset="1"
                                ref="datepicker"
                                menu-class-name="m-datepicker"
                                teleport-center
                                :allowed-dates="availableRoomsDatesComputed.concat(additionalRoomsDates as any)"
                                :markers="highlightDates"
                                @range-start="onRangeStart"
                                no-disabled-range
                                @update:model-value="$emit('changeAvailableDates', changedToAvailableDate, roomType.room_type.guid)"
                                :transitions="false"
                        >
                            <template #action-extra>
                                <div class="calendar-title">Доступные даты заезда</div>
                            </template>
                            <template #trigger>
                                <div class="daterange">
                                    <div class="daterange-item start-date whitespace-pre">
                                        {{rangeStartDate}}
                                    </div>
                                    <div class="devide-line">
                                        &#9135;
                                    </div>
                                    <div class="daterange-item end-date whitespace-pre">
                                        {{rangeEndDate}}
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
                                    {{getMonthName(month)}} {{year}}
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

                            <template #left-sidebar>
                            </template>
                        </VueDatePicker>
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
                    :endDateFormated="props.endDateFormated"
                    :startDateFormated="props.startDateFormated"
                    :roomDetails="roomDetails"
                    :roomPrice="roomPrice"
                    :countOfDays="newCountOfDays"
                    :countOfPersons="countOfPersons"
                    :bonus="bonusVal"
                    :сhildren="сhildren"
                    :dateFrom="props.dateFrom"
                    :dateTill="props.dateTill"
                    :choosedHotelGuid="choosedHotelGuid.value"
                    :adults="adults"
                    :footerInfo="isAvailable"
            />
        </el-dialog>


    </div>

</template>

<script setup lang="ts">
import {ref, computed, watchEffect, onMounted, reactive} from 'vue';
import type {PropType} from 'vue';
import type {DatePickerInstance} from "@vuepic/vue-datepicker"

import {Splide, SplideSlide, SplideTrack} from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

import VueDatePicker from '@vuepic/vue-datepicker';
import RoomCardDetails from '@/features/hotels/components/RoomCardDetails.vue';


import IconSlideRight from '@/components/icons/IconSlideRight.vue';
import IconArrowLeftSircle from '@/components/icons/IconArrowLeftSircle.vue'
import IconArrowRightSircle from '@/components/icons/IconArrowRightSircle.vue'
import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';
import IconPerson from '@/components/icons/IconPerson.vue';
import IconPerson2 from '@/components/icons/IconPerson2.vue';
import IconPersons from '@/components/icons/IconPersons.vue';
import IconSquare from '@/components/icons/IconSquare.vue';
import IconHome from '@/components/icons/IconHome.vue';
import IconRuble from '@/components/icons/IconRuble.vue';

import Button from '@/components/Button.vue';

import plural from 'plural-ru';
import { useRouter } from 'vue-router';

import type {IRoomType} from "@/features/hotels/types/IRoomType";

import { useBookingRoomsStore } from '@/stores/booking-store';   
import { useBookingFormStore } from '@/stores/booking-form-store';
     
const bookingRoomsStore = useBookingRoomsStore()

const changedToAvailableDate = ref()
const newCountOfDays = ref()
const rangeStartDate = ref()
const rangeEndDate = ref()
const dpOpen = ref(false);
const datepicker = ref<DatePickerInstance[]>([]);

const isAvailable = ref<boolean>(false)


const isDateInArray = (targetDate: any, dateArray: any) => {
    const targetDateWithoutTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

    for (const date of dateArray) {
        const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        if (dateWithoutTime.getTime() === targetDateWithoutTime.getTime()) {
            return true;
        }
    }

    return false;
}


const maxDate = ref()

const onRangeStart = (value: any) => {

    const maxIteration = 30;
    let date = new Date(value)

    for(let i = 0; i < maxIteration; i++) {
        date.setDate(date.getDate() + 1)

        if (!isDateInArray(date, availableRoomsDatesComputed.value)) {
            additionalRoomsDates.value = [date]
            highlightDates.value = [
                {
                    date: date,
                    type: 'dot',
                    color: 'yellow'
                }]
            maxDate.value = date

            return
        }
    }

}

const dialogVisible = ref(false)

const roomPrice = ref<number>(0)
const bonusVal = ref<number>(0)
    
    
const availableRoomsDates = ref([])
const selectedRoomGuid = ref('')


const scroll = ref(true)



const props = defineProps({

    roomTypes: Object as PropType<IRoomType[]>,
    countOfDays: {
        type: Number,
        default: 1
    },
    countOfPersons: {
        type: Number,
        default: 1
    },
    сhildren: {
        type: Number,
        default: 0
    },
    infants: {
        type: Number,
        default: 0
    },
    adults: {
        type: Number,
        default: 1
    },
    startDateFormated: {
        type: String,
    },
    endDateFormated: {
        type: String,
    },
    dateFrom: {
        type: String,
        required: true
    },
    dateTill: {
        type: String,
        required: true
    },
    choosedHotelGuid: {
        type: Object,
        default: {}
    }
    

})

const openDatePickerMenu = async (index: number, guid: string) => {

    selectedRoomGuid.value = guid

    try {
        await getAvailableRooms(guid)

        if (datepicker.value) {
            const dPicker = datepicker.value
            dPicker[index]?.openMenu()
        }
    } finally {
        selectedRoomGuid.value = ''
    }

}

const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('ru', {
        month: 'long',
    });
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

async function showRoomDetails(guid: string, cost: number, bonus: number, available: boolean) {
    await getRoomDeatails(guid)
    dialogVisible.value = !dialogVisible.value
    roomPrice.value = cost
    bonusVal.value = bonus
    isAvailable.value = available
}

const roomDetails = ref()

async function getRoomDeatails(guid: string) {
    try {
        newCountOfDays.value = props.countOfDays
        const res = await fetch(`https://backmb.aleancollection.ru/api/v1/room-type-info/${guid}/`);
        const finalRes = await res.json();
        roomDetails.value = finalRes.res;
        return finalRes.res

    } catch (error) {
        console.log(error)
    }
}


const getAvailableRooms = async (guid: string) => {
    try {
        const res = await fetch(`https://backmb.aleancollection.ru/api/v1/available-rooms/${guid}/`);
        const finalRes = await res.json();
        availableRoomsDates.value = finalRes.res;
        return finalRes
    } catch (error) {
        console.log(error)
    }
}

let additionalRoomsDates = ref<Date[]>([])
const availableRoomsDatesComputed = computed(() => {
    return availableRoomsDates.value.map(function (dateItem: any) {
        return new Date(dateItem.period)
    })
})

const highlightDates = ref<any[]>([])


const bodyStopScrolling = () => {
    dpOpen.value = true
    changedToAvailableDate.value = ''
    scroll.value = false
}
const bodyAutoScrolling = () => {
    dpOpen.value = false
    additionalRoomsDates.value = []
    highlightDates.value = []
    maxDate.value = null
    scroll.value = true
}

const router = useRouter()

const formStore = useBookingFormStore()

const openBooking = async (roomTypeGuid: string, сhildren: number, adults: number, dateFrom: string, dateTill: string, choosedHotelGuid: string, bonus: number, roomPrice: number) => {
    
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

    const response = await getRoomDeatails(roomTypeGuid)
    const bookingInfoData = {
        adults: adults,
        сhildren: сhildren,
        roomDetails: response,
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


watchEffect(() => {
    if (scroll.value) {
        document.documentElement.style.overflow = 'auto'
        return
    }

    document.documentElement.style.overflow = 'hidden'
})

onMounted(() => {
    newCountOfDays.value = props.countOfDays
})

</script>

<style scoped lang="scss">
.cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    padding: 3rem 5rem 2rem;
    @media (max-width: 1280px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 1024px) {
        padding-left: 0;
        padding-right: 0;
    }
    @media (max-width: 767px) {
        grid-template-columns: 1fr;
        padding: 40px 20px 70px;
    }
}
.devide-line {
    display: none;
}
.backdrop {
    z-index: 3000;
    background-color: var(--el-overlay-color-lighter);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.calendar-title {
    color: white;
    text-align: center;
    font-family: 'Optima Cyr', serif;
    font-size: 20px;
    line-height: 20px;
    padding-top: 1rem;
}

:deep(.dp__sidebar_left) {
    display: none;
}

:deep(.dp__menu_content_wrapper) {
    display: flex;
    flex-direction: column-reverse;
}


/* datepicker */
.card-foot .dp__main {
    width: 0;
}

/* end datepicker */
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
    color: #202020;
}

.room-type .params .icon {
    padding-right: .4rem;
}

.room-description {
    color: #202020;
}
.card-foot {
    padding: 0 1.8rem 1rem;
}

.card-foot .cost {
    font-family: 'Optima Cyr';
}

.discount-percent {
    font-family: 'Optima Cyr';
    color: #EB5757;
}

.discount-cost {
    font-family: 'Optima Cyr';
    color: #939393;
}

.bonus-counts,
.person-nights {
    font-family: 'Geometria';
    color: #939393;
}


</style>