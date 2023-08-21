<template>
    <div class="booking-method">
        <div class="booking-method__info">
            <span>{{method.method === BookingPayMethod.Full ? '100%' : `${method.part}%`}}</span>
            <span>{{description}}</span>
        </div>
        <div class="booking-method__cost">
            <span>{{Format.formatCurrency(totalCost)}}</span>
            <el-button type="primary" size="small">Выбрать</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">

import type {IBookingMethod} from "@/features/booking/types/IBookingMethod";
import {BookingPayMethod} from "@/features/booking/types/IBookingMethod";
import type {PropType} from "vue";
import {computed} from "vue";
import {Format} from "@/utils/format";

const props = defineProps({
    method: {
        type: Object as PropType<IBookingMethod>,
        required: true
    },
    description: {
        type: String as PropType<string>,
        required: true
    }
})

const totalCost = computed(() => {
    if(!props.method) return 0

    const cost = Number(props.method.cost)

    if (props.method.method === BookingPayMethod.Full) {
        return cost
    } else {
        return cost * (props.method.part || 1) / 100
    }
})

</script>

<style scoped lang="scss">
.booking-method {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border: 1px solid var(--color-primary);
    border-radius: 5px;

    &__info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__cost {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
}
</style>