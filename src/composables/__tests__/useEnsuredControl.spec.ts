import { ref } from 'vue';
import { useEnsuredControl } from '../useEnsuredControl';
import { randomString } from '@/lib/tests';

describe('useEnsuredControl', () => {
  test('returns default value in uncontrolled mode', () => {
    const defaultValue = randomString();
    const [value] = useEnsuredControl({ defaultValue });

    expect(value.value).toBe(defaultValue);
  });

  test('updates local value in uncontrolled mode', () => {
    const defaultValue = randomString();
    const [value, setValue] = useEnsuredControl({ defaultValue });

    const newValue = randomString();
    setValue(newValue);

    expect(value.value).toBe(newValue);
  });

  test('setValue has no effect on local value in controlled mode', () => {
    const defaultValue = randomString();
    const externalValue = ref(randomString());
    const [value, setValue] = useEnsuredControl({
      defaultValue,
      value: externalValue,
    });

    expect(value.value).toBe(externalValue.value);

    const newValue = randomString();
    setValue(newValue);

    expect(value.value).toBe(externalValue.value); // stays controlled

    const newExternalValue = randomString();
    externalValue.value = newExternalValue;

    expect(value.value).toBe(newExternalValue); // updated
  });

  test('calls onChange in controlled mode', () => {
    const defaultValue = randomString();
    const externalValue = ref(randomString());
    const onChange = vi.fn();
    const [, setValue] = useEnsuredControl({
      defaultValue,
      value: externalValue,
      onChange,
    });

    const newValue = randomString();
    setValue(newValue);

    expect(onChange).toHaveBeenCalledWith(newValue);
  });

  test('calls onChange in uncontrolled mode and updates local value', () => {
    const defaultValue = randomString();
    const onChange = vi.fn();
    const [value, setValue] = useEnsuredControl({
      defaultValue,
      onChange,
    });

    const newValue = randomString();
    setValue(newValue);

    expect(onChange).toHaveBeenCalledWith(newValue);
    expect(value.value).toBe(newValue);
  });

  test('does nothing when disabled', () => {
    const defaultValue = randomString();
    const onChange = vi.fn();
    const [value, setValue] = useEnsuredControl({
      defaultValue,
      disabled: true,
      onChange,
    });

    const newValue = randomString();
    setValue(newValue);

    expect(onChange).not.toHaveBeenCalled();
    expect(value.value).toBe(defaultValue);
  });

  test('reacts to reactive disabled state', () => {
    const defaultValue = randomString();
    const disabled = ref(false);
    const [value, setValue] = useEnsuredControl({
      defaultValue,
      disabled,
    });

    const newValue = randomString();
    setValue(newValue);

    expect(value.value).toBe(newValue);

    disabled.value = true;
    setValue(randomString());

    expect(value.value).toBe(newValue); // no change
  });
});
