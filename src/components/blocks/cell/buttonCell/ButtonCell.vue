<template>
  <Tappable :is="props.is" :class="classes">
    <slot name="before" />
    <Typography v-if="slots.default?.()">
      <slot />
    </Typography>
    <slot name="after" />
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { Typography } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { Component, computed } from 'vue';

/**
 * Renders an interactive cell component with optional leading and trailing elements. Designed to be flexible,
 * supporting various content structures and interaction models within UI designs.
 */

export interface ButtonCellProps {
  /** Determines the button cell's visual theme, influencing color and style. */
  mode?: 'default' | 'destructive';
  /** Specifies the root element type for more semantic HTML structure or integration with navigation libraries. */
  interactiveAnimation?: 'opacity' | 'background';
  is?: Component | string;
}

const props = withDefaults(defineProps<ButtonCellProps>(), {
  mode: 'default',
  interactiveAnimation: 'background',
  is: 'button',
});

const slots = defineSlots<{
  /** Element or component displayed before the main content, adding visual context or functionality. */
  before(props?: unknown): unknown;
  /** Element or component displayed after the main content, typically indicating a possible action or outcome. */
  after(props?: unknown): unknown;
  /** The content within the button cell, usually text. */
  default(props?: unknown): unknown;
}>();

const platform = usePlatform();

const classes = computed(() => ({
  ['button-cell']: true,
  ['button-cell--destructive']: props.mode === 'destructive',
  ['button-cell--ios']: platform === 'ios',
}));
</script>

<style lang="scss" scoped>
.button-cell {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  height: 48px;
  padding: 10px 24px;
  color: var(--tgui-link-color);
  border: none;
  background: transparent;
}

.button-cell--destructive {
  color: var(--tgui-destructive-text-color);
}

.button-cell--ios {
  gap: 18px;
  height: 44px;
  padding: 8px 18px;
}
</style>
