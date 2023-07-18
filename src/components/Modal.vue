<template>
   <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    :click-to-close="false"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 bg-white max-w-[700px]"
  >
    <span class="flex items-center pl-8 pr-8 h-[6rem] text-white uppercase justify-between header">
      <slot name="title"></slot>
      <IconClose @click="close" class="icon-close" />
    </span>
    <div class="flex-grow overflow-y-auto p-8 pt-8 pb-8">
      <slot :params="params"></slot>
    </div>
  </vue-final-modal>
</template>
  
<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
</script>

<style scoped>
.header {
  background-color: #215c66;
  font-weight: 300;
}
.icon-close {
  cursor: pointer;
}
</style>