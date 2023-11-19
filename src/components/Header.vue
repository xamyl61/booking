<template>
  <header class="header">
    <div class="container mx-auto">
      
      
      <a v-if="currentRoute === 'lk'" href="#" class="back" @click="onHome">
          <IconArrowLeft/>
          <p class="back_text">Вернуться назад</p>
      </a>
      <a v-else href="#" class="back">
          <IconArrowLeft/>
          <a class="back_text" :href="returnUrl">Вернуться на сайт</a>
      </a>

      <div class="call">
        <Button>Перезвоните мне</Button>
      </div>



      <a class="phone-link" href="tel:+78889993311">
        <IconPhone/>
        <span class="phone-link_text">+7 (888) 999 33-11</span>
      </a>

      <div class="login">
        <div class="dropdown" v-if="authStore.isAuthenticated">

            <Button @click="router.push({name: 'lk', query: { tab: 'myProfile' }})" class="btn">
                <slot name="icon">
                    <IconPersonPrimary/>
                </slot>
                <span class="btn-text">{{displayName}}</span>
            </Button>
                <div class="dropdown-menu">
                    <a @click="router.push({name: 'lk', query: { tab: 'myProfile' }})" href="#">Мой профиль</a>
                    <a @click="router.push({name: 'lk', query: { tab: 'myBooking' }})" href="#">Мои бронирования</a>
                    <a @click="router.push({name: 'lk', query: { tab: 'myBonus' }})" href="#">Бонусный счет</a>
                    <a @click="onLogout" href="#">Выйти</a>
                </div>
        </div>
        <div v-else>
            <Button :disabled="authStore.isLoading" @click="onLogin">
                <slot name="icon">
                    <IconPersonPrimary/>
                </slot>
                <span class="btn-text">Войти в личный кабинет</span>
            </button>
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
  import {useRoute, useRouter} from "vue-router";
  import {removeTokens} from "@/utils/token";
  import {computed, onMounted, ref} from "vue";

  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  const returnUrl = ref("")

  const currentRoute = computed(() => {
    return route.name
  })

  const onHome = () => {
    router.push({name: 'home'})
  }

  const onLogin = () => {
  
    $vfm.show({component: AuthenticationForm})

  }

  const displayName = computed(() => {

    if(!authStore.user?.last_name) {
      return 'Личный кабинет'
    }

    return authStore.user?.last_name + ' ' + authStore.user?.first_name
  })

  const onLogout = () => {
    authStore.$reset()
    removeTokens()

    if(route.meta.requiresAuth) {
      router.push({name: 'home'})
    }
  }

  onMounted(() => {
    if (localStorage.getItem("return_url") != null) {
      returnUrl.value = <string>localStorage.getItem("return_url")
    }
  })

</script>
  
<style scoped lang="scss">
  .header {
    font-size: 1rem;
  }
  .header .container {
    padding: 1.3rem;
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
  .phone-link i {
    margin-right: 1.1rem;
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


  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    top: 17px;
    left: 0;
    border: 1px solid #215c66;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    width: 100%;
    background-color: #EEEAEA;
    font-size: 14px;
    z-index: 888;
    padding-top: 1.1rem;
  }

  .dropdown-menu a {
    display: block;
    padding: 10px 20px;
    color: #333;
    border-bottom: 1px solid #215c66;

    &:last-of-type {
      border-radius: 10px;
      border-bottom: none;
    }

  }

  .dropdown-menu a:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .btn {
    z-index: 999;
  }
</style>