<template>
    <div class="container mx-auto">
        <Filter :standalone="true" />
        <div class="menu">
            <div @click="isShowMenu = !isShowMenu" class="menu__select">
                <span>{{selectedMenu}}</span>
                <svg :class="{ 'arrow-icon--open': isShowMenu }" width="11" height="14" viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 14L-6.1196e-07 -9.53674e-07L11 7L0 14Z" fill="white"/>
                </svg>
            </div>
            <div v-if="isShowMenu" class="menu__container">
                <div v-if="selectedMenu !== 'Мой профиль'" class="menu-item">
                    <a @click="onMenuSelect('Мой профиль', 'myProfile')" href="#">Мой профиль</a>
                </div>
                <div v-if="selectedMenu !== 'Мои бронирования'" class="menu-item">
                    <a @click="onMenuSelect('Мои бронирования', 'myBooking')" href="#">Мои бронирования</a>
                </div>
                <div v-if="selectedMenu !== 'Бонусный счет'" class="menu-item">
                    <a @click="onMenuSelect('Бонусный счет', 'myBonus')" href="#">Бонусный счет</a>
                </div>
            </div>

        </div>
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

import {onMounted, ref, watch} from "vue";
import MyProfile from "@/features/lk/components/MyProfile.vue";
import MyBooking from "@/features/lk/components/MyBooking.vue";
import MyBonus from "@/features/lk/components/MyBonus.vue";
import {useRoute, useRouter} from "vue-router";
import Filter from "@/features/hotels/components/Filter.vue";
import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";

const activeTab = ref('myProfile')
const isShowMenu = ref(false)
const route = useRoute()
const selectedMenu = ref('Мой профиль')
const router = useRouter()


watch(route, (to) => {
    if(to.query.tab) {
        activeTab.value = to.query.tab as string
        if(to.query.tab === 'myBooking') {
            selectedMenu.value = 'Мои бронирования'
        } else if(to.query.tab === 'myProfile') {
            selectedMenu.value = 'Мой профиль'
        } else if(to.query.tab === 'myBonus') {
            selectedMenu.value = 'Бонусный счет'
        }
    }
}, {flush: 'pre', immediate: true, deep: true})

watch(activeTab, (t) => {
    router.push({name: 'lk', query: { tab: t }})
})

const onMenuSelect = (menuName, tab) => {
    selectedMenu.value = menuName;
    isShowMenu.value = false;
    activeTab.value = tab;

}

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

.menu {
    display: none;
    background-color: #fff;
    position: relative;
    width: 100%;
    padding-left: 2rem;
    padding-right: 2rem;
    border-bottom: 1px solid var(--el-border-color-light);

    @media (max-width: 768px) {
        display: block;
    }

    &__select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px 15px;
        background-color: #215C66;

        & span {
            text-decoration: none;
            transition: background-color 0.3s;
            font-family: Optima Cyr,serif;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            color: white;
        }

    }
}

@media (max-width: 768px) {
    :deep(.el-tabs__header) {
        display: none;
    }
}

.menu-item {
    border: 1px solid #939393;
    font-family: Optima Cyr,serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 30px;
    background-color: #939393;
}

.menu-item a {
    display: block;
    padding: 10px 15px;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s;
    background-color: #EEEAEA;
}

.menu-item a:hover, .menu-item.expanded a {
    background-color: #e9e9e9;
}
.arrow-icon--open {
    transform: rotate(90deg);
}

.menu__container {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 55;
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>