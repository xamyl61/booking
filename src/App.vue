<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
main {
  display:flex; 
  flex-direction:column;
  padding: 1rem 0;
}
</style>
