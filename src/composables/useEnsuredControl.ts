/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ComputedRef, ref } from 'vue';

export interface UseEnsuredControlProps<V> {
  value?: V;
  defaultValue: V;
  disabled?: boolean | undefined;
}

export function useEnsuredControl<V = any>(
  props: UseEnsuredControlProps<V>,
  onChange?: (newValue: V) => any
): [ComputedRef<V>, (newValue: V) => void] {
  const params = computed(() => props);

  const localValue = ref(params.value.defaultValue);

  const isControlled = computed(() => props.value !== undefined);

  const controlledValue = computed(() =>
    isControlled.value ? params.value.value : localValue.value
  );

  function changeValue(newValue: V) {
    if (params.value.disabled) {
      return;
    }
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled.value) {
      localValue.value = newValue;
    }
  }

  return [controlledValue, changeValue];
}
