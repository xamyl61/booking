<template>
  <header class="header">
    <div class="container mx-auto">
      <a href="#" class="back">
          <IconArrowLeft/>
          <p class="back_text">Вернуться на сайт</p>
      </a>

      <div class="call">
        <button class="btn">Перезвоните мне</button>
      </div>

      <a class="phone-link" href="tel:+78889993311">
        <IconPhone/>
        <span class="phone-link_text">+7 (888) 999 33-11</span>
      </a>

      <div class="login">
        <div v-if="!authStore.authUser">
          <Button @click="onLogin">
            <slot name="icon">
              <IconPersonPrimary/>
              </slot>
            <span class="btn-text">Войти в личный кабинет</span>
        </button>
        </div>
        <div v-else>
          <Button @click="onLogout" class="btn">
            <span class="btn-text">Выйти</span>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
  
<script setup lang="ts">
  import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
  import IconPhone from '@/components/icons/IconPhone.vue'
  import AuthenticationForm from '@/features/authentication/components/AuthenticationForm.vue'
  import { useAuthStore } from '@/stores/auth-store';
  import { $vfm } from 'vue-final-modal';
  import IconPersonPrimary from '@/components/icons/IconPersonPrimary.vue'
  import Button from '@/components/Button.vue'

  const authStore = useAuthStore()

  const onLogin = () => {
  
    $vfm.show({component: AuthenticationForm})

  }

  const onLogout = () => {
    authStore.$reset()
    localStorage.clear();
  }

</script>
  
<style scoped>
  .header {
    font-size: 1rem;
    padding: 0 1.3rem;
  }
  .header .container {
    padding: 1.3rem 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-line);
  }

  .back {
    display: flex;
    align-items: center;
  }
    .back .icon {
      margin-right: 1.6rem;
    }
  
  .call {
    display: flex;
    align-items: center;
    margin-left: 9.3vw;
  }

  .phone-link {
    display: flex;
    align-items: center;
    margin-left: 2.6vw;
  }
    .icon-phone-gold {
      margin-right: 1rem;
    }

  .login {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
    .login .authorization {
      margin-right: 2.6vw;
      border-bottom: 1px solid #000;
      line-height: 1;
    }
    .login .authorization:hover {
      border-color: transparent;
    }
</style>