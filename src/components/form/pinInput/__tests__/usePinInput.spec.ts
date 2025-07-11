import { ref } from 'vue';
import { describe, vi, expect, beforeEach } from 'vitest';
import { usePinInput } from '../lib';
import { Keys } from '@/lib/accessibility';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('usePinInput', () => {
  const inputRefs = ref<(HTMLElement | null)[]>([]);
  let onChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onChange = vi.fn();
    inputRefs.value = [];
  });

  beforeAll(() => {
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((cb) => cb())
    );
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  test('sets value and calls focusByIndex when handleClickValue is called', async () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    inputRefs.value = [null, input, null];

    const { inputValue, handleClickValue } = usePinInput({
      pinCount: 4,
      value: [],
      inputRefs,
      onChange,
    });

    handleClickValue(1);

    expect(inputValue.value).toEqual([1]);
    expect(input.focus).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith([1]);
  });

  test('removes last value and focuses on previous input on backspace', () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    inputRefs.value = [null, input, null];

    const { inputValue, handleClickBackspace } = usePinInput({
      pinCount: 4,
      value: [1, 2, 3],
      inputRefs,
      onChange,
    });

    handleClickBackspace();

    expect(inputValue.value).toEqual([1, 2]);
    expect(input.focus).toHaveBeenCalled();
  });

  test('handles BACKSPACE key correctly', () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    inputRefs.value = [null, input, null];

    const { inputValue, handleButton } = usePinInput({
      pinCount: 4,
      value: [1, 2, 3],
      inputRefs,
      onChange,
    });

    handleButton(2, Keys.BACKSPACE);

    expect(inputValue.value).toEqual([1, 2]);
    expect(input.focus).toHaveBeenCalled();
  });

  test('handles ARROW_LEFT and ARROW_RIGHT', () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    inputRefs.value = [null, input, null];

    const { handleButton } = usePinInput({
      pinCount: 3,
      value: [],
      inputRefs,
      onChange,
    });

    handleButton(2, Keys.ARROW_LEFT);
    expect(input.focus).toHaveBeenCalledTimes(1);

    handleButton(0, Keys.ARROW_RIGHT);
    expect(input.focus).toHaveBeenCalledTimes(2);
  });

  test('ignores unknown keys', () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    inputRefs.value = [input];

    const { inputValue, handleButton } = usePinInput({
      pinCount: 4,
      value: [5],
      inputRefs,
      onChange,
    });

    handleButton(0, 'A');

    expect(inputValue.value).toEqual([5]);
    expect(input.focus).not.toHaveBeenCalled();
  });

  test('sets value at the correct index with handleButton for numeric key', () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    inputRefs.value = [null, null, input];

    const { inputValue, handleButton } = usePinInput({
      pinCount: 4,
      value: [1],
      inputRefs,
      onChange,
    });

    handleButton(1, '2');

    expect(inputValue.value).toEqual([1, 2]);
    expect(input.focus).toHaveBeenCalled();
  });
});
