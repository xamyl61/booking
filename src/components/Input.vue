<template>
    <input 
        :autocomplete="autocomplete" 
        type="text" 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        :placeholder="placeholder">
</template>

<script setup lang="ts">
import { defineProps } from 'vue'


const props = defineProps({
    autocomplete: {
        type: String,
        default: 'off'
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: String
})


</script>

<style scoped>
input {
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
}

input:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>

