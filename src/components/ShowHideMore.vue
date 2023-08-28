<template>
  <div :class="maxAmenityItems > 2 ? 'hide-list' : ''">
    <div :class="showAmenity && maxAmenityItems > 2 ? 'show-all' : ''">
        <slot></slot>
        <div>
          {{ props.amenity?.arrival_service_sub_categories.title }}
        </div>
        <button
          v-if="maxAmenityItems > 2"
          @click="showAmenity=!showAmenity"
        >
          <b>{{ showAmenity ? 'Свернуть' : 'Подробнее' }}</b>
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    const maxAmenityItems = ref(0)
    const showAmenity = ref(false)


    const props = defineProps({
      amenity: Object,
    })

    onMounted(() => {
      const calcMaxAmenityItems = () => {
        const getMaxCount = props.amenity?.arrival_service_sub_categories.map(function(amenityItem: any) {
            return amenityItem.arrival_service_items.length
        })
        
        return Math.max(...getMaxCount)
      }
      maxAmenityItems.value = calcMaxAmenityItems()
    })

</script>

<style>
  .hide-list .list-block-grid {
    height: 7.9rem;
    overflow: hidden;
  }
  .show-all .list-block-grid {
    height: auto;
    overflow: auto;
  }
</style>