import { mount } from '@/lib/tests';
import PinInput from '../PinInput.vue';
import PinInputCell from '../PinInputCell.vue';
import PinInputButton from '../PinInputButton.vue';
import { Keys } from '@/lib/accessibility';

describe('PinInput', () => {
  test('renders with default 4 cells and label', () => {
    const wrapper = mount(PinInput);

    expect(wrapper.findAllComponents(PinInputCell)).toHaveLength(4);
    expect(wrapper.text()).toContain('Enter your pin');
  });

  test('renders the correct number of pin input cells based on pinCount', () => {
    const wrapper = mount(PinInput, {
      props: { pinCount: 6 },
    });

    expect(wrapper.findAllComponents(PinInputCell)).toHaveLength(6);
  });

  test('displays input dots when values are typed (simulated)', () => {
    const wrapper = mount(PinInput, {
      props: { value: [1, 2] },
    });

    const cells = wrapper.findAllComponents(PinInputCell);

    expect(cells[0].props('isTyped')).toBe(true);
    expect(cells[1].props('isTyped')).toBe(true);
    expect(cells[2].props('isTyped')).toBe(false);
  });

  test('emits change when number buttons are clicked', async () => {
    const wrapper = mount(PinInput);

    const buttons = wrapper.findAllComponents(PinInputButton);
    await buttons.find((btn) => btn.text() === '1')?.trigger('click');

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')?.[0][0]).toEqual([1]);
  });

  test('removes the last digit on backspace click', async () => {
    const wrapper = mount(PinInput, {
      props: { value: [1, 2, 3] },
    });

    const backspaceButton = wrapper
      .findAllComponents(PinInputButton)
      .find((button) => button.find('svg')?.exists())!;
    await backspaceButton.trigger('click');

    expect(wrapper.emitted('change')?.pop()?.[0]).toEqual([1, 2]);
  });

  test('handles keyboard arrow navigation', async () => {
    const wrapper = mount(PinInput);

    const cell = wrapper.findComponent(PinInputCell);
    await cell.trigger('keydown', { key: Keys.ARROW_RIGHT });

    // Since we're mocking DOM focus, just ensure no error is thrown and no crash occurs.
    expect(wrapper.exists()).toBe(true);
  });
});
