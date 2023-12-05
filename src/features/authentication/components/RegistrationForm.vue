<script setup lang="ts">
import {computed, onMounted, reactive, ref} from 'vue';
import type ElDrawer from "element-plus";
import IconClose from "@/components/icons/IconClose.vue";
import {IUser} from "@/features/authentication/types/IUser";
import { vMaska } from "maska"
import Button from "@/components/Button.vue";
import {registerUser} from "@/features/authentication/api";
import {toast} from "vue3-toastify";
import {dayjs} from "element-plus";

const drawerRef = ref<any>()
let form = ref<IUser>({
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    email: '',
    birthdate: '',
})
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

const checked = ref(false)

const submitForm = async (formEl: any) => {
    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        if (valid) {
            await register()
        }
    })
}

const register = async () => {

    if(checked.value === false) {
        toast('Необходимо принять пользовательское соглашение', {
            type: 'error',
            position: 'top-center',
        })
        return;
    }

    isLoading.value = true
    try {
        await registerUser({
            ...form.value,
            is_registered: true,
            birthdate: dayjs(form.value.birthdate).format('YYYY-MM-DD')
        } as any)
        toast('Регистрация прошла успешна', {
            type: 'success',
            position: 'top-center',
        })
        drawerRef.value?.close();
    } catch (e) {
        toast('Ошибка при попытке регистрации', {
            type: 'error',
            position: 'top-center',
        })
    } finally {
        isLoading.value = false
    }
}

const ruleFormRef = ref()

onMounted(() => {
});

const DrawerSize = computed(() => {

    if(isMobile()) {
        return '100%'
    } else if(isTablet()) {
        return '60%'
    } else {
        return '30%'
    }

})

const isTablet = () => {
    return screen.width < 1024;
}

const isMobile = () => {
    return screen.width < 768;
}

const closeForm = () => {
    return drawerRef.value?.close();
}



</script>

<template>
    <el-drawer :size="DrawerSize" :show-close="false" ref="drawerRef">

        <template v-slot:header="{close}">
            <div>
                Регистрация
            </div>
            <IconClose class="icon-close" @click="close" />
        </template>

        <div class="registration-form">

            <div class="registration-form__title">
              <span>
                  Регистрация в личном кабинете
              </span>

            </div>

            <div class="registration-form__note">
                Подробнее об условиях <a target="_blank" href="/pravila-programmi-loyalnosti.pdf" class="underline cursor-pointer">Программы лояльности</a>
            </div>

            <div class="registration-form__content">

                <div class="grid grid-cols-1 gap-3">

                    <el-form
                        :model="form"
                        :rules="rules"
                        v-loading="isLoading"
                        ref="ruleFormRef"
                    >
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
                            <el-date-picker
                                    v-model="form.birthdate"
                                    type="date"
                                    placeholder="Дата рождения"
                                    format="DD.MM.YYYY"
                                    class="birth-date-picker"
                                    :clearable="false"
                            />
                        </el-form-item>
                        <el-form-item prop="phone">
                            <el-input v-maska data-maska="+7 ### ###-##-##" v-model="form.phone" placeholder="Телефон" />
                        </el-form-item>
                        <el-form-item prop="email">
                            <el-input v-model="form.email" placeholder="Email" />
                        </el-form-item>

                    </el-form>

                    <el-checkbox v-model="checked" :disabled="isLoading" label="Я соглашаюсь с обработкой персональных данных" size="large" />

                    <div class="registration-form__submit">
                        <Button :disabled="isLoading" @click="submitForm(ruleFormRef)">Хочу быть участником</Button>
                    </div>

                </div>

            </div>

        </div>

    </el-drawer>

</template>
<style lang="scss">

.el-drawer__header {
  background-color: var(--color-primary);
  height: 100px;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  padding-top: 0;
  padding-left: 2rem;
}

.icon-close {
  cursor: pointer;
}

.registration-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;
}

.registration-form__title {
  font-family: 'Optima Cyr',serif;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.registration-form__submit {
    margin-top: 1rem;
    font-family: Geometria,serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
}

.registration-form__note {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #121326;
}

.birth-date-picker {
  width: 100% !important;
}

.registration-form .el-checkbox__label {
    font-family: Geometria,serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
    color: #121326;
}

.registration-form .el-checkbox.el-checkbox--large .el-checkbox__inner {
    width: 30px;
    height: 30px;
}

.registration-form .el-checkbox__inner::after {
    height: 22px;
    left: 9px;
    top: 0px;
    width: 9px;
}

.registration-form .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #121326;

}

.registration-form .btn {
    padding-left: 2rem;
    padding-right: 2rem;
}
</style>