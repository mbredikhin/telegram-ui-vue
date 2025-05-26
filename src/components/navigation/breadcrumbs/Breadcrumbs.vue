<template>
  <div class="breadcrumbs">
    <template v-for="(vnode, index) in slotNodes" :key="index">
      <component :is="vnode" />
      <div v-if="index < slotNodes.length - 1" class="divider">
        <DotIcon v-if="props.divider === 'dot'" />
        <SlashIcon v-if="props.divider === 'slash'" />
        <Chevron16Icon v-if="props.divider === 'chevron'" class="chevron" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, VNode } from 'vue';
import DotIcon from './icons/dot.svg';
import SlashIcon from './icons/slash.svg';
import Chevron16Icon from '@/icons/16/chevron.svg';

export interface BreadcrumbsProps {
  /** Type of divider to use between breadcrumb items. */
  divider?: 'dot' | 'slash' | 'chevron';
}

const props = withDefaults(defineProps<BreadcrumbsProps>(), { divider: 'dot' });

const slots = defineSlots<{
  /** Content of the breadcrumbs. */
  default(): VNode[];
}>();

const slotNodes = computed(() => slots.default?.() ?? []);
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 20px;
  margin: 0 -6px;
  color: var(--tgui-divider);
}

.chevron {
  color: var(--tgui-link-color);
}
</style>
