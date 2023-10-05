<template>
    <div>
      <BookingHeader/>   
        roomsTypesAndGuest: {{ roomsTypesAndGuest }}
        <hr>
        bookingStore: {{ bookingStore.useBookingList }}
        <hr>
        bookingFormStore.bookingForm: {{ bookingFormStore.bookingForm }}
        <hr>
        bookingFormStore.formsValidateResults: {{ bookingFormStore.formsValidateResults }}
        <hr>
        checValidateFormsStatus: {{ checValidateFormsStatus }}
        <hr>
        bookingPaymentStore.bookingPayment: {{ bookingPaymentStore.bookingPayment }}
        <div class="booking-block container mx-auto">
          <div v-if="show" class="flex gap-6">
              <div class="booking-main grow">


                  <BookingRooms
                      v-for="(booking, index) in bookingStore.useBookingList"
                      :booking="booking"
                      :index="index + 1"
                  />

                  <div class="mb-10">
                      <button @click="router.push('/')" class="btn ml-auto mt-10 btn-with-border">Добавить гостя</button>
                  </div>
                  <BookingServices :avaliableServices="avaliableServices"/>
                  <BookingPaymentData/>
              </div>
              <div class="booking-sidebar">
                  <div class="booking-sidebar-inner">
                      <div class="headline">Ваше бронирование</div>
                      <BookingReservationList
                          v-for="(booking, index) in bookingStore.useBookingList"
                          :booking="booking"
                          :index="index + 1"
                      />
                      <div class="cost">
                          <div class="line">Стоимость</div>
                          <div class="price">
                              <div class="cost">212121212 р.</div>
                              <div class="bonus"><IconRuble/> 1111 бонусов</div>
                          </div>
                      </div>
                      <div @click="showBooking" class="footline">Забронировать</div>

                      <button @click="postBooking" style="border: 1px solid red;">nedValidate</button>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref, type PropType, watch } from "vue";

    
    import BookingRooms from "@/features/booking/components/BookingRooms.vue";


    import BookingRoomsSelected from "@/features/booking/components/BookingRoomsSelected.vue";
    import BookingRoomsMoreComfort from "@/features/booking/components/BookingRoomsMoreComfort.vue";
    import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";
    import BookingServices from "@/features/booking/components/BookingServices.vue";
    import BookingReservationList from "@/features/booking/components/BookingReservationList.vue";
    import BookingHeader from "@/features/booking/components/BookingHeader.vue";
    import BookingComplete from "@/features/booking/components/BookingComplete.vue";
    import BookingPaymentData from "@/features/booking/components/BookingPaymentData.vue";
    
    import IconRuble from '@/components/icons/IconRuble.vue';
    import { useBookingRoomsStore } from "@/stores/booking-store";

    import type {IRoomDetails} from "@/features/hotels/types/IRoomDetails";
    import type {IBookingInfoData} from "@/features/booking/types/IBookingInfoData";

    import { useFilterStore } from '@/stores/filter-params-store';
    import { useRouter } from "vue-router";
    import { useBookingFormStore } from '@/stores/booking-form-store';
    import { useBookingPaymentStore } from '@/stores/booking-payment-store';
    


    const router = useRouter()
    const roomsTypesAndGuest = ref()
    
    const bookingStore = useBookingRoomsStore()
    const filterStore = useFilterStore()
    const avaliableServices = ref<[]>()
    const paymentsInfo = ref()
    const show = ref(true)

    const bookingFormStore = useBookingFormStore()
    const bookingPaymentStore = useBookingPaymentStore()

    const updatePaymentData = (event: Event, payments: any) => {
        paymentsInfo.value = payments
    }

    const showBooking = () => {
        console.log('booking click')
        console.log(bookingFormStore.bookingForm)
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
    const postBooking = () => {
        bookingFormStore.formsValidateResults = []
        bookingFormStore.needValidate = !bookingFormStore.needValidate
        roomsTypesAndGuest.value = roomsAndGuest
    }


    bookingFormStore.$subscribe((mutation, state) => {
        checValidateFormsStatus.value = bookingFormStore.formsValidateResults.every(formValidationResult => formValidationResult === true);
    })
    
    const roomsAndGuest = bookingStore.useBookingList.map(function(room, index) {
        const newRoom = {
            guid: '',
            number_of_adults: 0,  
            number_of_сhildren: 0,
            date_from: '', 
            date_till: '', 
            guests: <any>[]
        }
        newRoom.guid = room.roomDetails.room_type.guid
        newRoom.number_of_adults = room.adults
        newRoom.number_of_сhildren = room.сhildren
        newRoom.guid = room.roomDetails.room_type.guid
        newRoom.date_from = room.dateFrom
        newRoom.date_till = room.dateTill
        newRoom.guests = bookingFormStore.bookingForm[index].guests
        return newRoom
    })
    

    onMounted(() => {
        getServices()
        window.scrollTo(0,0)
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
    
    .cost-wr {
        margin-top: 4.5rem;
    }
    .cost {
        font-family: 'Optima Cyr';
    }
    .bonus {
        color: rgba(147, 147, 147, 1);
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

    
  </style>