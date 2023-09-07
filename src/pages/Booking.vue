<template>
        <br>
        route.query.choosedHotelGuid: {{ $route.query.choosedHotelGuid }}
        <br>
        route.query.bonus: {{ $route.query.bonus }}
        <br>
        route.query.roomPrice: {{ $route.query.roomPrice }}
        <br>
        route.query.adults: {{ $route.query.adults }}
        <br>
        route.query.roomDetails: {{ roomDetails }}
        
        
        <Booking
                :avaliableServices="avaliableServices"
                :roomDetails="JSON.parse(String(route.query.roomDetails))"
                :сhildren="Number(route.query.сhildren)"
                :dateFrom="String(route.query.dateFrom)"
                :dateTill="String(route.query.dateTill)"
                :roomPrice="Number(route.query.roomPrice)"
                :bonus="Number(route.query.bonus)"
    
        />

</template>

<script setup lang="ts">
        import Booking from "@/features/booking/components/Booking.vue";
        import { onMounted, ref } from "vue";
        import { useRoute } from "vue-router";


        const route = useRoute();
        const avaliableServices = ref<[]>()
        const roomDetails = ref()        


        async function getServices() {
                try {
                        const res = await fetch(`https://backmb.aleancollection.ru/api/v1/paid-services/${route.query.choosedHotelGuid}/?number_of_children=${route.query.сhildren}&date_from=${route.query.dateFrom}&date_till=${route.query.dateTill}`);
                        const finalRes = await res.json();
                        avaliableServices.value = finalRes.res;

                } catch (error) {
                        console.log(error)
                }
        }
        
        onMounted(() => {
                getServices()
        })

</script>

<style scoped>

</style>