import { RIPPLE_DELAY, useRipple, WAVE_LIVE } from '../lib';

describe('useRipple', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('starts with empty clicks', () => {
    const { clicks } = useRipple();

    expect(clicks.value).toEqual([]);
  });

  test('adds a click after RIPPLE_DELAY', () => {
    const { clicks, onPointerDown } = useRipple();

    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const event = new PointerEvent('pointerdown', {
      clientX: 10,
      clientY: 20,
      pointerId: 1,
    });
    Object.defineProperty(event, 'currentTarget', { value: el });

    onPointerDown(event);

    expect(clicks.value).toHaveLength(0);

    vi.advanceTimersByTime(RIPPLE_DELAY);

    expect(clicks.value).toHaveLength(1);
    expect(clicks.value[0]).toMatchObject({ x: 10, y: 20, pointerId: 1 });
  });

  test('removes clicks after WAVE_LIVE', () => {
    const { clicks, onPointerDown } = useRipple();

    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const event = new PointerEvent('pointerdown', {
      clientX: 5,
      clientY: 5,
      pointerId: 1,
    });
    Object.defineProperty(event, 'currentTarget', { value: el });

    onPointerDown(event);
    vi.advanceTimersByTime(RIPPLE_DELAY);

    expect(clicks.value).toHaveLength(1);

    vi.advanceTimersByTime(WAVE_LIVE);

    expect(clicks.value).toHaveLength(0);
  });

  test('cancels pointer before delay', () => {
    const { clicks, onPointerDown, onPointerCancel } = useRipple();

    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const event = new PointerEvent('pointerdown', {
      clientX: 1,
      clientY: 1,
      pointerId: 2,
    });
    Object.defineProperty(event, 'currentTarget', { value: el });

    onPointerDown(event);
    onPointerCancel(event);
    vi.advanceTimersByTime(RIPPLE_DELAY);

    expect(clicks.value).toHaveLength(0);
  });

  test('filters out expired clicks when adding new ones', () => {
    const { clicks, onPointerDown } = useRipple();

    const el = document.createElement('div');
    el.getBoundingClientRect = () => ({
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      right: 100,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const event1 = new PointerEvent('pointerdown', {
      clientX: 1,
      clientY: 1,
      pointerId: 1,
    });
    Object.defineProperty(event1, 'currentTarget', { value: el });
    onPointerDown(event1);
    vi.advanceTimersByTime(RIPPLE_DELAY);

    expect(clicks.value).toHaveLength(1);

    // Advance past WAVE_LIVE so the first click is stale
    vi.advanceTimersByTime(WAVE_LIVE + 1);

    const event2 = new PointerEvent('pointerdown', {
      clientX: 2,
      clientY: 2,
      pointerId: 2,
    });
    Object.defineProperty(event2, 'currentTarget', { value: el });
    onPointerDown(event2);
    vi.advanceTimersByTime(RIPPLE_DELAY);

    expect(clicks.value).toHaveLength(1);
    expect(clicks.value[0].pointerId).toBe(2);
  });
});
