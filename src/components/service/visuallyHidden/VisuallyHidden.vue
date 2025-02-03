<template>
  <component :is="props.is" class="visually-hidden" />
</template>

<script setup lang="ts">
export interface VisuallyHiddenProps {
  is?: string;
}

const props = withDefaults(defineProps<VisuallyHiddenProps>(), { is: 'span' });
</script>

<style lang="scss" scoped>
.visually-hidden {
  position: absolute;
  block-size: 1px;
  inline-size: 1px;
  padding: 0;
  margin: -1px;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  overflow: hidden;
  border: 0;
  opacity: 0;
}
</style>
