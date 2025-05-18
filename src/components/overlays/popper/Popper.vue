<template>
  <RootRenderer>
    <component
      :is="props.is"
      v-if="anchor"
      ref="floating"
      class="popper"
      v-bind="attrs"
      :style="floatingStyles"
    >
      <FloatingArrow
        v-if="attrs.withArrow"
        ref="arrow"
        v-bind="arrowProps"
        :coords="middlewareData.arrow"
        :placement="resolvedPlacement"
        :icon="props.arrowIcon"
      />
      <slot />
    </component>
  </RootRenderer>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { type Component, useTemplateRef, useAttrs, computed } from 'vue';
import {
  autoUpdate,
  Coords,
  MaybeElement,
  Placement,
  ReferenceElement,
  useFloating,
} from '@floating-ui/vue';
import DefaultArrowIcon, {
  DEFAULT_ARROW_HEIGHT,
  DEFAULT_ARROW_PADDING,
} from './floatingArrow/icons/Arrow.vue';
import {
  useFloatingMiddlewares,
  UseFloatingMiddlewaresConfig,
} from './lib/useFloatingMiddlewares';
import { RootRenderer } from '@/components/service';
import FloatingArrow from './floatingArrow/FloatingArrow.vue';

/**
 * Renders a Popper component, leveraging floating UI for dynamic, responsive positioning.
 * Supports advanced configurations like virtual elements, custom arrows, and auto-position updates.
 */

export interface Attrs
  extends Omit<
    UseFloatingMiddlewaresConfig,
    'arrowHeight' | 'arrowPadding' | 'arrowRef'
  > {}

export interface PopperProps extends /* @vue-ignore */ Attrs {
  /** Reference to the anchor element for precise positioning. */
  anchor: MaybeElement<ReferenceElement>;
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

const props = withDefaults(defineProps<PopperProps>(), {
  is: 'div',
  autoUpdateOnTargetResize: false,
  arrowIcon: DefaultArrowIcon,
  arrowProps: undefined,
});

const floatingRef = useTemplateRef<HTMLElement | null>('floating');
const arrowRef = useTemplateRef<HTMLDivElement | null>('arrow');

const attrs = computed<Attrs>(() => ({
  placement: 'auto',
  offsetByMainAxis: 8,
  offsetByCrossAxis: 0,
  withArrow: true,
  customMiddlewares: undefined,
  ...useAttrs(),
}));

const { strictPlacement, middlewares } = useFloatingMiddlewares({
  placement: attrs.value.placement,
  sameWidth: attrs.value.sameWidth,
  withArrow: attrs.value.withArrow,
  arrowRef: arrowRef,
  arrowHeight: props.arrowProps?.height || DEFAULT_ARROW_HEIGHT,
  arrowPadding: props.arrowProps?.padding || DEFAULT_ARROW_PADDING,
  offsetByMainAxis: attrs.value.offsetByMainAxis,
  offsetByCrossAxis: attrs.value.offsetByCrossAxis,
  customMiddlewares: attrs.value.customMiddlewares,
});

const anchor = computed(() => props.anchor);

const {
  placement: resolvedPlacement,
  middlewareData,
  floatingStyles,
} = useFloating(anchor, floatingRef, {
  placement: strictPlacement,
  middleware: middlewares,
  whileElementsMounted: autoUpdate,
});
</script>

<style lang="scss" scoped>
.popper {
  z-index: var(--tgui-z-index-simple);
}
</style>
