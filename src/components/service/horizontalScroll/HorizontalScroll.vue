<template>
  <component :is="props.is" class="horizontal-scroll">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { type Component } from 'vue';

export interface HorizontalScrollProps {
  is?: Component | string | number;
}

const props = withDefaults(defineProps<HorizontalScrollProps>(), { is: 'div' });
</script>

<style lang="scss" scoped>
.horizontal-scroll {
  display: flex;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.horizontal-scroll__in::-webkit-scrollbar {
  display: none;
}
</style>
