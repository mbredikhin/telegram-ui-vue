import { mount, randomString } from '@/lib/tests';
import Input from '../Input.vue';
import { Mock } from 'vitest';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Input', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders with base platform and uses Subheadline as input', () => {
    const wrapper = mount(Input, {
      attrs: { placeholder: 'Type here' },
    });

    const input = wrapper.findComponent({ name: 'Subheadline' });

    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Type here');
    expect(wrapper.classes()).toContain('input-wrapper');
    expect(wrapper.classes()).not.toContain('input-wrapper--ios');
  });

  test('renders with ios platform and uses Text as input', async () => {
    const { usePlatform } = await import('@/composables/usePlatform');
    (usePlatform as Mock).mockReturnValue('ios');

    const placeholder = randomString();

    const wrapper = mount(Input, {
      attrs: { placeholder },
    });

    const text = wrapper.findComponent({ name: 'Text' });

    expect(text.exists()).toBe(true);
    expect(text.attributes('placeholder')).toBe(placeholder);
    expect(wrapper.classes()).toContain('input-wrapper--ios');
  });

  test('forwards slots to FormInput', () => {
    const wrapper = mount(Input, {
      slots: {
        header: '<div class="header-test-content">Header</div>',
        before: '<div class="before-test-content">Before</div>',
        after: '<div class="after-test-content">After</div>',
      },
    });

    expect(wrapper.find('.header-test-content').exists()).toBe(true);
    expect(wrapper.find('.before-test-content').exists()).toBe(true);
    expect(wrapper.find('.after-test-content').exists()).toBe(true);
  });

  test('forwards disabled and status attrs to FormInput', () => {
    const wrapper = mount(Input, {
      attrs: { disabled: true, status: 'error' },
    });

    const formInput = wrapper.findComponent({ name: 'FormInput' });

    expect(formInput.attributes('aria-disabled')).toBeTruthy();
    expect(formInput.props('status')).toBe('error');
  });
});
