<template>
  <Popper v-bind="props" withArrow :arrowProps="arrowProps" :class="classes">
    <Caption level="1">
      <slot />
    </Caption>
  </Popper>
</template>

<script setup lang="ts">
import { type Component, computed } from 'vue';
import Popper from '../popper/Popper.vue';
import { Caption } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import {
  Coords,
  MaybeElement,
  Middleware,
  Placement,
  ReferenceElement,
} from '@floating-ui/vue';
import { PlacementWithAuto } from '../popper/lib/types';

/**
 * The Tooltip component provides text labels that appear when the user hovers over, focuses on,
 * or touches an element. It's built on top of the Popper component for automatic positioning
 * relative to the target element. The tooltip supports light and dark modes for different visual
 * contexts and uses the Caption component for its content to ensure consistent typography.
 */

export interface TooltipProps {
  /** Defines the theme of the tooltip, affecting its background and text color. */
  mode?: 'light' | 'dark';
  /** Reference to the anchor element for precise positioning. */
  anchor: MaybeElement<ReferenceElement>;
  /** By default, the component will automatically choose the best placement */
  placement?: PlacementWithAuto;
  /** Offset along the main axis. */
  offsetByMainAxis?: number;
  /** Offset along the cross axis. */
  offsetByCrossAxis?: number;
  /** Whether to display an arrow pointing to the anchor element. */
  withArrow?: boolean;
  /** Sets the width to match the target element. */
  sameWidth?: boolean;
  /** An array of custom modifiers for Popper (should be memoized). */
  customMiddlewares?: Middleware[];
  /** Opt-in feature to automatically update Popper's position when the target element resizes. */
  autoUpdateOnTargetResize?: boolean;
  /** Defines the root element type of the Popper, allowing for semantic customization. */
  is?: string | Component;
  /** Optional custom component for the arrow icon, replacing the default. */
  arrowIcon?: Component;
  /** Configuration and customization options for the floating arrow component. */
  arrowProps?: {
    /** Optional distance from the target element, influencing the arrow's placement. */
    offset?: number;
    /** When true, the offset distance remains constant, regardless of the arrow's placement. */
    isStaticOffset?: boolean;
    /** Coordinates for the arrow, useful for precise positioning when the arrow is not directly adjacent to its target. */
    coords?: Coords;
    /** The preferred placement of the arrow relative to its target element. */
    placement?: Placement;
    /** A component for rendering the arrow icon, allowing for custom arrow designs. */
    icon?: Component;
    /** Optionally override the default arrow height. */
    height?: number;
    /** Optionally override the default arrow padding. */
    padding?: number;
    classes?: string[];
  };
}

const props = withDefaults(defineProps<TooltipProps>(), {
  mode: 'light',
  classes: () => [],
});

const platform = usePlatform();

const arrowProps = computed(() => ({
  ...props.arrowProps,
  class: ['arrow', ...((props.arrowProps?.classes as string[]) ?? [])],
}));

const classes = computed(() => ({
  tooltip: true,
  ['tooltip--ios']: platform === 'ios',
  ['tooltip--dark']: props.mode === 'dark',
}));
</script>

<style lang="scss">
.tooltip {
  padding: 10px;
  border-radius: 12px;
  color: var(--tgui-black);
  background: var(--tgui-white);
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.1);
}

.tooltip--dark {
  box-shadow: none;
  color: var(--tgui-white);
  background: var(--tooltip-background-dark);
}

.tooltip .arrow {
  color: var(--tgui-white);
}

.tooltip--dark .arrow {
  color: var(--tooltip-background-dark);
}

.tooltip--ios .tooltip--dark {
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
}
</style>
