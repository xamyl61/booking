<template>
    <div class="container mx-auto mt-3">
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Мой профиль" name="myProfile">
                <MyProfile />
            </el-tab-pane>
            <el-tab-pane disabled label="Мои бронирования" name="myBooking">
                <MyBooking />
            </el-tab-pane>
            <el-tab-pane disabled label="Бонусный счет" name="myBonus">
                <MyBonus />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import MyProfile from "@/features/lk/components/MyProfile.vue";
import MyBooking from "@/features/lk/components/MyBooking.vue";
import MyBonus from "@/features/lk/components/MyBonus.vue";

const activeTab = ref('myProfile')

</script>

<style scoped lang="scss">

:deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
}

:deep(.el-tabs__item) {
    background-color: #EEEAEA;
    color: black;
}

:deep(.is-active) {
    background-color: #215C66;
    color: white;
}

:deep(.el-tabs__header) {
    margin: 0;
}

:deep(.el-tabs__content) {
    border: solid 1px #EEEAEA;
    border-top: none;
}

</style>