<template>
  <Chip v-bind="attrs" class="card-chip">
    <template v-for="(_, slot) of slots" #[slot]>
      <slot :name="slot" />
    </template>
  </Chip>
</template>

<script setup lang="ts">
import { Chip, ChipProps } from '@/components/form';
import { useAttrs } from 'vue';

export interface CardChipProps extends /* @vue-ignore */ ChipProps {}

defineProps<CardChipProps>();

const slots = defineSlots<{
  /** Content or component to be placed before the main text, typically an icon or avatar. */
  before(props?: unknown): unknown;
  /** Content or component to be placed after the main text, such as an icon indicating an action. */
  after(props?: unknown): unknown;
  /** The main text content of the chip. */
  default(props?: unknown): unknown;
}>();

const attrs: ChipProps = useAttrs();
</script>

<style lang="scss" scoped>
.card-chip {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
