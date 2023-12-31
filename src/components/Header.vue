<template>
  <header class="header">
    <div class="container mx-auto">
      <a v-if="currentRoute === 'lk'" href="#" class="back" @click="onHome">
          <IconArrowLeft/>
          <p class="back_text">Вернуться назад</p>
      </a>
      <a v-else :href="returnUrl" class="back">
          <IconArrowLeft/>
          <span class="back_text" >Вернуться на сайт</span>
      </a>

      <div class="call">
        <Button>Перезвоните мне</Button>

        <a class="phone-link" href="tel:+78889993311">
          <IconPhone/>
          <span class="phone-link_text">+7 (888) 999 33-11</span>
        </a>
      </div>

      <div class="mobile-menu" >
        <IconMenu @click="menuOpen = true" v-if="!menuOpen"/>
        <IconCloseMenu @click="menuOpen = false" v-if="menuOpen"/>
      </div>

      <div class="login" :class="{ show: menuOpen }">
        <a class="phone-link" href="tel:+78889993311">
          <IconPhone/>
          <span class="phone-link_text">+7 (888) 999 33-11</span>
        </a>
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
        <div class="test" v-else>
            <a v-if="!authStore.isAuthenticated" @click="onRegister">Зарегистрироваться</a>
            <Button :disabled="authStore.isLoading" @click="onLogin">
                <slot name="icon">
                    <IconPersonPrimary/>
                </slot>
                <span class="btn-text">Войти в личный кабинет</span>
            </button>
        </div>
          <div v-if="authStore.isAuthenticated" class="mobile-lk" @click="onHideMenu">
            <div @click="router.push({name: 'lk', query: { tab: 'myProfile' }})" class="mobile-lk__item">
                Мой профиль
            </div>
              <div @click="router.push({name: 'lk', query: { tab: 'myBooking' }})" class="mobile-lk__item">
                  Мои бронирования
              </div>
              <div @click="router.push({name: 'lk', query: { tab: 'myBonus' }})" class="mobile-lk__item">
                  Бонусный счет
              </div>
              <div @click="onLogout" class="mobile-lk__item">
                  Выйти
              </div>
          </div>
      </div>
    </div>
  </header>
</template>
  
<script setup lang="ts">
  import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
  import IconCloseCircle from "@/components/icons/IconCloseCircle.vue";
  import IconMenu from '@/components/icons/IconMenu.vue'
  import IconPhone from '@/components/icons/IconPhone.vue'
  import IconCloseMenu from '@/components/icons/IconCloseMenu.vue'
  import AuthenticationForm from '@/features/authentication/components/AuthenticationForm.vue'
  import { useAuthStore } from '@/stores/auth-store';
  import { $vfm } from 'vue-final-modal';
  import IconPersonPrimary from '@/components/icons/IconPersonPrimary.vue'
  import Button from '@/components/Button.vue'
  import {useRoute, useRouter} from "vue-router";
  import {removeTokens} from "@/utils/token";
  import {computed, onMounted, ref} from "vue";
  import RegistrationForm from "@/features/authentication/components/RegistrationForm.vue";

  const authStore = useAuthStore()
  const route = useRoute()
  const router = useRouter()
  const menuOpen = ref(false)
  const returnUrl = ref("")

  const currentRoute = computed(() => {
    return route.name
  })

  const onHideMenu = () => {
      menuOpen.value = false
  }

  const onHome = () => {
    router.push({name: 'home'})
  }

  const onRegister = () => {
      menuOpen.value = false
      $vfm.show({component: RegistrationForm})
  }

  const onLogin = () => {
    menuOpen.value = false
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

  const getUrlParams = () => {
    return new URL(window.location.href)
}

  onMounted(() => {
    const urlSearch = getUrlParams()
    if (localStorage.getItem("return_url") != null) {
      returnUrl.value = <string>localStorage.getItem("return_url")
    } else {
      returnUrl.value = <string>urlSearch.searchParams.get('return_url')
    }
  })

</script>
  
<style scoped lang="scss">
  .header {
    font-size: 1rem;
    @media (max-width: 768px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .right {
      display: flex;
      justify-content: space-between;
    }
  }
  .header .container {
    padding: 1.3rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-line);
  }

  .back {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      &_text  {
        display: none;
      }
    }
  }
    .back .icon {
      margin-right: 1.6rem;
    }
  
  .call {
    display: flex;
    align-items: center;
    margin-left: -22%;
    @media (max-width: 1280px) {
      margin-left: 0;
    }
    @media (max-width: 767px) {
      margin-left: auto;
      margin-right: 16px;
    }
    .phone-link {
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  .phone-link {
    display: flex;
    align-items: center;
    margin-left: 2.6vw;
    i {
      margin-right: 1.1rem;
    }
  }

    .icon-phone-gold {
      margin-right: 1rem;
    }

  .login {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 1rem;

    @media (max-width: 1024px) {
      position: absolute;
      background: #fff;
      top: 82px;
      right: 0;
      margin: 0;
      z-index: 100;
      display: none;
      padding: 1.9rem;
      border: 1px solid #eee;
    }
    @media (max-width: 767px) {
      max-width: 100%;
      width: 100%;
    }
    &.show {
      display: flex;
    }
    .phone-link {
      display: none;
      @media (max-width: 1024px) {
        display: flex;
        margin-bottom: 20px;
      }
    }
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

    @media (max-width: 767px) {
      display: none;

    }
  }

  .btn {
    z-index: 999;
  }
  .mobile-menu {
    display: none;
    width: 30px;
    height: 30px;
    justify-content: flex-end;
    align-items: center;
    @media (max-width: 1024px) {
      display: flex;
    }
  }
  .close-menu {
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: none;
    @media (max-width: 1024px) {
      display: block;
    }
  }

  @media (max-width: 1024px) {
    .header .container {
      border-bottom: none;
    }
  }

  .mobile-lk {
    display: none;
    width: 80%;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    @media (max-width: 768px) {
      display: flex;
    }

    &__item {
      text-align: center;
      font-family: Geometria,serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 25px;
      border-bottom: 1px solid #215C66;
      cursor: pointer;
      padding-bottom: 0.8rem;

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .test {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 1024px) {
      flex-direction: column;
    }

    & a {
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>