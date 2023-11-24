<template>
    <footer class="footer mt-auto">
        <div class="container mx-auto">
            <div class="flex justify-between">
                <div class="left">
                    <IconLogoGold/>
                    <p class="footer_copy">	&#169; 2022 Alean Collection</p>
                </div>
                <div class="right">
                    <a class="footer_link" target="_blank" href="src/policy.pdf">Политика конфиденциальности</a>
                    <a class="footer_link" target="_blank" href="src/user_agreement.pdf">Пользовательское соглашение</a>
                </div>
            </div>
        </div>
    </footer>
</template>
  
<script setup lang="ts">
import IconLogoGold from '@/components/icons/IconLogoGold.vue'


</script>
  
<style scoped  lang="scss">

.footer {
    padding: 1.2rem;
    background: var(--color-primary);
    color: rgba(255, 255, 255, 0.5);
    font-size: 1rem;

    .container {
        & > div {
            @media (max-width: 768px) {
                flex-direction: column-reverse;
            }
        }
    }
}
    .footer_link {
        margin-left: 2.2vw;
    }
.left {
    display: flex;
    align-items: center;
}
    .left .icon-logo-gold {
        margin-right: 2.6vw;
    }
.right {
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
        flex-direction: column;
        align-items: start;
    }
    a {
        margin-bottom: 1rem; 
        @media (max-width: 767px) {

        }
    }
}
</style>