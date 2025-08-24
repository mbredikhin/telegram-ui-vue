import { mount, randomString } from '@/lib/tests';
import VisuallyHidden from '../VisuallyHidden.vue';

describe('VisuallyHidden', () => {
  test('renders as span by default', () => {
    const content = randomString();
    const wrapper = mount(VisuallyHidden, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.classes()).toContain('visually-hidden');
    expect(wrapper.text()).toBe(content);
  });

  test('renders as custom element when is prop is set', () => {
    const content = randomString();
    const wrapper = mount(VisuallyHidden, {
      props: {
        is: 'label',
      },
      slots: {
        default: content,
      },
    });

    expect(wrapper.element.tagName).toBe('LABEL');
    expect(wrapper.classes()).toContain('visually-hidden');
    expect(wrapper.text()).toBe(content);
  });
});
