<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from 'vue';
import Modal from '@/components/Modal.vue'
import { initFlowbite } from 'flowbite'
import client from '@/api/client';
import { useAuthStore } from '@/stores/auth-store';
import { $vfm } from 'vue-final-modal';
import { vMaska } from "maska"
import OtpInput from '@/components/OtpInput.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'
import { toast } from 'vue3-toastify';

  const phone = ref('')
  const email = ref('')
  const code = ref('')
  const authWay = ref<'phone' | 'email'>('phone')
  const currentStep = ref<'code' | 'verification'>('code')
  const buttonText = ref('Отправить код повторно');
  const timer = ref(0);
  let intervalId = -1;
  const isLoading = ref(false)
  const authStore = useAuthStore()
  const OTP_CODE_LENGTH = 4;

 

  onMounted(() => {
    initFlowbite();
  });

  onUnmounted(() => {
      clearInterval(intervalId);
  });

  watch(code, (newCode) => {
    if(newCode.length === OTP_CODE_LENGTH) {
        onVerificationCode();
    }
  });

  const onSendCode = async () => {

    if(authWay.value === 'phone') {
        await onTryAuth(() => client.post('/users/phone-auth/', { phone: phone.value }));
    } else {
        await onTryAuth(() => client.post('/users/email-auth/', { email: email.value }));
    }

    timer.value = 60;
      buttonText.value = `Отправить код повторно через ${timer.value} сек`;

      intervalId = setInterval(() => {
        timer.value--;
        buttonText.value = `Отправить код повторно через ${timer.value} сек`;

        if(timer.value === 0) {
          clearInterval(intervalId);
          buttonText.value = 'Отправить код повторно';
        }
      }, 1000);

  }


  const onVerificationCode = async () => {

    if(authWay.value === 'phone') {
        await onAuthVerification(() => client.patch('/users/phone-auth/', { phone: phone.value, code: Number(code.value) }));
    } else {
        await onAuthVerification(() => client.patch('/users/email-auth/', { email: email.value, code: Number(code.value) }));
    }

  }

  const onTryAuth = async (callback: () => Promise<any>) => {
    isLoading.value = true;
    try {
            const response = await callback();
            verificationStep();
            console.log(response);
    } catch(e) {
            console.log(e)
    } finally {
        isLoading.value = false;
    }
  }

  const onAuthVerification = async (callback: () => Promise<any>) => {
    try {
            const response = await callback();
            authStore.setAuthUser(response.data.user_data);

            localStorage.setItem("user_data", JSON.stringify(response.data.user_data));
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
            showSuccessVerification();
            await $vfm.hideAll();
        } catch(e: any) {
            if(e.response.status === 400) {
                showErrorVerification();
                code.value = '';
            }
            else {
                showMaxAttemptsError();
                await $vfm.hideAll();
            }
        }
  }

  const onResendCode = () => {

    if(timer.value > 0) {
      return;
    }

    
    if(authWay.value === 'phone') {
        onTryAuth(() => client.post('/users/phone-auth/', { phone: phone.value }));
    } else {
        onTryAuth(() => client.post('/users/email-auth/', { email: email.value }));
    }
  }


  const showErrorVerification = () => {
    toast('Вы ввели неверный код', {
        type: 'error',
        position: 'top-center',
    })
  }

  const showSuccessVerification = () => {
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

  const onChangeAuthWay = (way: 'phone' | 'email') => {
    authWay.value = way;
  }




</script>

<template>
    <Modal>
      <template v-slot:title>
        Войти в личный кабинет
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
                <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button @click="onChangeAuthWay('phone')" class="inline-block p-4 border-b-2 rounded-t-lg" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Телефон</button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button @click="onChangeAuthWay('email')" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Email</button>
                    </li>
                </ul>
                </div>
                <div id="myTabContent">
                    <div class="hidden rounded-lg bg-gray-50 dark:bg-gray-800" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <Input v-model="phone" v-maska data-maska="+7 ### ###-##-##" placeholder="Телефон" />
                    </div>
                    <div class="hidden rounded-lg bg-gray-50 dark:bg-gray-800" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                        <Input v-model="email" placeholder="Email" />
                    </div>
                </div>

                <div class="authentication-form__submit">
                    <Button :loading="isLoading" @click="onSendCode">Получить код</Button>
                </div>
            </template>
            <template v-else>

                <OtpInput class="otp-code" :digit-count="OTP_CODE_LENGTH" v-model="code" />
                    <div class="authentication-form__submit">
                        <Button :loading="isLoading" @click="onResendCode">{{ buttonText }}</Button>
                    </div>
            </template>

            
        </div>
            
        

        <div class="authentication-form__note">
            <span>Нажав "Получить код" вы соглашаетесь с условиями <span class="underline cursor-pointer">Пользовательского соглашения</span></span>
        </div>

    </div>

    </Modal>

</template>
<style scoped>
.authentication-form 
{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.authentication-form__title {
    font-size: 1.5rem;
}
.authentication-form__submit {
    width: 70%;
    margin-top: 1rem;
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
</style>