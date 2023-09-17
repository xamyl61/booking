<template>
    <div>
        <div>
            <!-- avaliableServices: {{ avaliableServices }}
            <br>
            bookingInfoData: {{ bookingInfoData }} -->
            
            <!-- bookingInfo: {{ bookingInfoData.roomDetails }}
            <br>
            paymentsInfo: {{ paymentsInfo }}
            <br>
            guestsInfo: {{ guestsInfo }} -->
            <br>
            <!-- roomDetails.room_type.guid: {{ roomDetails.room_type.guid }} -->
        </div>
        <BookingHeader/>
        
            <div class="booking-block container mx-auto">
            <div v-if="show" class="flex gap-6">
                <div class="booking-main grow">
                    <BookingRooms
                        v-for="booking in bookingInfoData"
                        :booking="booking"
                    />
                </div>
                <div class="booking-sidebar">
                    <div class="booking-sidebar-inner">
                        <div class="headline">Ваше бронирование</div>
                        <!-- <BookingReservationList :reseravationList="reseravationList"/> -->
                        <div class="cost">
                            <div class="line">Стоимость</div>
                            <div class="price">
                                <div class="cost">212121212 р.</div>
                                <div class="bonus"><IconRuble/> 1111 бонусов</div>
                            </div>
                        </div>
                        <div @click="showBooking" class="footline">Забронировать</div>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref, type PropType } from "vue";

    
    import BookingRooms from "@/features/booking/components/BookingRooms.vue";


    import BookingRoomsSelected from "@/features/booking/components/BookingRoomsSelected.vue";
    import BookingRoomsMoreComfort from "@/features/booking/components/BookingRoomsMoreComfort.vue";
    import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";
    import BookingServices from "@/features/booking/components/BookingServices.vue";
    import BookingReservationList from "@/features/booking/components/BookingReservationList.vue";
    import BookingHeader from "@/features/booking/components/BookingHeader.vue";
    import BookingComplete from "@/features/booking/components/BookingComplete.vue";
    import BookingPaymentData from "@/features/booking/components/BookingPaymentData.vue";

    import type {IRoomDetails} from "@/features/hotels/types/IRoomDetails";
    import type {IBookingInfoData} from "@/features/booking/types/IBookingInfoData";

    

    

    

    import IconRuble from '@/components/icons/IconRuble.vue';

    const avaliableServices = ref<[]>()

    const paymentsInfo = ref()
    const guestsInfo = ref()

    const show = ref(true)

    // const props = defineProps({
    //     id: {
    //         type: String,
    //     },
    //     adults: {
    //         type: Number,
    //         required: true
    //     },
    //     сhildren: {
    //         type: Number,
    //         required: true
    //     },
    //     roomDetails: {
    //         type: Object as PropType<IRoomDetails>,
    //         required: true
    //     },
    //     avaliableServices: {
    //         type: Object
    //     },
    //     dateFrom: {
    //         type: String,
    //         required: true
    //     },
    //     dateTill: {
    //         type: String,
    //         required: true
    //     },
    //     roomPrice: {
    //         type: Number,
    //         required: true
    //     },
    //     bonus: {
    //         type: Number,
    //         required: true
    //     }
    // })


    const props = defineProps({
        bookingInfoData: {
            type: Object as PropType<IBookingInfoData[]>,
            required: true
        }
    })


    // const reseravationList = reactive({
    //     dateFrom: props.dateFrom,
    //     dateTill: props.dateTill ,
    //     roomTitle: props.roomDetails.title,
    // })

    const updateGuestInfo = (event: Event, guests: any) => {
        guestsInfo.value = guests
    }

    const updatePaymentData = (event: Event, payments: any) => {
        paymentsInfo.value = payments
    }

    const showBooking = () => {
        show.value = false
    }

    // async function getServices() {
    //         try {
    //                 const res = await fetch(`https://backmb.aleancollection.ru/api/v1/paid-services/${props.bookingInfoData.choosedHotel}/?number_of_children=${props.bookingInfoData.сhildren}&date_from=${props.bookingInfoData.dateFrom}&date_till=${props.bookingInfoData.dateTill}`);
    //                 const finalRes = await res.json();
    //                 avaliableServices.value = finalRes.res;

    //         } catch (error) {
    //                 console.log(error)
    //         }
    // }


    onMounted(() => {
        // getServices()
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