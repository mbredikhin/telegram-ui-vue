import { mount } from '@/lib/tests';
import FormInput from '../FormInput.vue';
import FormInputTitle from '../FormInputTitle.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('FormInput', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders base classes', () => {
    const wrapper = mount(FormInput);

    expect(wrapper.classes()).toContain('form-input');
    expect(wrapper.classes()).toContain('form-input--base');
    expect(wrapper.classes()).toContain('form-input--default');
  });

  test('applies iOS-specific classes', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(FormInput);

    expect(wrapper.classes()).toContain('form-input--ios');
  });

  test('renders before and after slots if present', () => {
    const wrapper = mount(FormInput, {
      slots: {
        before: '<span class="test-before">before</span>',
        after: '<span class="test-after">after</span>',
      },
    });

    expect(wrapper.find('.before .test-before').exists()).toBe(true);
    expect(wrapper.find('.after .test-after').exists()).toBe(true);
  });

  test('does not render before and after if slots are missing', () => {
    const wrapper = mount(FormInput);

    expect(wrapper.find('.before').exists()).toBe(false);
    expect(wrapper.find('.after').exists()).toBe(false);
  });

  test('renders FormInputTitle if header slot is present and platform is base', () => {
    const wrapper = mount(FormInput, {
      slots: {
        header: '<span class="test-header">Header</span>',
      },
    });

    expect(wrapper.findComponent(FormInputTitle).exists()).toBe(true);
    expect(wrapper.find('.title .test-header').exists()).toBe(true);
  });

  test('does not render FormInputTitle if header is missing', () => {
    const wrapper = mount(FormInput);

    expect(wrapper.findComponent(FormInputTitle).exists()).toBe(false);
  });

  test('adds form-input--error class when status is error', () => {
    const wrapper = mount(FormInput, {
      props: { status: 'error' },
    });

    expect(wrapper.classes()).toContain('form-input--error');
  });

  test('adds form-input--disabled class and aria-disabled when disabled', () => {
    const wrapper = mount(FormInput, {
      attrs: { disabled: true },
    });

    expect(wrapper.attributes('aria-disabled')).toBe('true');
    expect(wrapper.classes()).toContain('form-input--disabled');
  });

  test('handles focus and blur events and sets internal focus state', async () => {
    const wrapper = mount(FormInput);

    const label = wrapper.find('label');
    await label.trigger('focusin');

    expect(wrapper.classes()).toContain('form-input--focused');

    await label.trigger('focusout');

    expect(wrapper.classes()).not.toContain('form-input--focused');
  });

  test('does not set focus if disabled', async () => {
    const wrapper = mount(FormInput, {
      attrs: { disabled: true },
    });

    const label = wrapper.find('label');
    await label.trigger('focusin');

    expect(wrapper.classes()).not.toContain('form-input--focused');
  });

  test('emits focus and blur events', async () => {
    const wrapper = mount(FormInput);
    const label = wrapper.find('label');

    await label.trigger('focusin');
    await label.trigger('focusout');

    expect(wrapper.emitted()).toHaveProperty('focus');
    expect(wrapper.emitted()).toHaveProperty('blur');
  });

  test('renders default slot content', () => {
    const wrapper = mount(FormInput, {
      slots: {
        default: '<input class="test-inner-input" />',
      },
    });

    expect(wrapper.find('.test-inner-input').exists()).toBe(true);
  });
});
