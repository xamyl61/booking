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
                        <el-input v-model="form.last_name" placeholder="Фамилия" />
                    </el-form-item>
                    <el-form-item prop="first_name">
                        <el-input v-model="form.first_name" placeholder="Имя" />
                    </el-form-item>
                    <el-form-item prop="middle_name">
                        <el-input v-model="form.middle_name" placeholder="Отчество" />
                    </el-form-item>
                    <el-form-item prop="birthdate">
                        <el-input v-model="form.birthdate" placeholder="Дата рождения" />
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input v-maska data-maska="+7 ### ###-##-##" v-model="form.phone" placeholder="Телефон" />
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="form.email" placeholder="Email" />
                    </el-form-item>

                </div>
            </el-form>

            <div class="my-profile__submit">
                <Button @click="submitForm(ruleFormRef)">Сохранить</Button>
            </div>
        </div>


        <LkHeader>
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
        </div>

    </div>


</template>

<script setup lang="ts">
import LkHeader from "@/features/lk/components/LkHeader.vue";
import BirdIcon from "@/features/lk/components/Icons/BirdIcon.vue";
import {onMounted, reactive, ref} from "vue";
import client from "@/api/client";
import { vMaska } from "maska"
import {getAccessToken} from "@/utils/token";
import type {IUser} from "@/features/authentication/types/IUser";
import Button from "@/components/Button.vue";
import {updateUser} from "@/features/lk/api";
import {toast} from "vue3-toastify";
import ShellIcon from "@/features/lk/components/Icons/ShellIcon.vue";

const isLoading = ref(false)

interface RuleForm {
    first_name: string,
    last_name: string,
    middle_name: string,
    phone: string,
    email: string,
    birthdate: Date
}

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
    ],
    email: [
        { required: true, message: 'Необходимо ввести Email', trigger: 'blur' },
    ],
    birthdate: [
        { required: true, message: 'Необходимо ввести Дату рождения', trigger: 'blur' },
    ],
})

const ruleFormRef = ref()
let form = ref<IUser>({
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    email: '',
    birthdate: new Date(),
})

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
        await updateUser(form.value)
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


const initForm = async () => {

    isLoading.value = true

    try {
        const token = getAccessToken()

        const { data } = await client.get<IUser>('/users/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        form.value = {
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            phone: data.phone,
            email: data.email,
            birthdate: data.birthdate
        }
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
</style>