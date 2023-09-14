<template>
  <div class="booking-card">

      <div class="booking-header">
          <div class="booking-header__title">
              Бронь № 1209483
          </div>
          <div class="booking-header__actions">
              <el-button round type="info" size="default">Аннулировать бронь</el-button>
              <el-button round type="info" size="default">Редактировать бронь</el-button>
              <el-button round type="info" size="default">Поменять категорию номера</el-button>
          </div>
      </div>

      <div class="booking-body">
        <div class="booking-body__title">
            Alean Family, г. Анапа
        </div>
        <div class="booking-body__info">
            <el-descriptions title="Проживание" column="1" size="large">
                <el-descriptions-item label="Номер">Standart 1-комнатный</el-descriptions-item>
                <el-descriptions-item label="Даты">12 июля, ср - 13 июля, чт</el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="Дополнительные услуги" column="1" size="large">
                <el-descriptions-item label="Единство тела и души">1 взрослый, 3 дня</el-descriptions-item>
                <el-descriptions-item label="Единство тела и души">1 взрослый, 3 дня</el-descriptions-item>
            </el-descriptions>
        </div>

          <div class="booking-body__check">
              <span>Проверить данные гостей <ArrowIcon /></span>
          </div>
      </div>


  </div>
</template>

<script setup lang="ts">

import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";
</script>

<style scoped lang="scss">

.booking-card {
  padding: 30px 40px 30px 40px;
  border: 1px solid #EEEAEA;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-family: Geometria, sans-serif;
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    text-align: left;
  }

  &__actions {


    :deep(.el-button) {
      background-color: #EEEAEA;
      border-color: #EEEAEA;
      color: black;
    }
  }
}

.booking-body {

  &__info {
    display: flex;
    gap: 5rem;
    margin-top: 1rem;
  }

  &__check {
    font-family: 'Geometria', sans-serif;
    color: #202020;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    text-decoration: underline;

    & span {
      display: flex;
      align-items: center;
    }
  }

  :deep(.el-descriptions__title) {
    font-family: Optima Cyr, serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
    text-align: left;
  }

  :deep(.el-descriptions__label) {
    font-family: 'Geometria', sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    color: #939393;
  }

  :deep(.el-descriptions__content) {
    font-family: 'Geometria', sans-serif;
    font-weight: 700;
    font-size: 15px;
    line-height: 20px;
    color: #202020;
  }
}

</style>