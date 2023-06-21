<template>
   <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    :click-to-close="false"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-full mx-4 bg-white max-w-[700px]"
  >
    <span class="flex items-center pl-8 pr-8 h-[6rem] bg-teal-500 text-white uppercase justify-between">
      <slot name="title"></slot>
      <span class="cursor-pointer" @click="close">X</span>
    </span>
    <div class="flex-grow overflow-y-auto p-16 pt-8 pb-8">
      <slot :params="params"></slot>
    </div>
  </vue-final-modal>
</template>
  
<script lang="ts">
export default {
  inheritAttrs: false,
  emits: ['cancel', 'confirm']
}
</script>