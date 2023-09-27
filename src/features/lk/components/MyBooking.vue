<template>

    <div class="my-booking">
        <LkHeader>
            <template #title>
                Планируется заезд
            </template>
            <template #icon>
                <BirdIcon />
            </template>
        </LkHeader>


        <div class="my-booking__content">
            <BookingCard />
        </div>


        <LkHeader>
            <template #title>
                История бронирований
            </template>
            <template #icon>
                <ShellIcon />
            </template>
        </LkHeader>

        <div class="my-booking__content">
            <BookingHistoryCard />
        </div>
    </div>

</template>

<script setup lang="ts">

import LkHeader from "@/features/lk/components/LkHeader.vue";
import BirdIcon from "@/features/lk/components/Icons/BirdIcon.vue";
import BookingCard from "@/features/lk/components/BookingCard.vue";
import ShellIcon from "@/features/lk/components/Icons/ShellIcon.vue";
import BookingHistoryCard from "@/features/lk/components/BookingHistoryCard.vue";
</script>

<style scoped lang="scss">
.my-booking {
    padding-top: 50px;

    &__content {
        padding: 3rem 5rem 2rem 5rem;
    }

    &__submit {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    &__title {
        font-family: Geometria, sans-serif;
        font-size: 20px;
        font-weight: 400;
        line-height: 25px;
        text-align: left;
    }
}
</style>