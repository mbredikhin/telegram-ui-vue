import { Keys } from '@/lib/accessibility';
import { clamp } from '@/lib/math';
import { useEnsuredControl } from '@/composables/useEnsuredControl';
import { MaybeRef, Ref, toValue } from 'vue';

interface UsePinInputConfig {
  pinCount: MaybeRef<number>;
  value: MaybeRef<number[]>;
  inputRefs: Ref<(HTMLElement | null)[]>;
  onChange?: (value: number[]) => void;
}

export const AVAILABLE_PINS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, Keys.BACKSPACE];

export function usePinInput(config: UsePinInputConfig) {
  const [inputValue, setInputValue] = useEnsuredControl({
    defaultValue: toValue(config.value),
    onChange: config.onChange,
  });

  function focusByIndex(index: number) {
    const inputRef = config.inputRefs.value[index];
    if (!inputRef) {
      return;
    }
    requestAnimationFrame(() => inputRef.focus());
  }

  function setValueByIndex(index: number, newValue: number) {
    setInputValue([
      ...inputValue.value.slice(0, index),
      newValue,
      ...inputValue.value.slice(index + 1),
    ]);
  }

  function removeLastValue(currentIndex: number) {
    setInputValue(inputValue.value.slice(0, -1));
    focusByIndex(currentIndex - 1);
  }

  function handleClickValue(enteredValue: number) {
    const lastIndex = clamp(
      inputValue.value.length,
      0,
      toValue(config.pinCount) - 1
    );
    setValueByIndex(lastIndex, enteredValue);
    focusByIndex(lastIndex + 1);
  }

  function handleClickBackspace() {
    removeLastValue(inputValue.value.length - 1);
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
    inputValue,
    handleClickValue,
    handleClickBackspace,
    handleButton,
  };
}
