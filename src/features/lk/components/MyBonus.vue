<template>
    <div class="my-bonus">
        <LkHeader>
            <template #title>
                Информация о счете
            </template>
            <template #icon>
                <BirdIcon />
            </template>
        </LkHeader>

        <div class="my-bonus__content">
            <div class="my-bonus__loyalte">
                Ознакомьтесь подробнее с нашей <span class="my-bonus__loyalte_under">программой лояльности</span>
            </div>


            <div v-if="showBonus">
                <template v-if="isLoading">
                    <el-skeleton :rows="1" />
                </template>
                <template v-else>
                    <div class="my-bonus__number">
                        Номер бонусного счета:
                        <span class="my-bonus__number_bold">{{bonus.number}}</span>
                    </div>
                    <div class="my-bonus__account">
                        Текущий баланс бонусного счета:
                        <span class="my-bonus__account_bold">{{bonus.amount}} руб.</span>
                    </div>
                </template>
            </div>


        </div>


        <!--<LkHeader>
            <template #title>
                История списаний
            </template>
            <template #icon>
                <ShellIcon />
            </template>
        </LkHeader>

        <div class="my-bonus__content">

            <div class="my-bonus__filter">
                <el-button type="info" size="default">За все время</el-button>
            </div>

            <WriteOffCard />
        </div>-->

    </div>
</template>

<script setup lang="ts">
import LkHeader from "@/features/lk/components/LkHeader.vue";
import BirdIcon from "@/features/lk/components/Icons/BirdIcon.vue";
import ShellIcon from "@/features/lk/components/Icons/ShellIcon.vue";
import WriteOffCard from "@/features/lk/components/WriteOffCard.vue";
import {onMounted, reactive, ref} from "vue";
import client from "@/api/client";
import {toast} from "vue3-toastify";

const bonus = reactive({
    amount: 0,
    number: '-'
})
const showBonus = ref(true)
const isLoading = ref(true)

onMounted(() => {
    getCurrentBonus()

})

const getCurrentBonus = async () => {
    try {
        const response = await client.get(`/v2/users/bonus/`)
        bonus.amount = response.data.amount
        bonus.number = response.data.number
        isLoading.value = false
    }
    catch (e) {
        showBonus.value = false
    } finally {
        isLoading.value = false
    }
}

</script>

<style scoped lang="scss">
.my-bonus {
    padding-top: 50px;

    &__content {
        padding: 3rem 5rem 2rem 5rem;
    }

    &__submit {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    &__filter {
        margin-bottom: 1rem;
    }

    &__title {
        font-family: Geometria, sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;
    }

    &__account {
        font-family: Optima Cyr,serif;
        font-size: 22px;
        font-weight: 400;
        line-height: 30px;
        margin-top: 1.5rem;

        &_bold {
            font-weight: 700;
            line-height: 30px;
        }
    }

    &__number {
        font-family: Optima Cyr,serif;
        font-size: 22px;
        font-weight: 400;
        line-height: 30px;
        margin-top: 1.5rem;

        &_bold {
            font-weight: 700;
            line-height: 30px;
        }
    }

    &__loyalte {

        font-family: Geometria,serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;


        &_under {
            text-decoration: underline;
            color: #045575;
            cursor: pointer;
        }
    }
}

:deep(.el-button) {
    font-family: Geometria,serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    background-color: #215C66;
    border-radius: 0;
    height: 50px;
}
</style>