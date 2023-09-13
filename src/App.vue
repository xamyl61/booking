<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ModalsContainer } from 'vue-final-modal'
import { useAuthStore } from './stores/auth-store';
import { onMounted } from 'vue';

const authStore = useAuthStore()

const initStore = () => {
  const user_data = localStorage.getItem('user_data');

  if(!user_data) return;
  const user = JSON.parse(user_data)
  authStore.setAuthUser(user)
}

onMounted(() => {
  initStore()
})

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="">
      <RouterView />
      <modals-container></modals-container>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
main {
  display:flex; 
  flex-direction:column;
  padding: 0 0 1rem;
}

</style>
