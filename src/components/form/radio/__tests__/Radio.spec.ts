import { mount, randomString } from '@/lib/tests';
import Radio from '../Radio.vue';

describe('Radio', () => {
  test('renders icons', () => {
    const wrapper = mount(Radio);

    const uncheckedIcon = wrapper.find('[data-test-id]="radio-icon"');
    const checkedIcon = wrapper.find('[data-test-id]="radio-checked-icon"');

    expect(uncheckedIcon.exists()).toBe(true);
    expect(checkedIcon.exists()).toBe(true);
  });

  test('uses defaultChecked when no checked attribute is passed', () => {
    const wrapper = mount(Radio, {
      props: {
        defaultChecked: true,
      },
    });

    const input = wrapper.find('input[type="radio"]');

    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  test('applies disabled class when disabled', () => {
    const wrapper = mount(Radio, {
      attrs: {
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('radio--disabled');
  });

  test('emits input event on click', async () => {
    const wrapper = mount(Radio, {
      attrs: { checked: false },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input')![0]).toEqual([true]);
  });

  test('toggles checked state when clicked', async () => {
    let checked = false;
    const wrapper = mount(Radio, {
      attrs: { checked },
      props: {
        onInput: (value: boolean) => (checked = value),
      },
    });

    await wrapper.trigger('click');

    expect(checked).toBe(true);
  });

  test('forwards input attributes', () => {
    const name = randomString();
    const value = randomString();
    const wrapper = mount(Radio, {
      attrs: {
        name,
        value,
      },
    });

    const input = wrapper.find('input[type="radio"]');

    expect(input.attributes('name')).toBe(name);
    expect(input.attributes('value')).toBe(value);
  });
});
