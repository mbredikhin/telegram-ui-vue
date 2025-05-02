import { MaybeRef, toValue } from 'vue';

export function useTimeout(
  cb: (...args: unknown[]) => unknown,
  duration: MaybeRef<number>
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  function set() {
    clear();
    timeout = setTimeout(cb, toValue(duration));
  }

  function clear() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  return { set, clear };
}
