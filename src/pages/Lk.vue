<template>
    <div class="container mx-auto">
        <Filter :standalone="true" />
        <el-tabs type="card" v-model="activeTab">
            <el-tab-pane label="Мой профиль" name="myProfile">
                <MyProfile />
            </el-tab-pane>
            <el-tab-pane label="Мои бронирования" name="myBooking">
                <MyBooking />
            </el-tab-pane>
            <el-tab-pane label="Бонусный счет" name="myBonus">
                <MyBonus />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import MyProfile from "@/features/lk/components/MyProfile.vue";
import MyBooking from "@/features/lk/components/MyBooking.vue";
import MyBonus from "@/features/lk/components/MyBonus.vue";
import {useRoute} from "vue-router";
import Filter from "@/features/hotels/components/Filter.vue";

const activeTab = ref('myProfile')

const route = useRoute()

watch(route, (to) => {
    if(to.query.tab) {
        activeTab.value = to.query.tab as string
    }
}, {flush: 'pre', immediate: true, deep: true})

</script>

<style scoped lang="scss">

:deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    :deep(.is-scrollable .el-tabs__nav-scroll) {
        display: block;
    }
}

:deep(.el-tabs__item) {
    font-family: Optima Cyr,serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    text-align: center;
    background-color: #EEEAEA;
    color: black;
    border-left: 1px solid #939393 !important;

    &:first-child {
        border-left: none !important;
    }
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

@media (max-width: 768px) {
    :deep(.el-tabs__content) {
        border-bottom: none;
    }
}

@media (min-width: 1536px) {
    .container-fluid {
        max-width: 1336px;
    }
}


</style>