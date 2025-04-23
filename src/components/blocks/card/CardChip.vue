<template>
  <Chip v-bind="props" class="card-chip">
    <template v-for="(_, slot) of slots" #[slot]>
      <slot :name="slot" />
    </template>
  </Chip>
</template>

<script setup lang="ts">
import { Chip } from '@/components/form';
import { Component } from 'vue';

export interface CardChipProps {
  /** Defines the visual style of the chip, affecting its background, border, and shadow. */
  mode?: 'elevated' | 'mono' | 'outline';
  /** Specifies the HTML tag or component used to render the Chip, defaulting to `div`. */
  is?: Component | string;
}

const props = withDefaults(defineProps<CardChipProps>(), {
  mode: 'elevated',
  is: 'div',
});

const slots = defineSlots<{
  /** Content or component to be placed before the main text, typically an icon or avatar. */
  before(props?: unknown): unknown;
  /** Content or component to be placed after the main text, such as an icon indicating an action. */
  after(props?: unknown): unknown;
  /** The main text content of the chip. */
  default(props?: unknown): unknown;
}>();
</script>

<style lang="scss" scoped>
.card-chip {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
