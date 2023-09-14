<template>
    <div class="write-off">

        <div class="write-off__item_bold">
            - 120 руб.
        </div>

        <div class="write-off__item_strong">
            Бронь <span class="font-bold">123254546434</span>
        </div>

        <div class="write-off__item_strong">
            Alean Family, г. Анапа
        </div>

        <div class="write-off__item_small">
            12 июля 2023 г., 16:00
        </div>

    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

.write-off {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    padding: 30px 40px 30px 40px;
    border: 1px solid #EEEAEA;
    align-items: center;

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