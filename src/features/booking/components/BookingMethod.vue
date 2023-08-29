<template>
    <div class="booking-method">
        <div class="booking-method__info">
            <span class="booking-method__info_bold">{{method.method === BookingPayMethod.Full ? '100%' : `${method.part}%`}}</span>
            <span>{{description}}</span>
        </div>
        <div class="booking-method__cost">
            <span>{{Format.formatCurrency(totalCost)}}</span>
            <el-button round type="primary" size="default">Выбрать</el-button>
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
    border: 1px solid #EEEAEA;

    &__info {
        display: flex;
        gap: 1rem;

        &_bold {
            font-weight: 700;
        }
    }

    &__cost {
        display: flex;
        gap: 1rem;
        align-items: center;

        & span {
            font-family: "Optima Cyr",serif;
            font-size: 30px;
            font-weight: 400;
            line-height: 35px;
        }

        :deep(.el-button) {
            background-color: #215C66;
            border-color: #215C66;
            color: white;
            width: 170px;
        }
    }
}
</style>