<script setup lang="ts">

import { reactive, ref } from "vue";

const props = defineProps({
    serviceDetails: {
            type: Object,
        },
    })

    
</script>

<template>
    <div class="sercice-dscr">
       
        <div class="sercice-dscr__img">
            <img :src="props.serviceDetails?.paid_service_image?.full_url" alt="">
        </div>
        <div class="sercice-dscr__cont">
            <div class="title"> {{ props.serviceDetails?.title }}</div>
            <p>{{ props.serviceDetails?.description }}</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
.sercice-dscr {
    max-width: 1500px;
    height: 100%;
    display: flex;
    &__img {
        width: 45%;
        img {
            height: 100%;
            object-fit: cover;
        }
    }
    &__cont {
        width: 55%;
        padding: 3rem 2rem;
        overflow-y: auto;
        .title {
            font-size: 1.6rem;
            padding-bottom: 1rem;
        }
    }
}




</style>








