<template>
    <div>

    </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import type { PropType } from 'vue';

    import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
    import '@splidejs/vue-splide/css';

    
    

    import IconSlideRight from '@/components/icons/IconSlideRight.vue';
    import IconArrowLeftInCircle from '@/components/icons/IconArrowLeftInCircle.vue';

    import plural  from 'plural-ru';

    const peoplePerRoomPlurals = ref('')

    interface Room {
        title: string 
    }

    const props = defineProps({
        roomTypes: Object as PropType<Room[]>,
        countOfDays: {
            type: Number,
            default: 1
        },
    })

    const pluralPeopletext = (count: number) => {
        return false;
    }




</script>
  
<style scoped>





</style>