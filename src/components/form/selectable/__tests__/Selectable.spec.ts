import Selectable from '../Selectable.vue';
import { DOMWrapper } from '@vue/test-utils';
import { mount } from '@/lib/tests';
import { usePlatform } from '@/composables/usePlatform';
import { randomString } from '@/lib/tests';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Selectable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders correctly on base platform with correct icon', () => {
    const wrapper = mount(Selectable);

    expect(wrapper.find('[data-test-id="selectable-ios-icon"]').exists()).toBe(
      false
    );
    expect(wrapper.find('[data-test-id="selectable-base-icon"]').exists()).toBe(
      true
    );
  });

  test('renders correctly on iOS', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const name = randomString();
    const value = randomString();
    const content = randomString();
    const wrapper = mount(Selectable, {
      attrs: {
        name,
        value,
      },
      slots: {
        default: content,
      },
    });

    expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="selectable-ios-icon"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-test-id="selectable-base-icon"]').exists()).toBe(
      false
    );
    expect(wrapper.text()).toContain(content);
  });

  test('applies "selectable--disabled" class when disabled', () => {
    const wrapper = mount(Selectable, {
      attrs: {
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('selectable');
    expect(wrapper.classes()).toContain('selectable--disabled');
  });

  test('input is checked if defaultChecked is true', () => {
    const wrapper = mount(Selectable, {
      props: {
        defaultChecked: true,
      },
    });

    const input: DOMWrapper<HTMLInputElement> = wrapper.find(
      'input[type="radio"]'
    );

    expect(input.element.checked).toBe(true);
  });

  test('forwards arbitrary attributes to input', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const name = randomString();
    const value = randomString();
    const wrapper = mount(Selectable, {
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
