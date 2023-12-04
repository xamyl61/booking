<template>
    <div class="booking-method">
        <div class="booking-method__block">
            <div class="booking-method__info">
                <span class="booking-method__info_bold">{{method.method === BookingPayMethod.Full ? '100%' : `${method.part}%`}}</span>
                <span>{{description}}</span>
                <span v-if="showPayBonus" @click="showPayBonus = !showPayBonus" class="triangle">&#9650;</span>
            </div>
            <div class="booking-method__cost" v-if="!showPayBonus">
                <span>{{Format.formatCurrency(totalCost)}}</span>
                <el-button round type="primary" size="default" @click="showPayBonus = !showPayBonus">Выбрать</el-button>
            </div>
        </div>
        <BookingPayByBonus :cost="totalCost" v-if="showPayBonus"/>
    </div>
</template>

<script setup lang="ts">

import type {IBookingMethod} from "@/features/booking/types/IBookingMethod";
import {BookingPayMethod} from "@/features/booking/types/IBookingMethod";
import BookingPayByBonus from "@/features/booking/components/BookingPayByBonus.vue";
import type {PropType} from "vue";
import {computed, ref} from "vue";
import {Format} from "@/utils/format";
import Button from '@/components/Button.vue'

const showPayBonus = ref(false)

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
    padding: 1rem;
    border: 1px solid #EEEAEA;

    &__block {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: baseline;
        }
    }

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
        @media (max-width: 768px) {
            padding-top: 1rem;
        }
        @media (max-width: 767px) {
            justify-content: space-between;
            width: 100%;
        }

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
            height: 40px;
            font-size: 1rem;
            &:hover {
                background: #F7C87D;
                border-color: #F7C87D;
            }
        }
    }
    .triangle {
        color: #4F4F4F;
        position: relative;
        top: 2px;
        cursor: pointer;
    }
}
</style>