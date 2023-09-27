<template>
    <div>
        <BookingRoomsSelected
            :booking="booking"
            :index="index"
        />
        <hr>
        <BookingRoomsMoreComfort
            :roomGuid=booking.roomDetails.room_type.guid
            :booking="booking"
        />
        <hr>

        <!-- @update-guest-info="updateGuestInfo" -->

        <!-- <button
                    class="btn"
                    @click="bookingStore.updateBookingRoomGuestsData(guestsInfo, index)"
                >Добавить данные гостей</button> -->
        <BookingAddGuestData
            :booking="booking"
            @update-guest-info="updateGuestInfo"
        />

    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref, type PropType } from "vue";

    import BookingRoomsSelected from "@/features/booking/components/BookingRoomsSelected.vue";
    import BookingRoomsMoreComfort from "@/features/booking/components/BookingRoomsMoreComfort.vue";
    import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";

    import type {IRoomDetails} from "@/features/hotels/types/IRoomDetails";
    import type {IBookingInfoData} from "@/features/booking/types/IBookingInfoData";


    import { useBookingRoomsStore } from "@/stores/booking-store";

    const bookingStore = useBookingRoomsStore()

    const paymentsInfo = ref()
    const guestsInfo = ref()

    const show = ref(true)


    const props = defineProps({
        booking: {
            type: Object as PropType<IBookingInfoData>,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    })
    
    const emit = defineEmits(['updateGuests'])
    const updateGuestInfo = (event: Event, guests: any) => {
        guestsInfo.value = guests

        emit('updateGuests', guestsInfo)
    }


    onMounted(() => {
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