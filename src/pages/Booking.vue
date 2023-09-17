<template>    
        <Booking :bookingInfoData="bookingInfoData"/>
</template>

<script setup lang="ts">
        import Booking from "@/features/booking/components/Booking.vue";
        import { onMounted, reactive, ref } from "vue";
        import { useRoute } from "vue-router";
        import { useBookingRoomsStore } from '@/stores/booking-store';
        
        const bookingRoomsStore = useBookingRoomsStore()
        // const route = useRoute();

        // const bookingInfoData = reactive({
        //         adults: Number(route.query.adults),
        //         сhildren: Number(route.query.сhildren),
        //         roomDetails: JSON.parse(String(route.query.roomDetails)),
        //         dateFrom: String(route.query.dateFrom),
        //         dateTill: String(route.query.dateTill),
        //         roomPrice: Number(route.query.roomPrice),
        //         bonus: Number(route.query.bonus),
        //         choosedHotel: String(route.query.choosedHotelGuid)
        // })

        const bookingInfoData = ref<any>()

        
        onMounted(() => {
                bookingInfoData.value = bookingRoomsStore.useBookingList
                // bookingRoomsStore.setBookingRoom(bookingInfoData)
        })

</script>

<style scoped>

</style>