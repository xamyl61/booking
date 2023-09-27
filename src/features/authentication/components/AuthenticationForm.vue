<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch} from 'vue';
import {initFlowbite} from 'flowbite'
import client from '@/api/client';
import OtpInput from '@/components/OtpInput.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import {toast} from 'vue3-toastify';
import type ElDrawer from "element-plus";
import IconClose from "@/components/icons/IconClose.vue";
import {vMaska} from "maska"
import useAuth from "@/features/authentication/composables/useAuth";
import {setAccessToken, setRefreshToken} from "@/utils/token";

const phone = ref('')
const email = ref('')
const code = ref('')
const currentStep = ref<'code' | 'verification'>('code')
const buttonText = ref('Отправить код повторно');
const timer = ref(0);
let intervalId: ReturnType<typeof setInterval>;
const isLoading = ref(false)
const auth = useAuth()
const OTP_CODE_LENGTH = 4;
const drawerRef = ref<any>()

const activeTab = ref('phone')

onMounted(() => {
    initFlowbite();
});

onUnmounted(() => {
    clearInterval(intervalId);
});

watch(code, (newCode) => {
    if (newCode.length === OTP_CODE_LENGTH) {
        onVerificationCode();
    }
});

const closeForm = () => {
    return drawerRef.value?.close();
}

const onSendCode = async () => {


    if (activeTab.value === 'phone') {
        await onTryAuth(() => client.post('/users/phone-auth/', {phone: phone.value}));
    } else {
        await onTryAuth(() => client.post('/users/email-auth/', {email: email.value}));
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
        await onAuthVerification(() => client.patch('/users/phone-auth/', {
            phone: phone.value,
            code: Number(code.value)
        }));
    } else {
        await onAuthVerification(() => client.patch('/users/email-auth/', {
            email: email.value,
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
            code.value = '';
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
        onTryAuth(() => client.post('/users/phone-auth/', {phone: phone.value}));
    } else {
        onTryAuth(() => client.post('/users/email-auth/', {email: email.value}));
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

</script>

<template>
    <el-drawer :show-close="false" ref="drawerRef">

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
                            <Input v-model="phone" v-maska data-maska="+7 ### ###-##-##" placeholder="Телефон"/>
                        </el-tab-pane>
                        <el-tab-pane label="По E-mail" name="email">
                            <Input v-model="email" placeholder="Email"/>
                        </el-tab-pane>
                    </el-tabs>

                    <div class="authentication-form__submit">
                        <Button :loading="isLoading" @click="onSendCode">Получить код</Button>
                    </div>
                </template>
                <template v-else>
                    <OtpInput class="otp-code" :digit-count="OTP_CODE_LENGTH" v-model="code"/>
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
<style>

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
    width: 70%;
    margin-top: 2rem;
}

.authentication-form__note {
    margin-top: 2rem;
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
    color: grey;
}
</style>