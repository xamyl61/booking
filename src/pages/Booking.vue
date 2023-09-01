<template>
        $route.params: {{ $route.params }}
        <Booking />

</template>

<script setup lang="ts">
import Booking from "@/features/booking/components/Booking.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";



        const route = useRoute();
        console.log(route);

</script>

<style scoped>

</style>