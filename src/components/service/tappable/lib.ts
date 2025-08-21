import { useTimeout } from '@/composables/useTimeout';
import { ref } from 'vue';

export interface Wave {
  x: number;
  y: number;
  date: number;
  pointerId: number;
}

export const RIPPLE_DELAY = 70;
export const WAVE_LIVE = 225;

export function useRipple() {
  const clicks = ref<Wave[]>([]);

  const pointerDelayTimers = new Map<number, ReturnType<typeof setTimeout>>();

  const clearClicks = useTimeout(() => (clicks.value = []), WAVE_LIVE);

  function addClick(x: number, y: number, pointerId: number) {
    const dateNow = Date.now();
    const filteredClicks = clicks.value.filter(
      (click) => click.date + WAVE_LIVE > dateNow
    );

    clicks.value = [
      ...filteredClicks,
      {
        x,
        y,
        date: dateNow,
        pointerId,
      },
    ];

    clearClicks.set();
    pointerDelayTimers.delete(pointerId);
  }

  const onPointerDown: (e: PointerEvent) => void = (e) => {
    const currentTarget = e.currentTarget as HTMLElement;
    const { top, left } = currentTarget.getBoundingClientRect();
    const x = e.clientX - (left ?? 0);
    const y = e.clientY - (top ?? 0);

    pointerDelayTimers.set(
      e.pointerId,
      setTimeout(() => addClick(x, y, e.pointerId), RIPPLE_DELAY)
    );
  };

  const onPointerCancel: (e: PointerEvent) => void = (e) => {
    const timer = pointerDelayTimers.get(e.pointerId);
    clearTimeout(timer);
    pointerDelayTimers.delete(e.pointerId);
  };

  return {
    clicks,
    onPointerDown,
    onPointerCancel,
  };
}
