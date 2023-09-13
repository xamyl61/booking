<template>
    <div>
        <BookingRoomsSelected
            :adults="adults"
            :сhildren="сhildren"
            :dateFrom=" dateFrom"
            :dateTill=" dateTill"
            :roomPrice="roomPrice"
            :bonus="bonus"
            :roomDetails="roomDetails"
        />
        <hr>
        <BookingRoomsMoreComfort/>
        <hr>


        <BookingAddGuestData
            :adults="adults"
            :сhildren="сhildren"
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


    const paymentsInfo = ref()
    const guestsInfo = ref()

    const show = ref(true)


    const props = defineProps({
        id: {
            type: String,
        },
        adults: {
            type: Number,
            required: true
        },
        сhildren: {
            type: Number,
            required: true
        },
        roomDetails: {
            type: Object as PropType<IRoomDetails>,
            required: true
        },
        avaliableServices: {
            type: Object
        },
        dateFrom: {
            type: String,
            required: true
        },
        dateTill: {
            type: String,
            required: true
        },
        roomPrice: {
            type: Number,
            required: true
        },
        bonus: {
            type: Number,
            required: true
        },
    })


    const reseravationList = reactive({
        dateFrom: props.dateFrom,
        dateTill: props.dateTill ,
        roomTitle: props.roomDetails.title,
    })

    const updateGuestInfo = (event: Event, guests: any) => {
        guestsInfo.value = guests
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