<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { ModalsContainer } from 'vue-final-modal'
import {onMounted, ref} from 'vue';
import useAuth from "@/features/authentication/composables/useAuth";

const isLoading = ref(false)
const auth = useAuth()

onMounted(async () => {
    await auth.init()
    isLoading.value = true
})


</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main v-if="isLoading">
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
