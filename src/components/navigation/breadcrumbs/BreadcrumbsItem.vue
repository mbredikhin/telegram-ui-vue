<template>
  <component :is="props.is" class="breadcrumbs-item">
    <Subheadline level="2" weight="2"><slot /></Subheadline>
  </component>
</template>

<script setup lang="ts">
import { Subheadline } from '@/components/typography';

export interface BreadcrumbsItemProps {
  is?: string;
}

const props = withDefaults(defineProps<BreadcrumbsItemProps>(), { is: 'div' });
</script>

<style lang="scss" scoped>
.breadcrumbs-item {
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.15s ease-out;
  color: var(--tgui-hint-color);

  &:active {
    opacity: 0.5;
  }
}

@media (hover: hover) and (pointer: fine) {
  .wrapper:hover {
    background: var(--tgui-tertiary-bg-color);
  }
}
</style>
