import {
  arrow,
  ArrowOptions,
  autoPlacement,
  flip,
  Middleware,
  offset,
  Placement,
  shift,
  size,
} from '@floating-ui/vue';
import { getAutoPlacementAlignment, isNotAutoPlacement } from './helpers';
import { computed } from 'vue';
import { PlacementWithAuto } from './types';

export interface UseFloatingMiddlewaresConfig {
  /** By default, the component will automatically choose the best placement */
  placement?: PlacementWithAuto;
  /** Offset along the main axis. */
  offsetByMainAxis?: number;
  /** Offset along the cross axis. */
  offsetByCrossAxis?: number;
  /** Ref for arrow element */
  arrowRef?: ArrowOptions['element'];
  /** Whether to display an arrow pointing to the anchor element. */
  withArrow?: boolean;
  /** The height of the arrow. This is added to `mainAxis` to prevent the arrow from overlapping the anchor element. */
  arrowHeight?: number;
  /** A safe zone around the arrow to prevent it from exceeding the content bounds. */
  arrowPadding?: number;
  /** Sets the width to match the target element. */
  sameWidth?: boolean;
  /** An array of custom modifiers for Popper (should be memoized). */
  customMiddlewares?: Middleware[];
}

export function useFloatingMiddlewares(props: UseFloatingMiddlewaresConfig) {
  const config = computed(() => ({
    placement: props.placement ?? 'bottom-start',
    arrowRef: props.arrowRef ?? null,
    withArrow: props.withArrow,
    arrowHeight: props.arrowHeight,
    arrowPadding: props.arrowPadding,
    sameWidth: props.sameWidth,
    offsetByMainAxis: props.offsetByMainAxis ?? 0,
    offsetByCrossAxis: props.offsetByCrossAxis ?? 0,
    customMiddlewares: props.customMiddlewares,
  }));

  const isNotAutoPlaced = computed(() =>
    isNotAutoPlacement(config.value.placement)
  );

  const middlewares = computed<Middleware[]>(() => [
    offset({
      crossAxis: config.value.offsetByCrossAxis,
      mainAxis:
        config.value.withArrow && config.value.arrowHeight
          ? config.value.offsetByMainAxis + config.value.arrowHeight
          : config.value.offsetByMainAxis,
    }),
    isNotAutoPlaced.value
      ? flip({
          fallbackAxisSideDirection: 'start',
        })
      : autoPlacement({
          alignment: getAutoPlacementAlignment(config.value.placement),
        }),
    shift(),
    ...(config.value.sameWidth
      ? [
          size({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          }),
        ]
      : []),
    ...(config.value.customMiddlewares ?? []),
    ...(config.value.withArrow
      ? [
          arrow({
            element: config.value.arrowRef,
            padding: config.value.arrowPadding,
          }),
        ]
      : []),
  ]);

  return {
    middlewares,
    strictPlacement: isNotAutoPlaced.value
      ? (config.value.placement as Placement)
      : undefined,
  };
}
