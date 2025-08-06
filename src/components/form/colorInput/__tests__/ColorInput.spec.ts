import { mount } from '@/lib/tests';
import ColorInput from '../ColorInput.vue';
import { nextTick } from 'vue';
import { DOMWrapper } from '@vue/test-utils';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('ColorInput', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders the component with default value', () => {
    const wrapper = mount(ColorInput);

    const input: DOMWrapper<HTMLInputElement> = wrapper.find(
      'input[type="color"]'
    );

    expect(input.exists()).toBe(true);
    expect(input.element.value).toBe('#efeff4');
  });

  test('uses provided value prop', () => {
    const wrapper = mount(ColorInput, {
      props: {
        value: '#123456',
      },
    });

    const input: DOMWrapper<HTMLInputElement> = wrapper.find(
      'input[type="color"]'
    );

    expect(input.element.value).toBe('#123456');
    expect(wrapper.text()).toContain('#123456');
  });

  test('reacts to prop change', async () => {
    const wrapper = mount(ColorInput, {
      props: {
        value: '#000000',
      },
    });

    await wrapper.setProps({ value: '#ffffff' });
    await nextTick();
    const input: DOMWrapper<HTMLInputElement> = wrapper.find(
      'input[type="color"]'
    );

    expect(input.element.value).toBe('#ffffff');
  });

  test('updates internal value when input emits input event', async () => {
    const wrapper = mount(ColorInput);

    const input = wrapper.find('input[type="color"]');
    await input.setValue('#00ff00');

    expect(wrapper.text()).toContain('#00ff00');
  });

  test('adds platform-specific class', async () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(ColorInput);

    expect(wrapper.find('.color-input').exists()).toBe(true);
    expect(wrapper.classes()).toContain('color-input--ios');
  });
});
