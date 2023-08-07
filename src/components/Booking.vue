<template>
    <div>
        <div class="header-line">
            <div class="left">Выбрать номер</div>
            <div class="center">Данные о гостях</div>
            <div class="left">Завершить бронирование</div>
        </div>
        <div class="booking-block">
            <div class="booking-main">
                <div class="booking-rooms">
                    <div class="booking-rooms-item">
                        <div class="booking-rooms-item-header">
                            <div class="title">Номер 1</div>
                            <div class="">Удалить номер <i class="icon-trash"></i></div>
                        </div>
                        <div class="booking-rooms-item-content">
                            <img src="assets/room1.jpg" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="booking-sidebar">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    const listCities = ref();

    onMounted(() => {

    })

  </script>
    
  <style scoped>
  
  </style>