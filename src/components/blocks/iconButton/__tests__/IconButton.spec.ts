import { mount, randomString } from '@/lib/tests';
import IconButton from '../IconButton.vue';

describe('IconButton', () => {
  test('renders with default classes', () => {
    const wrapper = mount(IconButton);
    expect(wrapper.classes()).toContain('icon-button');
    expect(wrapper.classes()).toContain('icon-button--m');
    expect(wrapper.classes()).toContain('icon-button--bezeled');
  });

  test('applies custom size and mode', () => {
    const wrapper = mount(IconButton, {
      props: {
        size: 's',
        mode: 'outline',
      },
    });

    expect(wrapper.classes()).toContain('icon-button--s');
    expect(wrapper.classes()).toContain('icon-button--outline');
  });

  test('renders slot content', () => {
    const wrapper = mount(IconButton, {
      slots: {
        default: '<svg class="test-icon" />',
      },
    });

    expect(wrapper.find('.test-icon').exists()).toBe(true);
  });

  test('forwards attributes to Tappable', () => {
    const label = randomString();
    const wrapper = mount(IconButton, {
      attrs: {
        'aria-label': label,
        disabled: true,
      },
    });

    const button = wrapper.find('button');
    expect(button.attributes('aria-label')).toBe(label);
    expect(button.attributes('disabled')).toBeDefined();
  });

  test('renders as a button element', () => {
    const wrapper = mount(IconButton);
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
  });
});
