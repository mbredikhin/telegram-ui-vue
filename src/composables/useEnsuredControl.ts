/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ComputedRef, MaybeRef, ref, toValue } from 'vue';

interface UseEnsuredControlConfig<V> {
  defaultValue: V;
  value?: MaybeRef<V>;
  disabled?: MaybeRef<boolean | undefined>;
  onChange?: (newValue: V) => any;
}

type UseEnsuredControlResult<V> = [ComputedRef<V>, (newValue: V) => void];

export function useEnsuredControl<V = any>(
  config: UseEnsuredControlConfig<V>
): UseEnsuredControlResult<V> {
  const localValue = ref(config.defaultValue);

  const isControlled = computed(() => toValue(config.value) !== undefined);

  const controlledValue = computed(() =>
    isControlled.value ? toValue(config.value) : localValue.value
  );

  function changeValue(newValue: V) {
    if (toValue(config.disabled)) {
      return;
    }
    config.onChange?.(newValue);
    if (!isControlled.value) {
      localValue.value = newValue;
    }
  }

  return [controlledValue, changeValue];
}
