import { Coords, Placement } from '@floating-ui/vue';
import { computed, ComputedRef, CSSProperties, UnwrapRef } from 'vue';

interface UseFloatingArrowConfig {
  placement: Placement;
  coords?: Partial<Coords>;
  offset?: number;
  isStaticOffset?: boolean;
}

type UseFloatingArrowResult = ComputedRef<{
  placement: undefined | 'right' | 'bottom' | 'left';
  styles: CSSProperties;
}>;

export function useFloatingArrow(
  props: UseFloatingArrowConfig
): UseFloatingArrowResult {
  const config = computed(() => ({
    placement: props.placement,
    coords: { x: 0, y: 0, ...props.coords } as Coords,
    offset: props.offset ?? 0,
    isStaticOffset: props.isStaticOffset ?? false,
  }));

  function withOffset(isVerticalPlacement: boolean) {
    const coords = {
      x: config.value.coords.x,
      y: config.value.coords.y,
    };

    const offset = config.value.isStaticOffset
      ? config.value.offset
      : coords[isVerticalPlacement ? 'y' : 'x'] + config.value.offset;

    return offset + 'px';
  }

  const arrowParams = computed<UnwrapRef<UseFloatingArrowResult>>(() => {
    if (config.value.placement.startsWith('top')) {
      return {
        placement: 'bottom',
        styles: {
          top: '100%',
          left: withOffset(false),
        },
      };
    }

    if (config.value.placement.startsWith('right')) {
      return {
        placement: 'left',
        styles: {
          top: withOffset(true),
          left: 0,
        },
      };
    }

    if (config.value.placement.startsWith('bottom')) {
      return {
        placement: undefined,
        styles: {
          bottom: '100%',
          left: withOffset(false),
        },
      };
    }

    return {
      placement: 'right',
      styles: {
        top: withOffset(true),
        right: 0,
      },
    };
  });

  return arrowParams;
}
