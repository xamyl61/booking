<template>

    <div class="my-profile">

        <LkHeader>
            <template #title>
                Общая информация
            </template>
            <template #icon>
                <BirdIcon />
            </template>
        </LkHeader>

        <div class="my-profile__content">

            <el-form
                :model="form"
                :rules="rules"
                v-loading="isLoading"
                ref="ruleFormRef"
            >
                <div class="grid grid-cols-3 gap-10">

                    <el-form-item prop="last_name">
                        <el-input v-model="form.last_name" placeholder="Фамилия" :suffix-icon="EditIcon" />
                    </el-form-item>
                    <el-form-item prop="first_name">
                        <el-input v-model="form.first_name" placeholder="Имя" :suffix-icon="EditIcon" />
                    </el-form-item>
                    <el-form-item prop="middle_name">
                        <el-input v-model="form.middle_name" placeholder="Отчество" :suffix-icon="EditIcon" />
                    </el-form-item>
                    <el-form-item prop="birthdate">
                        <el-date-picker
                          v-model="form.birthdate"
                          type="date"
                          placeholder="Дата рождения"
                          format="DD.MM.YYYY"
                          class="birth-date-picker"
                          :clearable="false"
                          :prefix-icon="EditIcon"
                        />
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-maska data-maska="+7 ### ###-##-##" v-model="form.phone" :suffix-icon="EditIcon" placeholder="Телефон" />
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="form.email" placeholder="Email" :suffix-icon="EditIcon" />
                    </el-form-item>

                </div>
            </el-form>

            <div class="my-profile__submit">
                <Button v-if="isFormChanged" @click="submitForm(ruleFormRef)">Сохранить</Button>
            </div>
        </div>


        <!--<LkHeader>
            <template #title>
                Мои предпочтения
            </template>
            <template #icon>
                <ShellIcon />
            </template>
        </LkHeader>


        <div class="my-profile__content">
            <div class="my-profile__title">
                Временно не доступно
            </div>
        </div>-->

    </div>


</template>

<script setup lang="ts">
import LkHeader from "@/features/lk/components/LkHeader.vue";
import BirdIcon from "@/features/lk/components/Icons/BirdIcon.vue";
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import client from "@/api/client";
import { vMaska } from "maska"
import {getAccessToken} from "@/utils/token";
import type {IUser} from "@/features/authentication/types/IUser";
import Button from "@/components/Button.vue";
import {updateUser} from "@/features/lk/api";
import {toast} from "vue3-toastify";
import ShellIcon from "@/features/lk/components/Icons/ShellIcon.vue";
import EditIcon from "@/features/lk/components/Icons/EditIcon.vue";
import {dayjs} from "element-plus";

const isLoading = ref(false)

const rules = reactive<any>({
    first_name: [
        { required: true, message: 'Необходимо ввести Имя', trigger: 'blur' },
    ],
    last_name: [
        { required: true, message: 'Необходимо ввести Фамилию', trigger: 'blur' },
    ],
    middle_name: [
        { required: true, message: 'Необходимо ввести Отчество', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: 'Необходимо ввести Телефон', trigger: 'blur' },
        { pattern: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, message: 'Неверный формат Телефона', trigger: ['blur', 'change'] }
    ],
    email: [
        { required: true, message: 'Необходимо ввести Email', trigger: 'blur' },
        { type: 'email', message: 'Неверный формат Email', trigger: ['blur', 'change']}
    ],
    birthdate: [
        { required: true, message: 'Необходимо ввести Дату рождения', trigger: 'blur' },
    ],
})

const ruleFormRef = ref()
const isFormChanged = ref(false);
let form = ref<IUser>({
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    email: '',
    birthdate: '',
})

const initialForm = ref<IUser>({ ...form.value });

watchEffect(() => {
    isFormChanged.value = JSON.stringify(form.value) !== JSON.stringify(initialForm.value);
});


onMounted(() => {
    initForm()
})


const submitForm = async (formEl: any) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            await updateUserProfile()
        }
    })
}

const updateUserProfile = async () => {
    isLoading.value = true
    try {
        await updateUser({
            ...form.value,
            birthdate: dayjs(form.value.birthdate).format('YYYY-MM-DD')
        })
        toast('Сохранено', {
            type: 'success',
            position: 'top-center',
        })
    } catch (e) {
        toast('Ошибка', {
            type: 'error',
            position: 'top-center',
        })
    } finally {
        isLoading.value = false
    }
}

function reformatPhoneNumber(number) {
    const cleanNumber = number.replace(/\D/g, ''); // удаляем все не-цифровые символы

    return (
        "+" + cleanNumber.substring(0, 1) + " " +
        cleanNumber.substring(1, 4) + " " +
        cleanNumber.substring(4, 7) + "-" +
        cleanNumber.substring(7, 9) + "-" +
        cleanNumber.substring(9, 11)
    );
}

const initForm = async () => {

    isLoading.value = true

    try {
        const token = getAccessToken()

        const { data } = await client.get<IUser>('/v1/users/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const tmp = {
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            phone: reformatPhoneNumber(data.phone),
            email: data.email,
            birthdate: data.birthdate
        };

        form.value = {...tmp}
        initialForm.value = {...tmp}


    } catch (e) {

    } finally {
        isLoading.value = false
    }



}

</script>

<style scoped lang="scss">
.my-profile {
  padding-top: 50px;

  &__content {
      padding: 3rem 5rem 2rem 5rem;
  }

  &__submit {
      display: flex;
      justify-content: left;
      margin-top: 1.5rem;
  }

  &__title {
      font-family: Geometria, sans-serif;
      font-size: 20px;
      font-weight: 400;
      line-height: 25px;
      text-align: left;
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