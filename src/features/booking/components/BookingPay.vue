<template>
  <div class="booking-pay">
      <div class="booking-pay__title">
          <span>Общая стоимость</span>
      </div>
      <div class="booking-pay__cost">
          <span>{{Format.formatCurrency(pay.cost)}}</span>
          <div class="booking-pay__bonus">
              <IconBonus />
              <span>Будет начислено {{pay.bonus}} бонусов</span>
          </div>
      </div>
      <div class="booking-pay__rules">
          <span class="booking-pay__rules_under">Правила отмены бронирования</span>
          <span>При отмене бронирования до 16.03.2023 возвращается 15% от суммы бронирования</span>
      </div>

      <div class="booking-pay__container">
          <BookingMethod description="Полностью оплатить бронирование и сэкономить время на заезде" :method="{id: pay.id, cost: pay.cost, method: BookingPayMethod.Full}" />
          <BookingMethod description="Оплатите часть, остальное потом" :method="{id: pay.id, cost: pay.cost, method: BookingPayMethod.Part, part: 30}" />

          <div class="booking-pay__timer">
              ЕСЛИ В ТЕЧЕНИЕ 15 МИНУТ ВЫ НЕ ВНЕСЕТЕ ОПЛАТУ, БРОНЬ БУДЕТ АННУЛИРОВАНА
          </div>
      </div>

  </div>
</template>

<script setup lang="ts">

import type {IBookingPay} from "@/features/booking/types/IBookingPay";
import type {PropType} from "vue";
import BookingMethod from "@/features/booking/components/BookingMethod.vue";
import {BookingPayMethod} from "@/features/booking/types/IBookingMethod";
import {Format} from "@/utils/format";
import IconBonus from "@/components/icons/IconBonus.vue";

const props = defineProps({
  pay: {
    type: Object as PropType<IBookingPay>,
    required: true
  }
})

// const props = defineProps({
//   totalPrice: {
//     type: any
//   }
// })



</script>

<style scoped lang="scss">
.booking-pay {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__title {
        font-family: 'Geometria', sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
    }

    &__cost {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        & span {
            font-family: "Optima Cyr" ,serif;
            font-size: 34px;
            font-weight: 400;
            line-height: 34px;
        }
    }

    &__bonus {
        display: flex;
        gap: 0.3rem;

        & span {
            font-family: Geometria, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 18px;
        }
    }

    &__rules {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        font-family: Geometria, sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;

        &_under {
            text-decoration: underline;
        }
    }

    &__container {
        display: flex;
        flex-direction: column;
    }

    &__timer {
        font-family: Geometria, sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 25px;
        text-transform: uppercase;
        margin: 1rem 0;
    }
}
</style>