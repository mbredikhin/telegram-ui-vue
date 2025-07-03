import { mount, randomString } from '@/lib/tests';
import SnackbarButton from '../SnackbarButton.vue';

describe('SnackbarButton', () => {
  test('renders as a button with correct class', () => {
    const wrapper = mount(SnackbarButton);
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain('snackbar-button');
  });

  test('renders slot content', () => {
    const content = randomString();
    const wrapper = mount(SnackbarButton, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.text()).toBe(content);
  });

  test('passes through native button attributes', () => {
    const label = randomString();
    const wrapper = mount(SnackbarButton, {
      attrs: {
        type: 'submit',
        'aria-label': label,
        disabled: true,
      },
    });

    const button = wrapper.find('button');

    expect(button.attributes('type')).toBe('submit');
    expect(button.attributes('aria-label')).toBe(label);
    expect(button.attributes('disabled')).toBe('');
  });
});
