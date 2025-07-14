import { mount } from '@/lib/tests';
import Checkbox from '../Checkbox.vue';
import IndeterminateIcon from '../icons/checkbox-indeterminate.svg';
import CheckedIcon from '../icons/checkbox-checked.svg';

describe('Checkbox', () => {
  test('renders the checkbox input and icons', () => {
    const wrapper = mount(Checkbox);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
    expect(wrapper.find('.checked-icon').exists()).toBe(true);
  });

  test('applies the indeterminate icon when prop is true', () => {
    const wrapper = mount(Checkbox, {
      props: { indeterminate: true },
    });

    const indeterminateIcon = wrapper.findComponent(IndeterminateIcon);
    expect(indeterminateIcon.exists()).toBe(true);

    const checkedIcon = wrapper.findComponent(CheckedIcon);
    expect(checkedIcon.exists()).toBe(false);
  });

  test('shows the checked icon when checked', async () => {
    const wrapper = mount(Checkbox, {
      attrs: { checked: true },
    });

    const input = wrapper.find('input');
    await input.setValue(true);
    expect(wrapper.find('.checked-icon').exists()).toBe(true);
  });

  test('displays checked icon when indeterminate is false', () => {
    const wrapper = mount(Checkbox, {
      props: { indeterminate: false },
    });

    const checkedIcon = wrapper.findComponent(CheckedIcon);
    expect(checkedIcon.exists()).toBe(true);

    const indeterminateIcon = wrapper.findComponent(IndeterminateIcon);
    expect(indeterminateIcon.exists()).toBe(false);
  });

  test('applies disabled class when disabled', () => {
    const wrapper = mount(Checkbox, {
      attrs: { disabled: true },
    });
    expect(wrapper.classes()).toContain('checkbox--disabled');
  });
});
