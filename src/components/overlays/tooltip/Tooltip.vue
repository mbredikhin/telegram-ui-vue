<template>
  <Popper v-bind="attrs" withArrow :arrowProps="arrowProps" :class="classes">
    <Caption level="1">
      <slot />
    </Caption>
  </Popper>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import Popper, { PopperProps } from '../popper/Popper.vue';
import { Caption } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';

/**
 * The Tooltip component provides text labels that appear when the user hovers over, focuses on,
 * or touches an element. It's built on top of the Popper component for automatic positioning
 * relative to the target element. The tooltip supports light and dark modes for different visual
 * contexts and uses the Caption component for its content to ensure consistent typography.
 */

export interface TooltipProps extends /* @vue-ignore */ PopperProps {
  /** Defines the theme of the tooltip, affecting its background and text color. */
  mode?: 'light' | 'dark';
}

const props = withDefaults(defineProps<TooltipProps>(), {
  mode: 'light',
});

const platform = usePlatform();
// @ts-expect-error type Attrs satisfies the attrs key constraint
const attrs: PopperProps = useAttrs();

const arrowProps = computed(() => ({
  ...(attrs.arrowProps ?? {}),
  class: ['arrow', ...((attrs.arrowProps?.classes as string[]) ?? [])],
}));

const classes = computed(() => ({
  ['tgui-tooltip']: true,
  ['tgui-tooltip--ios']: platform === 'ios',
  ['tgui-tooltip--dark']: props.mode === 'dark',
}));
</script>

<style lang="scss">
.tgui-tooltip {
  padding: 10px;
  border-radius: 12px;
  color: var(--tgui-black);
  background: var(--tgui-white);
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);

  &--dark {
    box-shadow: none;
    color: var(--tgui-white);
    background: var(--tooltip-background-dark);
  }
}

.tgui-tooltip .arrow {
  color: var(--tgui-white);
}

.tgui-tooltip--dark .arrow {
  color: var(--tooltip-background-dark);
}

.tgui-tooltip--ios.tgui-tooltip--dark {
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
}
</style>
