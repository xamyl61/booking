<template>
    <div class="booking-history">

        <div class="booking-history__item_bold">
            Бронь № 1209483
        </div>

        <div class="booking-history__item_strong">
            Alean Family, г. Анапа
        </div>

        <div class="booking-history__item_small">
            12 июля, ср - 13 июля, чт
        </div>

        <div class="booking-history__item">
            <ArrowIcon />
        </div>

    </div>
</template>

<script setup lang="ts">

import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";
</script>

<style scoped lang="scss">

.booking-history {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 30px 40px 30px 40px;
  border: 1px solid #EEEAEA;

  &__item {
    &_bold {
      font-family: Geometria,serif;
      font-size: 20px;
      font-weight: 700;
      line-height: 28px;
      text-align: left;
    }

    &_strong {
      font-family: Optima Cyr,serif;
      font-size: 22px;
      font-weight: 400;
      line-height: 30px;
      text-align: left;
    }

    &_small {
      font-family: Geometria,serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 20px;
      text-align: left;
    }
  }
}

</style>