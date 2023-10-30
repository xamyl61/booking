<template>
    <div class="mb-10">
        <BookingRoomsSelected
            :booking="booking"
            :index="index"
        />
        <hr>
        <BookingRoomsMoreComfort
            :roomGuid=booking.roomDetails.room_type.guid
            :booking="booking"
            :index="index"
        />
        <hr>

        <BookingAddGuestData
            :booking="booking"
            :bookingIndex="index"
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
    import { useBookingFormStore } from '@/stores/booking-form-store';

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

    onMounted(() => {
        window.scrollTo(0,0)
    })
  </script>
    
  <style scoped>
   

    
  </style>