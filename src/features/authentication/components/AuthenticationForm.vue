<script setup lang="ts">
import {computed, onMounted, onUnmounted, reactive, ref, watch} from 'vue';
import {initFlowbite} from 'flowbite'
import client from '@/api/client';
import OtpInput from '@/components/OtpInput.vue'
import Button from '@/components/Button.vue'
import {toast} from 'vue3-toastify';
import type ElDrawer from "element-plus";
import IconClose from "@/components/icons/IconClose.vue";
import {vMaska} from "maska"
import useAuth from "@/features/authentication/composables/useAuth";
import {setAccessToken, setRefreshToken} from "@/utils/token";
import VOtpInput from "vue3-otp-input";

const code = ref('')
const currentStep = ref<'code' | 'verification'>('code')
const buttonText = ref('Отправить код повторно');
const timer = ref(0);
let intervalId: ReturnType<typeof setInterval>;
const isLoading = ref(false)
const auth = useAuth()
const OTP_CODE_LENGTH = 4;
const drawerRef = ref<any>()
const otpRef = ref()

const activeTab = ref('phone')

onMounted(() => {
    initFlowbite();
});

onUnmounted(() => {
    clearInterval(intervalId);
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

const onSendCode = async (phoneRef, emailRef) => {


    if (activeTab.value === 'phone') {
        await phoneRef.validate(async (valid, _) => {
            if (valid) {
                await onTryAuth(() => client.post('/v1/users/phone-auth/', {phone: phoneForm.value.phone}));
            }
        })

    }
    else
    {
        await emailRef.validate(async (valid, _) => {
            if (valid) {
                await onTryAuth(() => client.post('/v1/users/email-auth/', {email: emailForm.value.email}));
            }
        })
    }

    timer.value = 60;
    buttonText.value = `Отправить код повторно через ${timer.value} сек`;

    intervalId = setInterval(() => {
        timer.value--;
        buttonText.value = `Отправить код повторно через ${timer.value} сек`;

        if (timer.value === 0) {
            clearInterval(intervalId);
            buttonText.value = 'Отправить код повторно';
        }
    }, 1000);

}


const onVerificationCode = async () => {

    if (activeTab.value === 'phone') {
        await onAuthVerification(() => client.patch('/v1/users/phone-auth/', {
            phone: phoneForm.value.phone,
            code: Number(code.value)
        }));
    } else {
        await onAuthVerification(() => client.patch('/v1/users/email-auth/', {
            email: emailForm.value.email,
            code: Number(code.value)
        }));
    }

}

const onTryAuth = async (callback: () => Promise<any>) => {
    isLoading.value = true;
    try {
        const response = await callback();
        verificationStep();
    } catch (e) {
        console.log(e)
    } finally {
        isLoading.value = false;
    }
}

const onAuthVerification = async (callback: () => Promise<any>) => {
    try {
        const response = await callback();

        setAccessToken(response.data.access_token);
        setRefreshToken(response.data.refresh_token);

        await auth.init();

        await showSuccessVerification();
    } catch (e: any) {
        if (e.response.status === 400) {
            showErrorVerification();
            otpRef.value.clearInput();
        } else {
            showMaxAttemptsError();
            await closeForm()
        }
    }
}

const onResendCode = () => {

    if (timer.value > 0) {
        return;
    }

    if (activeTab.value === 'phone') {
        onTryAuth(() => client.post('/v1/users/phone-auth/', {phone: phoneForm.value.phone}));
    } else {
        onTryAuth(() => client.post('/v1/users/email-auth/', {email: emailForm.value.email}));
    }
}


const showErrorVerification = () => {
    toast('Вы ввели неверный код', {
        type: 'error',
        position: 'top-center',
    })
}

const showSuccessVerification = async () => {
    await closeForm()
    toast('Вы успешно вошли в личный кабинет', {
        type: 'success',
        position: 'top-center',
    })
}


const showMaxAttemptsError = () => {
    toast('Вы превысили лимит попыток ввода кода', {
        type: 'error',
        position: 'top-center',
    })
}


const verificationStep = () => {
    currentStep.value = 'verification';
}


let phoneForm = ref({
    phone: '',
})

let emailForm = ref({
    email: '',
})

const phoneRules = reactive({
    phone: [
        { required: true, message: 'Необходимо ввести Телефон', trigger: 'blur' },
        { pattern: /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/, message: 'Неверный формат Телефона', trigger: ['blur'] }
    ]
})

const emailRules = reactive({
    email: [
        { required: true, message: 'Необходимо ввести Email', trigger: 'blur' },
        { type: 'email', message: 'Неверный формат Email', trigger: ['blur', 'change']}
    ],
})
const emailFormRef = ref()
const phoneFormRef = ref()

</script>

<template>
    <el-drawer :size="DrawerSize" :show-close="false" ref="drawerRef">

        <template v-slot:header="{close}">
            <div>
                Войти в личный кабинет
            </div>
            <IconClose class="icon-close" @click="close" />
        </template>

        <div class="authentication-form">

            <div class="authentication-form__title">
            <span v-if="currentStep === 'code'">
                Введите ваш номер телефона или Email для авторизации в личном кабинете
            </span>
                <span v-else>
                Введите полученный код
            </span>
            </div>

            <div class="authenctication-form__content">

                <template v-if="currentStep === 'code'">

                    <el-tabs v-model="activeTab" class="login-tabs">
                        <el-tab-pane label="По телефону" name="phone">

                            <el-form
                                :model="phoneForm"
                                :rules="phoneRules"
                                v-loading="isLoading"
                                ref="phoneFormRef"
                            >
                                <el-form-item prop="phone">
                                    <el-input v-maska data-maska="+7 ### ###-##-##" v-model="phoneForm.phone" placeholder="Телефон" />
                                </el-form-item>
                            </el-form>

                        </el-tab-pane>
                        <el-tab-pane label="По E-mail" name="email">
                            <el-form
                                :model="emailForm"
                                :rules="emailRules"
                                v-loading="isLoading"
                                ref="emailFormRef"
                            >
                                <el-form-item prop="email">
                                    <el-input v-model="emailForm.email" placeholder="E-mail" />
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>

                    <div class="authentication-form__submit">
                        <Button :loading="isLoading" @click="onSendCode(phoneFormRef, emailFormRef)">Получить код</Button>
                    </div>
                </template>
                <template v-else>

                    <v-otp-input
                        ref="otpRef"
                        @on-complete="onVerificationCode"
                        v-model:value="code"
                        input-classes="otp-input"
                        separator="-"
                        :num-inputs="4"
                        :should-auto-focus="true"
                        input-type="letter-numeric"
                        :conditionalClass="['one', 'two', 'three', 'four']"
                    />

                    <div class="authentication-form__submit">
                        <Button :loading="isLoading" @click="onResendCode">{{ buttonText }}</Button>
                    </div>
                </template>


            </div>


            <div class="authentication-form__note">
                <span>Нажав "Получить код" вы соглашаетесь с условиями <span class="underline cursor-pointer">Пользовательского соглашения</span></span>
            </div>

        </div>

    </el-drawer>

</template>
<style lang="scss">

.otp-input {
    width: 40px;
    height: 40px;
    padding: 5px;
    margin: 0 10px;
    font-size: 20px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}
.otp-input.is-complete {
    background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

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

.authentication-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 1rem;
}

.authentication-form__title {
    font-family: 'Optima Cyr';
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.authentication-form__submit {
    margin-top: 1.5rem;
}

.authentication-form__note {
    margin-top: 1rem;
    color: gray;
    font-size: 14px;
}

.otp-code {
    display: flex;
    width: 50%;
}

.login-tabs .el-tabs__header {
    display: flex;
}

.login-tabs .el-tabs__nav-wrap {
    padding: 0 1rem 0 1rem;
}

.login-tabs .el-tabs__active-bar {
    background-color: grey;
}

.login-tabs .el-tabs__item {
    color: #939393;
}
.login-tabs .is-active {
    color: #121326;
}

.el-input__wrapper {
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    border-radius: 0;
    box-shadow: none;
}
</style>