import { ref, watch } from 'vue';

export const useTimeout = (callbackFunction: () => void, duration: number) => {
  const options = ref({ callbackFunction, duration });
  const timeout = ref<ReturnType<typeof setTimeout>>();

  watch(
    () => callbackFunction,
    (callbackFunction) => {
      options.value.callbackFunction = callbackFunction;
    }
  );

  watch(
    () => duration,
    (duration) => {
      options.value.duration = duration;
    }
  );

  function clear() {
    return clearTimeout(timeout?.value);
  }

  function set() {
    clear();
    timeout.value = setTimeout(
      options.value.callbackFunction,
      options.value.duration
    );
  }

  return { set, clear };
};
