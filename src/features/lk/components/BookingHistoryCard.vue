<template>
    <div class="booking-history" :class="{ 'booking-history_open': isShowDetail }" @click="onShowDetail">

        <div class="booking-history__item_bold">
            Бронь № 1209483
        </div>

        <div class="booking-history__item_strong">
            Alean Family, г. Анапа
        </div>

        <div class="booking-history__item_small">
            12 июля, ср - 13 июля, чт
        </div>

        <div class="booking-history__item">
            <ArrowIcon :class="{ 'arrow-icon--open': isShowDetail }" />
        </div>

    </div>

    <div v-if="isShowDetail" class="booking-history__detail">
        <div class="booking-history__detail-item">
            <div class="booking-history__detail-item_title">
                Проживание
            </div>
            <div class="booking-history__detail-item_info">
                <el-descriptions title="Проживание" column="1" size="large">
                    <el-descriptions-item label="Номер">Standart 1-комнатный</el-descriptions-item>
                    <el-descriptions-item label="Даты">12 июля, ср - 13 июля, чт</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>

        <div class="booking-history__detail-item">
            <div class="booking-history__detail-item_title">
                Дополнительные услуги
            </div>
            <div class="booking-history__detail-item_info">
                <el-descriptions title="Дополнительные услуги" column="1" size="large">
                    <el-descriptions-item label="Единство тела и души">1 взрослый, 3 дня</el-descriptions-item>
                    <el-descriptions-item label="Единство тела и души">1 взрослый, 3 дня</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>

        <div class="booking-history__detail-item">
            <div class="booking-history__detail-item_title">
                Проверить данные гостей
            </div>
            <div class="booking-history__detail-item_info">
                <el-descriptions title="Дополнительные услуги" column="1" size="large">
                    <el-descriptions-item label="Единство тела и души">1 взрослый, 3 дня</el-descriptions-item>
                    <el-descriptions-item label="Единство тела и души">1 взрослый, 3 дня</el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";
import { ref } from "vue";

  const isShowDetail = ref(false)

  const onShowDetail = () => {
    isShowDetail.value = !isShowDetail.value
  }

</script>

<style scoped lang="scss">

.arrow-icon--open {
  transform: rotate(90deg);
}

.booking-history {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 30px 40px 30px 40px;
  border: 1px solid #EEEAEA;
  align-items: center;

  &_open {
    border-bottom: none;
  }

  &__item {
    &_bold {
      font-family: Geometria,serif;
      font-size: 22px;
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

.booking-history__detail {
  padding: 10px 40px 30px 40px;
  border: 1px solid #EEEAEA;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: none;

  &-item {
    &_title {
      font-family: Geometria,serif;
      font-size: 22px;
      font-weight: 700;
      line-height: 28px;
      text-align: left;
    }

    &_info {
      font-family: Optima Cyr,serif;
      font-size: 22px;
      font-weight: 400;
      line-height: 30px;
      text-align: left;
    }
  }
}

</style>