import Multiselectable from '../Multiselectable.vue';
import { nextTick } from 'vue';
import { Mock } from 'vitest';
import { mount, randomString } from '@/lib/tests';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Multiselectable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders the base platform icons by default', () => {
    const wrapper = mount(Multiselectable);

    const baseIcon = wrapper.find('[data-test-id="multiselectable-base-icon"]');
    const checkedBaseIcon = wrapper.find(
      '[data-test-id="multiselectable-checked-base-icon"]'
    );
    const iosIcon = wrapper.find('[data-test-id="multiselectable-ios-icon"]');
    const checkedIosIcon = wrapper.find(
      '[data-test-id="multiselectable-checked-ios-icon"]'
    );

    expect(baseIcon.exists()).toBe(true);
    expect(checkedBaseIcon.exists()).toBe(true);
    expect(iosIcon.exists()).toBe(false);
    expect(checkedIosIcon.exists()).toBe(false);
  });

  test('renders the ios icons if platform is ios', async () => {
    const { usePlatform } = await import('@/composables/usePlatform');
    (usePlatform as Mock).mockReturnValue('ios');

    const wrapper = mount(Multiselectable);

    const baseIcon = wrapper.find('[data-test-id="multiselectable-base-icon"]');
    const checkedBaseIcon = wrapper.find(
      '[data-test-id="multiselectable-checked-base-icon"]'
    );
    const iosIcon = wrapper.find('[data-test-id="multiselectable-ios-icon"]');
    const checkedIosIcon = wrapper.find(
      '[data-test-id="multiselectable-checked-ios-icon"]'
    );

    expect(baseIcon.exists()).toBe(false);
    expect(checkedBaseIcon.exists()).toBe(false);
    expect(iosIcon.exists()).toBe(true);
    expect(checkedIosIcon.exists()).toBe(true);
  });

  test('adds "multiselectable--disabled" class when disabled', () => {
    const wrapper = mount(Multiselectable, {
      attrs: {
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('multiselectable--disabled');
  });

  test('renders slot content inside the label', () => {
    const wrapper = mount(Multiselectable, {
      slots: {
        default: '<span class="test-content">Hello</span>',
      },
    });

    expect(wrapper.find('.test-content').exists()).toBe(true);
  });

  test('forwards attributes to the hidden input', () => {
    const attrs = {
      checked: true,
      name: randomString(),
      value: randomString(),
    };
    const wrapper = mount(Multiselectable, {
      attrs,
    });

    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).checked).toBe(attrs.checked);
    expect(input.attributes('name')).toBe(attrs.name);
    expect(input.attributes('value')).toBe(attrs.value);
  });

  test('toggles icons visibility on checked state', async () => {
    const wrapper = mount(Multiselectable);
    const input = wrapper.find('input[type="checkbox"]');

    await input.setValue(true);
    await nextTick();

    const checkedIcon = wrapper.find('.icon--checked');
    const uncheckedIcon = wrapper.find('.icon');

    expect(getComputedStyle(checkedIcon.element).opacity).not.toBe('0');
    expect(getComputedStyle(uncheckedIcon.element).opacity).toBe('');
  });
});
