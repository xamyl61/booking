<template>
  <div class="header">
          <div class="header__title">
              <slot name="title"></slot>
          </div>
          <div class="header__icon">
              <slot name="icon"></slot>
          </div>
      </div>

</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.header {
  height: 100px;
  width: 100%;
  background-color: #EEEAEA;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5rem;
  padding-right: 5rem;

  &__title {
    font-family: Optima Cyr, serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
    text-align: left;

  }
}
</style>