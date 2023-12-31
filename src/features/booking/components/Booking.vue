<template>
    <div>
      <BookingHeader/>   
        <div class="booking-block container mx-auto" v-loading="loading">
          <div v-if="show" class="flex gap-6">
              <div class="booking-main grow">
                  <BookingRooms
                      v-for="(booking, index) in bookingStore.useBookingList"
                      :key="booking.roomDetails.room_type.guid"
                      :booking="booking"
                      :index="index + 1"
                  />

                  <div class="mb-10">
                    <Button
                        :disabled="bookingStore.useBookingList.length >= 5"
                        @click="router.push('/')"
                        class="btn ml-auto mt-10 btn-with-border"
                    >
                        Добавить номер
                    </Button>
                  </div>
                  <!-- <BookingServices :avaliableServices="avaliableServices"/> -->
                  <BookingPaymentData
                    v-if="bookingStore.useBookingList.length"
                  />
              </div>
              <div class="booking-sidebar">
                  <div class="booking-sidebar-inner">
                      <div class="headline" @click="showSidebarBokings = !showSidebarBokings">Ваше бронирование <span class="triangle">&#9650;</span></div>
                      <div class="booking-sidebar__list" :class="{showBokings: showSidebarBokings}">
                        <BookingReservationList
                            v-for="(booking, index) in bookingStore.useBookingList"
                            :booking="booking"
                            :index="index + 1"
                        />
                        <div class="cost">
                            <div class="line">Стоимость</div>
                            <div class="price">
                                <div class="cost">{{ totalCost.toLocaleString('ru-RU') }} р.</div>
                                <div class="bonus"><IconRuble/> {{ totalBonus }} бонусов</div>
                            </div>
                        </div>
                      </div>
                      <div class="footline">
                          <div @click="postBooking" class="footline-btn">Забронировать</div>
                      </div>
                  </div>
              </div>
          </div>
          <div v-else>
            <BookingComplete/>
          </div>
        </div>
        <BookingCanceledModal :show="bookingCancel"/>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, type PropType, watch, computed } from "vue";

    
    import BookingRooms from "@/features/booking/components/BookingRooms.vue";


    import BookingRoomsSelected from "@/features/booking/components/BookingRoomsSelected.vue";
    import BookingRoomsMoreComfort from "@/features/booking/components/BookingRoomsMoreComfort.vue";
    import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";
    import BookingServices from "@/features/booking/components/BookingServices.vue";
    import BookingReservationList from "@/features/booking/components/BookingReservationList.vue";
    import BookingHeader from "@/features/booking/components/BookingHeader.vue";
    import BookingComplete from "@/features/booking/components/BookingComplete.vue";
    import BookingPaymentData from "@/features/booking/components/BookingPaymentData.vue";
    import BookingCanceledModal from "@/features/booking/components/BookingCanceledModal.vue";

    import Button from '@/components/Button.vue'

    
    
    import IconRuble from '@/components/icons/IconRuble.vue';
    import { useBookingRoomsStore } from "@/stores/booking-store";

    import type {IRoomDetails} from "@/features/hotels/types/IRoomDetails";
    import type {IBookingInfoData} from "@/features/booking/types/IBookingInfoData";

    import { useFilterStore } from '@/stores/filter-params-store';
    import { useRouter } from "vue-router";
    import { useBookingFormStore } from '@/stores/booking-form-store';
    import { useBookingPaymentStore } from '@/stores/booking-payment-store';

    import axios from 'axios';

    const BASE_URL = 'https://backmb.aleancollection.ru/api/v2';

    const client = axios.create({
        baseURL: BASE_URL
    });
    

    const totalCost = ref(0)
    const totalBonus = ref(0)
    const loading = ref(false)
    const router = useRouter()
    const roomsTypesAndGuest = ref()
    const bookingCancel = ref(false)
    
    const bookingStore = useBookingRoomsStore()
    const filterStore = useFilterStore()
    const avaliableServices = ref<[]>()
    const paymentsInfo = ref()
    const show = ref(true)
    const showSidebarBokings = ref(false)

    const bookingFormStore = useBookingFormStore()
    const bookingPaymentStore = useBookingPaymentStore()

    const updatePaymentData = (event: Event, payments: any) => {
        paymentsInfo.value = payments
    }

    const showBooking = () => {
        show.value = false
    }

    async function getServices() {
        try {
            const chosedHotelString = JSON.parse(JSON.stringify(filterStore.filter?.choosedHotel)).value 
            const res = await fetch(`https://backmb.aleancollection.ru/api/v1/paid-services/${chosedHotelString}/?number_of_children=${filterStore.filter?.сhildren}&date_from=${'2023-09-23'}&date_till=${'2023-09-29'}`);
            const finalRes = await res.json();
            avaliableServices.value = finalRes.res;

        } catch (error) {
            console.log(error)
        }
    }

    const checValidateFormsStatus = ref()
    const postBooking = async () => {
        bookingFormStore.formsValidateResults = []
        bookingFormStore.needValidate = !bookingFormStore.needValidate
    }

    bookingFormStore.$subscribe(async (mutation, state) => {

        const roomsAndGuest = bookingStore.useBookingList.map(function(room, index) {
            const newRoom = {
                guid: '',
                number_of_adults: 0,  
                number_of_children: 0,
                date_from: '', 
                date_till: '', 
                guests: <any>[],
                needUpSail: true,
            }
            newRoom.guid = room.roomDetails.room_type.guid
            newRoom.number_of_adults = room.adults
            newRoom.number_of_children = room.сhildren
            newRoom.guid = room.roomDetails.room_type.guid
            newRoom.date_from = room.dateFrom
            newRoom.date_till = room.dateTill
            newRoom.guests = bookingFormStore.bookingForm[index].guests
            return newRoom
        })

        const arrayOfCountForms = bookingFormStore.bookingForm.map(item => item.guests.length)
        let sum = 0;
        const sumOfCountForms = () => {
            arrayOfCountForms.forEach(item => {
                sum += item;
            });
            return sum
        } 

        const sumOfCountFormsVal = sumOfCountForms()
        if (bookingFormStore.formsValidateResults.length === sumOfCountFormsVal + 1) {
            checValidateFormsStatus.value = bookingFormStore.formsValidateResults.every(formValidationResult => formValidationResult === true);
        }

        if (checValidateFormsStatus.value === true) {
            if (bookingStore.bookedRooms.booking_guid) {
                await createBooking(() => client.put('/booking/', {
                    booking_guid: bookingStore.bookedRooms.booking_guid,
                    room_types: roomsAndGuest,
                    payment_guest: bookingPaymentStore.bookingPayment
                }));
            } else {
                await createBooking(() => client.post('/booking/', {
                    room_types: roomsAndGuest,
                    payment_guest: bookingPaymentStore.bookingPayment
                }));
            }
     
        }

        // calculate total cost by room cost
        calculteCost()
        calculteBonus()
        
    });

    const calculteBonus = () => {
        const arrayBonusRooms = bookingStore.useBookingList.map((bonus: { bonus: number; }) => bonus.bonus)
        totalBonus.value = 0
        for (const value of arrayBonusRooms) {
            totalBonus.value += value;
        }
    }

    const calculteCost = () => {
        const arrayCostRooms = bookingStore.useBookingList.map((roomCost: { roomPrice: number; }) => roomCost.roomPrice)
        totalCost.value = 0
        for (const value of arrayCostRooms) {
            totalCost.value += value;
        }
    }

    bookingStore.$subscribe(async (mutation, state) => {
        calculteCost()
        calculteBonus()
    })

    const createBooking = async (callback: () => Promise<any>) => {
        loading.value = true;
        try {
            const response = await callback();
            bookingStore.bookedRooms = response.data.res
            router.push('/complete')//
        } catch (e: any) {
            if (e.response.status === 404) {
                bookingCancel.value = true
            }
            console.log(e)
        } finally {
            loading.value = false;
        }
    }


    onMounted(() => {
        getServices()
        window.scrollTo(0,0)
        bookingFormStore.formsValidateResults = []
    })
  </script>
    
  <style scoped lang="scss">
    .header-line {
        background-color: var(--color-primary);
        color: #fff;
        padding: 1rem 0;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }
    .booking-block {
        padding: 3rem 1.3rem 0;

        @media (max-width: 1200px) {
            & > .flex {
                flex-direction: column;
            }
        }
        @media (max-width: 768px) {
            width: auto;
            max-width: 100%;
        }
    }
    .booking-block hr {
        border-color: rgba(238, 234, 234, 1);
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
    .btn:disabled {
        opacity: .5;
    }

    /* .booking-sidebar */
    .booking-sidebar {
        flex: 0 0 20em;
        @media (max-width: 768px) {
            flex: 0 0 0;
        }

        &__list {
            @media (max-width: 768px) {
                display: none;
                &.showBokings {
                    display: block;
                }
            }
            @media (max-width: 767px) {
                order: 3;
            }
        }
    }
    .booking-sidebar-inner {
        border: 1px solid #EEEAEA;
        position: sticky;
        top: 0;
        @media (max-width: 767px) {
            display: flex;
            flex-direction: column;
        }
    }
    .booking-sidebar .line {
        color: #202020E5;
    }
    .booking-sidebar .headline {
        height: 4.2rem;
        display: flex;
        align-items: center;
        background: var(--color-primary);
        color: #fff;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;

        @media (max-width: 768px) {
            width: 50%;
            height: 5.5rem;
        }
        @media (max-width: 767px) {
            width: auto;
            order: 1;
            height: auto;
            padding: 1.3rem 1.4rem 1rem;
        }
        .triangle {
            display: none;
            scale: 0.6;
            margin-left: 1rem;
            @media (max-width: 768px) {
                display: inline-block;
            }
        }
    }
    .booking-sidebar .footline {
        background: var(--color-primary);
        color: #fff;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
        cursor: pointer;
        

        @media (max-width: 768px) {
            width: 50%;
            position: absolute;
            top: 0;
            right: 0;
            height: 5.5rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 1.2rem;
        }
        @media (max-width: 767px) {
            width: auto;
            position: static;
            order: 2;
            padding: 0 1.4rem 1.4rem;
            height: auto;
        }
        &-btn {
            display: flex;
            padding: 0 1.4rem;
            width: 100%;
            height: 4.2rem;
            align-items: center;
            justify-content: center;

            @media (max-width: 768px) {
                width: 15rem;
                height: 2.8rem;
                border-radius: 22px;
                background: #F7C87Ded;
                color: #121326;
                font-size: 1rem;
                font-family: 'Geometria';
            }
            @media (max-width: 767px) {
                width: 100%;
            }
        }
    }
    .booking-sidebar .footline:hover {
        @media (min-width: 768px) {
            background: #F7C87D;

        }
    }
    .booking-sidebar .price {
        padding: 1.4rem;
    }
    .booking-sidebar .cost {
        font-size: 1.75rem;
        font-family: 'Optima Cyr';

    }
    .booking-sidebar .bonus {
        display: flex;
        font-family: 'Geometria';
        font-size: .75rem;
    }
    .booking-sidebar .bonus i {
        margin-right: .5rem;
    }
    .booking-sidebar .line {
        height: 3.2rem;
        display: flex;
        align-items: center;
        background: #EEEAEA;
        font-size: 1.25rem;
        font-family: 'Optima Cyr';
        padding: 0 1.4rem;
    }

    
  </style>