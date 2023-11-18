<template>
    <div class="booking-history" :class="{ 'booking-history_open': isShowDetail }" @click="onShowDetail">

        <div class="booking-history__item_bold">
            Бронь № {{history.number_booking}}
        </div>

        <div class="booking-history__item_strong">
            {{history.hotel}}, г. {{history.city}}
        </div>

        <div class="booking-history__item_small">
            {{new Date(history.date_from).toLocaleDateString()}} - {{new Date(history.date_till).toLocaleDateString()}}
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
    <div class="price">{{history.room}}</div>
    </div>
    <div class="item">
    <div class="title">Тариф</div>
    <div class="price">{{history.room_rate}}</div>
    </div>
    <div class="item">
    <div class="title">Гости</div>
    <div class="price">{{guestSummary}}</div>
    </div>
                  </div>
            </el-col>
<!--            <el-col :span="14">-->
<!--                <div class="descriptions">-->
<!--                    <div class="descriptions__title">-->
<!--                      Дополнительные услуги-->
<!--                    </div>-->

<!--                    <div class="item">-->
<!--                      <div class="title">Единство тела и души</div>-->
<!--                      <div class="price">1 взрослый, 3 дня</div>-->
<!--                    </div>-->
<!--                    <div class="item">-->
<!--                      <div class="title">Единство тела и души</div>-->
<!--                      <div class="price">1 взрослый, 3 дня</div>-->
<!--                    </div>-->

<!--                  </div>-->
<!--            </el-col>-->
        </el-row>


        <div class="booking-history__check" @click="onShowGuests">
            <span>Данные гостей <ArrowIcon :class="{ 'booking-guests_open': isShowGuests }" /></span>
        </div>
        <div v-if="isShowGuests" class="booking-history_guests">

            <div v-for="(guest, idx) in history.guests">
                <div class="booking-history__guest-title">Гость {{idx+1}}</div>

                <div class="grid grid-cols-3 gap-5">

                    <el-form-item prop="last_name">
                        <el-input readonly placeholder="Фамилия" :model-value="guest.last_name" />
                    </el-form-item>
                    <el-form-item prop="first_name">
                        <el-input readonly placeholder="Имя" :model-value="guest.first_name" />
                    </el-form-item>
                    <el-form-item prop="middle_name">
                        <el-input readonly placeholder="Отчество" :model-value="guest.middle_name" />
                    </el-form-item>
                    <el-form-item prop="birthdate">
                        <el-date-picker
                            readonly
                            style="width: 100%"
                            type="date"
                            placeholder="Дата рождения"
                            :model-value="guest.birthday"
                            format="DD.MM.YYYY"
                            class="birth-date-picker"
                            :clearable="false"
                        />
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-model="guest.phone" readonly v-maska data-maska="+7 ### ###-##-##" placeholder="Телефон" />
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="guest.email" readonly placeholder="Email" />
                    </el-form-item>

                </div>
            </div>

        </div>

        <el-row>
            <el-col>
                <el-descriptions column="1" size="large">
                    <el-descriptions-item label="Итоговая сумма"><span class="price">{{Format.formatCurrency(history.total_price)}}</span></el-descriptions-item>
                </el-descriptions>
            </el-col>
        </el-row>


    </div>
</template>

<script setup lang="ts">
import ArrowIcon from "@/features/lk/components/Icons/ArrowIcon.vue";
import {computed, ref} from "vue";
import type {PropType} from "vue";

import type {IHistoryBooking} from "@/features/lk/types/IHistoryBooking";
import {Format} from "@/utils/format";

  const props = defineProps({
      history: {
          type: Object as PropType<IHistoryBooking>,
          required: true
      }
  })


    const groupGuestsByAge = (guests) => {
        const adults = [];
        const children = [];
        const currentDate = new Date();

        guests.forEach(guest => {
            const birthDate = new Date(guest.birthday);
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDifference = currentDate.getMonth() - birthDate.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
                age--;
            }

            if (age >= 18) {
                adults.push(guest);
            } else {
                children.push(guest);
            }
        });

        return { adults, children };
    }


  const guestSummary = computed(() => {
      return getGuestsCountSummary(props.history?.guests)
  })

const getGuestsCountSummary = (guests) => {
    const { adults, children } = groupGuestsByAge(guests);
    let summary = "";

    if (adults.length > 0) {
        summary += `${adults.length} взросл${adults.length === 1 ? 'ый' : 'ых'}`;
    }

    if (children.length > 0) {
        if (summary.length > 0) {
            summary += ', ';
        }
        summary += `${children.length} ребен${children.length === 1 ? 'ок' : 'ка'}`;
    }

    return summary || 'Нет гостей';
}


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

  &__guest-title {
      font-family: Geometria, sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 25px;
      text-align: left;
      padding-bottom: 1rem;
  }

  &:last-child {
      margin-bottom: 0;
  }

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
  align-items: center;
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