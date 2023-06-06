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
        <IconPhoneGold/>
        <span class="phone-link_text">+7 (888) 999 33-11</span>
      </a>

      <div class="login">
        <button class="authorization">Зарегистрироваться</button>
        <button class="btn">
          <IconPersonGold/>
          <span class="btn_text">Войти в личный кабинет</span>
        </button>
      </div>
    </div>
  </header>
</template>
  
<script setup lang="ts">
  import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
  import IconPersonGold from '@/components/icons/IconPersonGold.vue'
  import IconPhoneGold from '@/components/icons/IconPhoneGold.vue'
</script>
  
<style scoped>
  .header {
    font-size: 16px;
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
      margin-right: 26px;
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
      margin-right: 18px;
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