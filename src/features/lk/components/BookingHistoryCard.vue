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

        <el-row>
            <el-col :span="3">
                <el-button type="info" size="default">Номер 1</el-button>
            </el-col>
        </el-row>


        <el-row>
            <el-col :span="10">
                <div class="descriptions">
                    <div class="descriptions__title">
                      Проживание
                    </div>

                    <div class="item">
    <div class="title">Номер</div>
    <div class="price">Standart 1-комнатный</div>
    </div>
    <div class="item">
    <div class="title">Тариф</div>
    <div class="price">“Ультра все включено”</div>
    </div>
    <div class="item">
    <div class="title">Гости</div>
    <div class="price">1 взрослый</div>
    </div>
                  </div>
            </el-col>
            <el-col :span="14">
                <div class="descriptions">
                    <div class="descriptions__title">
                      Дополнительные услуги
                    </div>

                    <div class="item">
                      <div class="title">Единство тела и души</div>
                      <div class="price">1 взрослый, 3 дня</div>
                    </div>
                    <div class="item">
                      <div class="title">Единство тела и души</div>
                      <div class="price">1 взрослый, 3 дня</div>
                    </div>

                  </div>
            </el-col>
        </el-row>


        <div class="booking-history__check" @click="onShowGuests">
            <span>Данные гостей <ArrowIcon :class="{ 'booking-guests_open': isShowGuests }" /></span>
        </div>
        <div v-if="isShowGuests" class="booking-history_guests">
            <div class="booking-history__guest-title">Гость 1. Взрослый</div>
            <p>Иванов Иван Иванович</p>
        </div>

        <el-row>
            <el-col>
                <el-descriptions column="1" size="large">
                    <el-descriptions-item label="Итоговая сумма"><span class="price">300 000 р.</span></el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>


    </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";
import { ref } from "vue";
import EditIcon from "@/features/lk/components/Icons/EditIcon.vue";

  const isShowDetail = ref(false)
  const isShowGuests = ref(false)

  const onShowDetail = () => {
    isShowDetail.value = !isShowDetail.value
  }

  const onShowGuests = () => {
      isShowGuests.value = !isShowGuests.value
  }

</script>

<style scoped lang="scss">

:deep(.el-button) {
    width: 100%;
    height: 50px;
    background-color: #215C66;
    border-color: #215C66;
    color: white;
    font-family: Optima Cyr,serif;
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    line-height: 30px;
    text-align: center;
    border-radius: 0;
}

.price {
    font-family: Optima Cyr,serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
}

.booking-guests_open {
    transform: rotate(90deg);
}

.booking-history__check {
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
  padding: 0 40px 30px 40px;
  border: 1px solid #EEEAEA;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: none;

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


.descriptions {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__title {
    font-family: Optima Cyr;
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;
  }
}

.item {
  display: flex;
  margin-bottom: 10px; /* Если вы хотите добавить отступ между строками */
  width:100%;
  
}

.title {
  max-width: 40%;
  flex: 1; /* Займет все доступное пространство, оставив место для .price */
  margin-right: 20px; /* Отступ между названием и ценой */
  font-family: Geometria;
font-size: 16px;
font-weight: 700;
line-height: 20px;
color: #939393;

}

.price {
  width: 60%;
  text-align: left;
  font-family: Geometria;
font-size: 16px;
font-weight: 700;
line-height: 20px;
}

</style>