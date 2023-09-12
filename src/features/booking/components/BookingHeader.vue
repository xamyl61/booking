<template>
    <div>

        <div>
            <el-steps :active="active" finish-status="success">
            <el-step title="Step 1"></el-step>
            <el-step title="Step 2"></el-step>
            <el-step title="Step 3"></el-step>
            </el-steps>

            <el-button style="margin-top: 12px;" @click="next">Next step</el-button>
        </div>

        <div class="header-line">
            <div class="container mx-auto flex justify-between ">
                <div class="left">Выбрать номер</div>
                <div class="center">Данные о гостях</div>
                <div class="left">Завершить бронирование</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const active = ref(1)

const next = () => {
    if (active.value++ > 2) {
        active.value = 0
    };
}

</script>
    
<style scoped>
    .header-line {
        background-color: var(--color-primary);
        color: #fff;
        padding: 1rem 0;
        font-size: 1.5rem;
        font-family: 'Optima Cyr';
    }
</style>