<script setup lang="ts">
    import { ref } from 'vue';

    import IconTrash from '@/components/icons/IconTrash.vue';
    import IconCloseCircle from '@/components/icons/IconCloseCircle.vue';

    const activeNames = ref(['11', '22'])
</script>

<template>
    <div class="demo-collapse">
        <el-collapse :class="'m-collapse'" v-model="activeNames">
            <el-collapse-item name="11">
                <template #title>
                    <div class="">
                        <div class="room-title">Room 1</div>
                        <IconTrash/>
                    </div>
                </template>
                <div>
                    <div><b>17 ночей</b></div>
                    <div>1 марта - 18 марта</div>
                    <div class="py-2"><b>Номер</b></div>
                    <div>Standart plus 2-местный</div>
                    <div class="py-2"><b>Гости</b></div>
                    <div>1 взрослый на основном месте</div>
                    <div class="py-2"><b>Выбранные услуги</b></div>
                    <div class="room-service-list">
                        <div class="room-service-list-item flex items-center py-1">
                            <div class="room-service-list-icon "><IconCloseCircle/></div>
                            <div>Единство тела и души </div>
                            <div class="multiply">x2</div>
                        </div>
                        <div class="room-service-list-item flex items-center py-1">
                            <div class="room-service-list-icon "><IconCloseCircle/></div>
                            <div>Заряд бодрости </div>
                            <div class="multiply">x1</div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
            <el-collapse-item name="22">
                <template #title>
                    <div class="">
                        <div class="room-title">Room 2</div>
                        <IconTrash/>
                    </div>
                </template>
                <div>
                    <div><b>17 ночей</b></div>
                    <div>1 марта - 18 марта</div>
                    <div class="py-2"><b>Номер</b></div>
                    <div>Standart plus 2-местный</div>
                    <div class="py-2"><b>Гости</b></div>
                    <div>1 взрослый на основном месте</div>
                    <div class="py-2"><b>Выбранные услуги</b></div>
                    <div class="room-service-list">
                        <div class="room-service-list-item flex items-center py-1">
                            <div class="room-service-list-icon "><IconCloseCircle/></div>
                            <div>Единство тела и души </div>
                            <div class="multiply">x2</div>
                        </div>
                        <div class="room-service-list-item flex items-center py-1">
                            <div class="room-service-list-icon "><IconCloseCircle/></div>
                            <div>Заряд бодрости </div>
                            <div class="multiply">x1</div>
                        </div>
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>


<style scoped lang="scss">

.room-service-list-icon {
    width: 3rem;
}
.room-service-list-icon i {
    cursor: pointer;
}
.room-title {
    font-size: 1.1rem;
    font-family: 'Optima Cyr';
}
.room-service-list .multiply {
    margin-left: auto;
    color: var(--color-primary);
    font-weight: 700;
}

</style>








