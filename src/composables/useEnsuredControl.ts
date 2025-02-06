/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, Ref, ref, toRefs } from 'vue';

export interface UseEnsuredControlProps<V> {
  value?: V;
  defaultValue: V;
  disabled?: boolean | undefined;
}

export function useEnsuredControl<V = any>(
  props: UseEnsuredControlProps<V>,
  onChange?: (newValue: V) => any
): [Ref<V>, (newValue: V) => void] {
  const params = toRefs(props);

  const localValue = ref<V>(params.defaultValue.value);

  const isControlled = computed(() => props.value !== undefined);

  const controlledValue = computed(() =>
    isControlled.value ? (params.value?.value as V) : (localValue.value as V)
  );

  function changeValue(newValue: V) {
    if (params.disabled?.value) {
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
