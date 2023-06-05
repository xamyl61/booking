<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>

  <Footer />
</template>

<style>
main {
  display:flex; 
  flex-direction:column;
  min-height: calc(100vh - 100px); 
  padding: 1rem 0;
}

/* variables */
:root {
  --color-primary: #215C66;
  --color-line: #EAEAEA;
}

/* btn */
.btn {
  padding: 0 20px;
  text-align: center;
  font-size: 16px;
  display: inline-block;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: var(--color-primary);
  border-radius: 40px;
}
  .btn .icon {
    margin-right: 19px;
  }
</style>
