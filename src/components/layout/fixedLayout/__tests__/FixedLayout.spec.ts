import { mount, randomString } from '@/lib/tests';
import FixedLayout from '../FixedLayout.vue';

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
    const CustomComponent = {
      template: '<section class="test-custom-component"><slot /></section>',
    };
    const content = randomString();

    const wrapper = mount(FixedLayout, {
      props: {
        is: CustomComponent,
      },
      slots: {
        default: content,
      },
    });

    expect(wrapper.find('.test-custom-component').exists()).toBe(true);
    expect(wrapper.text()).toContain(content);
  });
});
