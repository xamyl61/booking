<template>
    <div>
        <div class="header-line">
            <div class="container mx-auto flex justify-between ">
                <div class="left" @click="router.push('/')">Выбрать номер</div>
                <div class="center">Данные о гостях</div>
                <div class="left" @click="router.push('/complete')">Завершить бронирование</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()




</script>
    
<style scoped>
    .header-line {
        background-color: var(--color-primary);
        color: #fff;
        padding: 1rem 0;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }
</style>