<script setup lang="ts">
    import { ref, type PropType, onMounted } from 'vue';

    import plural from 'plural-ru';

    import type {IBookingReservationList} from "@/features/booking/types/IBookingReservationList";

    import IconTrash from '@/components/icons/IconTrash.vue';
    import IconCloseCircle from '@/components/icons/IconCloseCircle.vue';

    const activeNames = ref(['11', '22'])
    const nights = ref(0)

    const props = defineProps({
        reseravationList: {
            type: Object as PropType<IBookingReservationList>,
            required: true
        }
    })

    const pluralNightText = (count: number) => {
        return plural(count, 'ночь', 'ночи', 'ночей');
    }

    const parseDate = (date: Date) => {
        let month = date.toLocaleString("default", { month: "long" });
        let day = date.toLocaleString("default", { day: "numeric" });
        let formattedDate = day  + " " + month;

        return formattedDate
    }


    onMounted(() => {
        nights.value = ((new Date(props.reseravationList.dateTill)).getTime() - (new Date(props.reseravationList.dateFrom)).getTime())/(1000 * 3600 * 24)
    })


</script>

<template>
    <div class="demo-collapse">
        <el-collapse :class="'m-collapse'" v-model="activeNames">
            <el-collapse-item name="11">
                <template #title>
                    <div class="">
                        <div class="room-title">Номер 1</div>
                        <IconTrash/>
                    </div>
                </template>
                <div>
                    <div><b>{{ nights }} {{ pluralNightText(nights) }}</b></div>
                    <div>{{ parseDate(new Date(reseravationList.dateFrom)) }} - {{ parseDate(new Date(reseravationList.dateTill)) }}</div>
                    <div class="py-2"><b>Номер</b></div>
                    <div>{{ reseravationList.roomTitle }}</div>
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








