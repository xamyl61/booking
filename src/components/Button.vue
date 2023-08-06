<template>
    <button @click="handleClick" :class="{ btn: true, 'btn_disabled': disabled, 'btn_loading': loading }" class="btn">
        <span v-if="loading" class="spinner"></span>
        <slot name="icon"></slot>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
const handleClick = function (event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }

  emit('click', event)
}



</script>

<style scoped>
 .btn {
  display: flex;
  gap: 0.5rem;
    padding: 0 1.2rem;
    text-align: center;
    font-size: 1rem;
    display: inline-block;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: var(--color-primary);
    border-radius: 2.5rem;
    position: relative;
  }
  .btn:hover {
    background: #121326;
  }

  .btn_disabled {
    opacity: 0.5;
  }

  .btn_loading {
    opacity: 0.5;
  }
  .btn-grey {
    background-color: #939393;
  }

  .spinner {
    position: absolute;
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: text-bottom;
  border: .25em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner-border .75s linear infinite;
  animation: spinner-border .75s linear infinite;
}

@-webkit-keyframes spinner-border {
  to { -webkit-transform: rotate(360deg); }
}

@keyframes spinner-border {
  to { transform: rotate(360deg); }
}

</style>