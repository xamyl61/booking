<template>
  <header class="header">
    <div class="container ">
      <a href="#" class="back">
          <img class="back_icon" src="./../assets/icons/icon-arrow_left.svg" alt="">
          <p class="back_text">Вернуться на сайт</p>
      </a>

      <div class="call">
        <button class="btn">Перезвоните мне</button>
      </div>

      <a class="phone-link" href="tel:+78889993311">
        <img class="phone-link_icon" src="./../assets/icons/icon-phone_gold.svg" alt="">
        <span class="phone-link_text">+7 (888) 999 33-11</span>
      </a>

      <div class="login">
        <button class="authorization">Зарегистрироваться</button>
        <button class="btn">
          <img class="icon" src="./../assets/icons/icon-person_gold.svg" alt="">
          <span class="btn_text">Войти в личный кабинет</span>
        </button>
      </div>
    </div>
  </header>
</template>
  
<script setup lang="ts">
 
</script>
  
<style scoped>
  .header {
    padding: 0 20px;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }
  .container {
    padding: 20px 0;
    max-width: 1600px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-line);
  }

  /* back */
  .back {
    display: flex;
    align-items: center;
  }
    .back_icon {
      margin-right: 26px;
    }
  
  /* call */
  .call {
    display: flex;
    align-items: center;
    margin-left: 9.3vw;
  }

  /* phone-link */
  .phone-link {
    display: flex;
    align-items: center;
    margin-left: 2.6vw;
  }
    .phone-link_icon {
      margin-right: 18px;
    }

  /* login */
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