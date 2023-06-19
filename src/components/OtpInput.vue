<template>
    <div ref="otpCont">
      <input
        type="text"
        class="digit-box"
        v-for="(el, ind) in digits"
        :key="el+ind"
        v-model="digits[ind]"
        :autofocus="ind === 0"
        maxlength="1"
        @keydown="handleKeyDown($event, ind)"
      >
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, reactive, watch } from 'vue';
  
    const props = defineProps({
      default: String,
  
      digitCount: {
        type: Number,
        required: true
      },

      modelValue: String
    });
  
    const digits = reactive<any>([])
  
    if (props.default && props.default.length === props.digitCount) {
      for (let i =0; i < props.digitCount; i++) {
        digits[i] = props.default.charAt(i)
      }
    } else {
      for (let i =0; i < props.digitCount; i++) {
        digits[i] = null;
      }
    }
  
    const otpCont = ref<any>(null)
  
  
    const emit = defineEmits(['update:modelValue']);
  
    const isDigitsFull = function () {
      for (const elem of digits) {
        if (elem == null || elem == undefined) {
          return false;
        }
      }
  
      return true;
    }
  
    const handleKeyDown = function (event: any, index: number) {
      if (event.key !== "Tab" && 
          event.key !== "ArrowRight" &&
          event.key !== "ArrowLeft"
      ) {
        event.preventDefault();
      }
      
      if (event.key === "Backspace") {
        digits[index] = null;
        
        if (index != 0) {
          (otpCont.value.children)[index-1].focus();
        } 
  
        return;
      }
  
      if ((new RegExp('^([0-9])$')).test(event.key)) {
        digits[index] = event.key;
  
        if (index != props.digitCount - 1) {
          (otpCont.value.children)[index+1].focus();
        }
  
        if (isDigitsFull()) {
          emit('update:modelValue', digits.join(''))
        }
      }
    }

    watch(() => props.modelValue, (newValue) => {
    if (!newValue) {
        for (let i = 0; i < digits.length; i++) {
        digits[i] = null;
        }
    }
    });
  
  </script>
  
  <style scoped>
  .digit-box {
      height: 4rem;
      width: 100%;
      border: 2px solid black;
      display: inline-block;
      border-radius: none;
      border: 0;
      border-bottom: 1px solid black;
      margin: 5px;
      padding: 10px;
      font-size: 2rem;
      text-align: center;
  }
  .digit-box:focus {
    outline: 3px solid black;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
  
    100% {
      transform: scale(1.1);
    }
  }
  </style>