import { mount, randomString } from '@/lib/tests';
import FixedLayout from '../FixedLayout.vue';
import { h } from 'vue';

describe('FixedLayout', () => {
  test('renders as default div with bottom positioning', () => {
    const wrapper = mount(FixedLayout);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('wrapper');
    expect(wrapper.classes()).toContain('wrapper--bottom');
  });

  test('renders with top positioning when vertical is "top"', () => {
    const wrapper = mount(FixedLayout, {
      props: {
        vertical: 'top',
      },
    });

    expect(wrapper.classes()).toContain('wrapper');
    expect(wrapper.classes()).toContain('wrapper--top');
  });

  test('renders using a custom HTML tag', () => {
    const wrapper = mount(FixedLayout, {
      props: {
        is: 'header',
      },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe('header');
  });

  test('renders slot content', () => {
    const content = randomString();
    const wrapper = mount(FixedLayout, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.text()).toContain(content);
  });

  test('renders using a custom component', () => {
    const content = randomString();

    const wrapper = mount(FixedLayout, {
      props: {
        is: h('section', () => '<slot />'),
      },
      slots: {
        default: content,
      },
    });

    expect(wrapper.find('section').exists()).toBe(true);
    expect(wrapper.text()).toContain(content);
  });
});
