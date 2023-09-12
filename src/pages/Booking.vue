<template>    
        <Booking
                :adults="Number(route.query.adults)"
                :сhildren="Number(route.query.сhildren)"
                :avaliableServices="avaliableServices"
                :roomDetails="JSON.parse(String(route.query.roomDetails))"
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