<template>
  <div class="booking-room">
    <div class="booking-room__top">
      <div class="booking-room__info">
        <div class="booking-room__number">
            <span>{{ room.hotel_title }}</span>
        </div>

        <el-descriptions :column="2" size="large">
          <el-descriptions-item label="Номер">{{ room.title }}</el-descriptions-item>
          <el-descriptions-item label="Даты">{{ dateFormat(new Date(room.date_from)) }} &nbsp; - &nbsp; {{ dateFormat(new Date(room.date_till)) }} <br> <span class="font-normal">{{room.checkout_hours}}</span></el-descriptions-item>
        </el-descriptions>

        <div class="booking-room__check" >
            <span @click="showGuestInfo = !showGuestInfo">Проверить данные гостей</span>
        </div>
      </div>

      <div class="booking-room__photo">
        <img :src="room.cover_image.full_url" alt="">
        <!-- <img src="https://via.placeholder.com/400x200" alt="room photo"> -->
      </div>
    </div>
    <!-- {{ showGuestInfo }} -->
    <div v-if="showGuestInfo" class="mt-10 xl:w-9/12">
      <div v-for="(guest, index) in room.guests">
        <!-- index - {{ index }} -->

        <!-- {{ guest }} -->

        <!-- form: {{ bookingFormStore.bookingForm }}
        <br>
        index: {{ index }} -->

        <div class="my-4">
            <b class="text-sm">
                Гость {{ index + 1 }}.
                <span v-if="room.number_of_children && index + 1 == room.guests.length">Ребенок</span>
                <span v-else>Взрослый</span>
            </b>
        </div>

        <el-form
            class="custom-form"
            ref="formRefs"
            :model="bookingFormStore.bookingForm[bookingIndex].guests[index]"
        >
            <el-form-item
                prop="last_name"
                :rules="[
                    {
                        required: true,
                        message: 'Введите, пожалуйста, свою фамилию',
                        trigger: ['blur', 'change'],
                    }
                ]"    
            >
                
                <el-input 
                    disabled
                    v-model="bookingFormStore.bookingForm[bookingIndex].guests[index].last_name"
                    placeholder="Фамилия"
                    v-maska
                    data-maska="A"
                    data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple"
                />

            </el-form-item>
            <el-form-item
                prop="first_name"
                :rules="[
                    {
                        required: true,
                        message: 'Введите, пожалуйста, свое имя',
                        trigger: ['blur', 'change'],
                    }
                ]"    
            >
                <el-input
                    disabled
                    v-model="bookingFormStore.bookingForm[bookingIndex].guests[index].first_name"
                    placeholder="Имя"
                    v-maska
                    data-maska="A"
                    data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple"
                />
            </el-form-item>
            <el-form-item
                prop="middle_name"
                :rules="[
                    {
                        required: true,
                        message: 'Введите, пожалуйста, свою отчество',
                        trigger: ['blur', 'change'],
                    }
                ]"    
            >
                
                <el-input 
                    disabled
                    v-model="bookingFormStore.bookingForm[bookingIndex].guests[index].middle_name"
                    placeholder="Отчество"
                    v-maska
                    data-maska="A"
                    data-maska-tokens="A:[а-яА-Яa-zA-Z]:multiple"
                />
            </el-form-item>
            

            <el-form-item
                prop="birthday"
                :rules="[
                    {
                        required: true,
                        message: 'Введите дату рождения',
                        trigger: ['blur', 'change'],
                    },
                ]"
            >
                <el-date-picker
                    disabled
                    v-model="bookingFormStore.bookingForm[bookingIndex].guests[index].birthday"
                    type="date"
                    label="Pick a date"
                    placeholder="Дата рождения"
                    style="width: 100%"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                />
            </el-form-item>

            <el-form-item
                prop="email"
                :rules="[
                    {
                        required: true,
                        type: 'email',
                        message: 'E-mail должен быть в формате xxx@domain.zz Пожалуйста, введите корректный e-mail',
                        trigger: ['blur', 'change'],
                    },
                ]"    
            >
                <el-input
                    disabled
                    v-model="bookingFormStore.bookingForm[bookingIndex].guests[index].email"
                    placeholder="_____@__"
          
                />
            </el-form-item>

            <el-form-item
                prop="phone"
                :rules="[
                    {
                        required: true,
                        min: 16,
                        max: 16,
                        message: 'Номер телефона с кодом города состоит из 11 цифр. Пожалуйста, введите корректный номер',
                        trigger: ['blur', 'change'],
                    },
                ]"    
            >
                <el-input
                    disabled
                    v-model="bookingFormStore.bookingForm[bookingIndex].guests[index].phone"
                    v-maska
                    data-maska="+7 ### ###-##-##"
                    placeholder="+7 ___ ___ __ __"
                />
            </el-form-item>

        </el-form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

import type {IBookingRoom} from "@/features/booking/types/IBookingRoom";
import {ref, type PropType} from "vue";
import {Format} from "@/utils/format";
import { vMaska } from "maska"

import BookingAddGuestData from "@/features/booking/components/BookingAddGuestData.vue";
import { useBookingFormStore } from '@/stores/booking-form-store';
import IconCheckSuccess from '@/components/icons/IconCheckSuccess.vue'

const bookingFormStore = useBookingFormStore()

const showGuestInfo = ref<Boolean>(false)

const props = defineProps({
  room: {
    type: Object as PropType<IBookingRoom>,
    required: true
  },
  bookingIndex: {
    type: Number,
    required: true
  }
})

const dateFormat = (date: Date) => {
    let month = date.toLocaleString("default", { month: "long" });
    let day = date.toLocaleString("default", { day: "numeric" });
    let weekday = date.toLocaleString("default", { weekday: "short" });
    let formattedDate = day  + " " + month + " " + ", " + weekday;

    return formattedDate
}

</script>

<style scoped lang="scss">
.booking-room {
  padding: 1rem;
  border: 1px solid #EEEAEA;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__info {
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 1rem;
    @media (max-width: 1024px) {
      width: auto;
    }
  }

  &__number {
    font-family: "Optima Cyr", serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__check {
    font-family: 'Geometria', sans-serif;
    color: #202020;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    text-decoration: underline;
  }

  &__photo {
    width: 400px;
    height: 190px;
    @media (max-width: 1024px) {
      display: none;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
  :deep(.el-descriptions__table tr) {
    @media (max-width: 1024px) {
      display: flex;
    }
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  :deep(.el-descriptions__cell) {
    @media (max-width: 1024px) {
      display: flex;
    }
  }
  :deep(.el-descriptions__cell:first-child) {
    @media (max-width: 1024px) {
      padding-right: 1rem;
    }
  }
}
</style>