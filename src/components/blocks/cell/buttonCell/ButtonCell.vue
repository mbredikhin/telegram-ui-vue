<template>
  <Tappable :is="props.is" v-bind="attrs" :class="classes">
    <slot name="before" />
    <Typography v-if="hasSlotContent(slots.default)">
      <slot />
    </Typography>
    <slot name="after" />
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable, TappableProps } from '@/components/service';
import { Typography } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { hasSlotContent } from '@/helpers/vue';
import { type Component, computed, useAttrs, VNode } from 'vue';

/**
 * Renders an interactive cell component with optional leading and trailing elements. Designed to be flexible,
 * supporting various content structures and interaction models within UI designs.
 */

type Attrs = Omit<TappableProps, 'is'>;

export interface ButtonCellProps extends /* @vue-ignore */ Attrs {
  /** Determines the button cell's visual theme, influencing color and style. */
  mode?: 'default' | 'destructive';
  /** Specifies the root element type for more semantic HTML structure or integration with navigation libraries. */
  is?: Component | string;
}

const props = withDefaults(defineProps<ButtonCellProps>(), {
  mode: 'default',
  is: 'button',
});

const slots = defineSlots<{
  /** Element or component displayed before the main content, adding visual context or functionality. */
  before?: () => VNode[];
  /** Element or component displayed after the main content, typically indicating a possible action or outcome. */
  after?: () => VNode[];
  /** The content within the button cell, usually text. */
  default?: () => VNode[];
}>();

const platform = usePlatform();
const attrs: Attrs = useAttrs();

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
