import { ref } from 'vue';
import { useTimeout } from '../useTimeout';
import { randomInt } from 'crypto';

describe('useTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  test('calls callback after given duration', () => {
    const cb = vi.fn();
    const duration = randomInt(1000);
    const { set } = useTimeout(cb, duration);

    set();
    expect(cb).not.toHaveBeenCalled();

    vi.advanceTimersByTime(duration);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('does not call callback if cleared before timeout', () => {
    const cb = vi.fn();
    const duration = randomInt(1000);
    const { set, clear } = useTimeout(cb, duration);

    set();
    clear();
    vi.advanceTimersByTime(duration);

    expect(cb).not.toHaveBeenCalled();
  });

  test('resets timeout when set is called again', () => {
    const cb = vi.fn();
    const duration = randomInt(1000);
    const halfDuration = duration / 2;
    const { set } = useTimeout(cb, duration);

    set();
    vi.advanceTimersByTime(halfDuration);
    set(); // reset
    vi.advanceTimersByTime(halfDuration);

    expect(cb).not.toHaveBeenCalled();

    vi.advanceTimersByTime(halfDuration);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('works with reactive duration', () => {
    const cb = vi.fn();
    const duration = ref(randomInt(1000));
    const { set } = useTimeout(cb, duration);

    set();
    vi.advanceTimersByTime(duration.value);
    expect(cb).toHaveBeenCalledTimes(1);

    cb.mockReset();
    duration.value = duration.value * 2;
    set();

    vi.advanceTimersByTime(duration.value - 1);
    expect(cb).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
