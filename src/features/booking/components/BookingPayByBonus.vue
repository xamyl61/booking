
<template>
    <div class="pay-bonus">
        <div class="pay-bonus__icons">
            <IconPayLogos/>
        </div>
        <div class="pay-bonus__text">Предоплата 100 % для гарантии бронирования банковской картой МИР, Visa, MasterCard, UnionPay через платежную систему Сбербанк</div>
        <div class="pay-bonus__info"><b>Используйте ваши бонусные баллы для оплаты бронирования</b></div>
        <div class="pay-bonus__count">На вашем бонусном счету: 15 000 баллов</div>
        <div class="pay-bonus__debiting">
            <div><b>Списать</b> (максимально: 2 000 р.)</div>
            <input type="number" placeholder="2000">
        </div>
        <div class="pay-bonus__pay">
            <div class="cost">192 420 р.</div>
            <button class="btn">Оплатить</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import IconPayLogos from '@/components/icons/IconPayLogos.vue'


</script>

<style scoped lang="scss">

.pay-bonus {
    &__icons {
        padding: 2.5rem 0 1.5em;
    }
    &__text {
        max-width: 40rem;
    }
    &__info {
        padding-top: 1.5rem;
    }
    &__count {
        padding-top: 1rem;
    }
    &__debiting {
        padding-top: 2rem;
        display: flex;
        align-items: center;
        @media (max-width: 767px) {
            flex-direction: column;
            align-items: baseline;
        }
        input {
            margin-left: 2rem;
            height: 34px;
            border: none;
            border-bottom: 1px solid #EEEAEA;
            box-shadow: none;
            @media (max-width: 767px) {
                margin-top: 1rem;
                margin-left: 0;
            }
        }
    }
    &__pay {
        padding-top: 2rem;
        display: flex;
        align-items: center;
        @media (max-width: 767px) {
            justify-content: space-between;
            width: 100%;
        }
        .cost {
            font-family: "Optima Cyr", serif;
            font-size: 30px;
            font-weight: 400;
            line-height: 35px;
            margin-right: 2.8rem;
            @media (max-width: 767px) {
                margin-right: 1rem;
            }
        }
    }
}
</style>








