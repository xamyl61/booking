<template>
  <div class="booking-pay">
      <div class="booking-pay__title">
          <span>Общая стоимость</span>
      </div>
      <div class="booking-pay__cost">
          <span>{{Format.formatCurrency(pay.cost)}}</span>
          <div class="booking-pay__bonus">
              <span>Будет начислено {{pay.bonus}} бонусов</span>
          </div>
      </div>
      <div class="booking-pay__rules">
          <span>Правила отмены бронирования</span>
          <span>При отмене бронирования до 16.03.2023 возвращается 15% от суммы бронирования</span>
      </div>

      <div class="booking-pay__container">
          <BookingMethod description="Полностью оплатить бронирование и сэкономить время на заезде" :method="{id: pay.id, cost: pay.cost, method: BookingPayMethod.Full}" />
          <BookingMethod description="Оплатите часть, остальное потом" :method="{id: pay.id, cost: pay.cost, method: BookingPayMethod.Part, part: 30}" />

          <div class="booking-pay__timer">
              Если вы не оплатите бронирование в течение 15 минут, оно будет отменено
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

const props = defineProps({
  pay: {
    type: Object as PropType<IBookingPay>,
    required: true
  }
})

</script>

<style scoped lang="scss">
.booking-pay {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--color-primary);
    border-radius: 5px;

    &__title {
        font-size: 1.5rem;
    }

    &__cost {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__bonus {
        font-size: 0.75rem;
    }

    &__rules {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__timer {
        font-size: 0.75rem;
    }
}
</style>