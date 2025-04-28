import { Keys } from '@/helpers/accessibility';
import { clamp } from '@/helpers/math';
import { useEnsuredControl } from '@/composables/useEnsuredControl';
import { computed, Ref } from 'vue';

interface UsePinInputProps {
  pinCount: number;
  value?: number[];
}

export const AVAILABLE_PINS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, Keys.BACKSPACE];

export function usePinInput(
  props: Ref<UsePinInputProps>,
  inputRefs: Ref<(HTMLElement | null)[]>,
  onChange?: (value: number[]) => void
) {
  const params = computed(() => ({
    ...props.value,
    value: props.value.value ?? [],
  }));

  const [value, setValue] = useEnsuredControl(
    {
      defaultValue: params.value.value,
    },
    onChange
  );

  function focusByIndex(index: number) {
    const inputRef = inputRefs.value[index];
    if (!inputRef) {
      return;
    }
    requestAnimationFrame(() => inputRef.focus());
  }

  function setValueByIndex(index: number, newValue: number) {
    setValue([
      ...value.value.slice(0, index),
      newValue,
      ...value.value.slice(index + 1),
    ]);
  }

  function removeLastValue(currentIndex: number) {
    setValue(value.value.slice(0, -1));
    focusByIndex(currentIndex - 1);
  }

  function handleClickValue(enteredValue: number) {
    const lastIndex = clamp(value.value.length, 0, params.value.pinCount - 1);
    setValueByIndex(lastIndex, enteredValue);
    focusByIndex(lastIndex + 1);
  }

  function handleClickBackspace() {
    removeLastValue(value.value.length - 1);
  }

  function handleButton(index: number, button: string) {
    if (AVAILABLE_PINS.includes(Number(button))) {
      setValueByIndex(index, Number(button));
      focusByIndex(index + 1);
    }

    switch (button) {
      case Keys.BACKSPACE:
        removeLastValue(index);
        break;

      case Keys.ARROW_LEFT:
        focusByIndex(index - 1);
        break;

      case Keys.ARROW_RIGHT:
        focusByIndex(index + 1);
        break;

      default:
        break;
    }
  }

  return {
    value,
    handleClickValue,
    handleClickBackspace,
    handleButton,
  };
}
