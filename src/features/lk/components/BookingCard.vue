<template>
  <div class="booking-card">

      <div class="booking-header">
          <div class="booking-header__title">
              Бронь № 1209483
          </div>
          <div class="booking-header__actions">
              <el-button disabled round type="info" size="default">Аннулировать бронь</el-button>
              <el-button disabled round type="info" size="default">Редактировать бронь</el-button>
              <el-button disabled round type="info" size="default">Поменять категорию номера</el-button>
          </div>
      </div>

      <div class="booking-body">
        <div class="booking-body__title">
            Alean Family, г. Анапа
        </div>
        <div class="booking-body__info">
            <el-row :gutter="20">
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
  <div class="title">Даты</div>
  <div class="price">12 июля, ср - 13 июля, чт</div>
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
                <!--<el-col :span="14">

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
                </el-col>-->
            </el-row>

        </div>

          <div class="booking-body__check" @click="onShowGuests">
              <span>Проверить данные гостей <ArrowIcon :class="{ 'booking-guests_open': isShowGuests }" /></span>
          </div>
          <div v-if="isShowGuests" class="booking-body_guests">
              <div class="booking-body__guest-title">Гость 1. Взрослый</div>

              <div class="grid grid-cols-3 gap-10">

                  <el-form-item prop="last_name">
                      <el-input placeholder="Фамилия" :suffix-icon="EditIcon" />
                  </el-form-item>
                  <el-form-item prop="first_name">
                      <el-input placeholder="Имя" :suffix-icon="EditIcon" />
                  </el-form-item>
                  <el-form-item prop="middle_name">
                      <el-input placeholder="Отчество" :suffix-icon="EditIcon" />
                  </el-form-item>
                  <el-form-item prop="birthdate">
                      <el-date-picker
                              type="date"
                              placeholder="Дата рождения"
                              format="DD.MM.YYYY"
                              class="birth-date-picker"
                              :clearable="false"
                              :prefix-icon="EditIcon"
                      />
                  </el-form-item>
                  <el-form-item prop="phone">
                      <el-input v-maska data-maska="+7 ### ###-##-##" :suffix-icon="EditIcon" placeholder="Телефон" />
                  </el-form-item>
                  <el-form-item prop="email">
                      <el-input placeholder="Email" :suffix-icon="EditIcon" />
                  </el-form-item>

              </div>
          </div>

          <div class="booking-body__summary">
              <el-row :gutter="20">
                  <el-col :span="10">
                     

                    <div class="descriptions">
                    <div class="item">
                      <div class="title">Сумма</div>
                      <div class="price booking-card__price">127 000 р.</div>
                    </div>

                  </div>

                  </el-col>
                  <el-col :span="14">
                      <el-descriptions column="1" size="large">
                          <el-descriptions-item label="Сумма">
                      <span class="booking-card__price">
                        127 000 р.
                      </span>
                          </el-descriptions-item>
                      </el-descriptions>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="10">
                    <small class="discount-small">Скидка составила 15 000 р.</small>
                  </el-col>
                  <el-col :span="14">
                    <div class="descriptions">
                    <div class="item">
                      <div class="title">Внесена предоплата:</div>
                      <div class="price booking-card__price-small">127 000 р.</div>
                    </div>

                  </div>
                  </el-col>
              </el-row>

              <el-row :gutter="20">
                  <el-col class="summary" :span="10">
                    <div class="descriptions">
                    <div class="item">
                      <div class="title">Итого:</div>
                      <div class="price booking-card__price">127 000 р.</div>
                    </div>

                  </div>
                   
                  </el-col>
                  <el-col :span="14">
                    <div class="descriptions">
                    <div class="item">
                      <div class="title">Осталось к оплате:</div>
                      <div class="price booking-card__price-small">
                        <span>127 000 р.</span>
                      <el-button style="margin-left: 1rem;" class="pay" round type="info" size="default">Оплатить</el-button>

                      </div>
                    </div>

                  </div>
                  </el-col>
                  
              </el-row>
          </div>
      </div>


  </div>
</template>

<script setup lang="ts">

import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";
import {ref} from "vue";
import EditIcon from "@/features/lk/components/Icons/EditIcon.vue";

const isShowGuests = ref(false);

const onShowGuests = () => {
    isShowGuests.value = !isShowGuests.value
}
</script>

<style scoped lang="scss">

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
  align-items: center;
}

.title {
  max-width: 45%;
  flex: 1; /* Займет все доступное пространство, оставив место для .price */
  margin-right: 20px; /* Отступ между названием и ценой */
  font-family: Geometria;
font-size: 16px;
font-weight: 700;
line-height: 20px;
color: #939393;

}

.price {
  width: 57%;
  text-align: left;
  font-family: Geometria;
font-size: 16px;
font-weight: 700;
line-height: 20px;
}
.discount-small {
    font-family: Geometria,serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
}

.pay {
  background-color: #215C66;
  border-color: #215C66;
  color: white;
}

.summary {
  :deep(.el-descriptions__label) {
    font-family: Geometria,serif !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    line-height: 20px !important;
    color: #121326 !important;
  }
}

.booking-card {
  padding: 30px 40px 30px 40px;
  border: 1px solid #EEEAEA;

  &__price {
    font-family: Optima Cyr,serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;

    &-small {
      font-family: Optima Cyr,serif;
      font-weight: 400;
      line-height: 30px;
      text-align: left;
      font-size: 20px;
    }
  }
}

.booking-body__summary {
  padding-top: 1rem;
}

.booking-body__guest-title {
  font-family: Geometria, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 25px;
  text-align: left;
  padding-bottom: 1rem;
}

.booking-guests_open {
  transform: rotate(90deg);
}

.booking-body_guests {
  padding-top: 1rem;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.3rem;

  &__title {
    font-family: Geometria, sans-serif;
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
    text-align: left;
  }

  &__actions {


    :deep(.el-button) {
      background-color: #EEEAEA;
      border-color: #EEEAEA;
      color: black;

      &:hover {
        background-color: #215C66;
        border-color: #215C66;
        color: white;
      }
    }
  }
}

.booking-body {

  &__info {
    margin-top: 1rem;
  }

  &__title {
    font-family: Optima Cyr;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    letter-spacing: 0em;
    text-align: left;
  }

  &__check {
    font-family: 'Geometria', sans-serif;
    color: #202020;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    text-decoration: underline;
    margin-top: 1rem;
    margin-bottom: 1rem;

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

:deep(.el-input__wrapper) {
  border: none;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  border-radius: 0;
  box-shadow: none;
}

:deep(.el-input__icon) {
  margin-right: 0 !important;
}

:deep(.birth-date-picker) {
  width: 100%;
}

:deep(.birth-date-picker .el-input__wrapper) {
  display: flex;
  flex-direction: row-reverse;
}


</style>