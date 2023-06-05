<template>
    <footer class="footer">
        <div class="container">
            <div class="left">
                <img class="footer_logo" src="./../assets/logo-alean-family.svg" alt="">
                <p class="footer_copy">	&#169; 2022 Alean Collection</p>
            </div>
            <div class="right">
                <a class="footer_link" href="#">Политика конфиденциальности</a>
                <a class="footer_link" href="#">Пользовательское соглашение</a>
            </div>
        </div>
    </footer>
</template>
  
<script setup lang="ts">

</script>
  
<style scoped>
footer {
    padding: 20px;
    background-color: #215C66; /* заменить на переменную */
    display: flex;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 16px;
}
    .footer_logo {
        margin-right: 2.6vw;
    }
    .footer_link {
        margin-left: 2.2vw;
    }
.container {
    max-width: 1600px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.left {
    display: flex;
    align-items: center;
}
.right {
    display: flex;
    align-items: center;
}
</style>