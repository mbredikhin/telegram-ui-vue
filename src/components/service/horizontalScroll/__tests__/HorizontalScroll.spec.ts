import { mount } from '@/lib/tests';
import { defineComponent, h, markRaw } from 'vue';
import HorizontalScroll from '../HorizontalScroll.vue';
import { randomString } from '@/lib/tests';

describe('HorizontalScroll', () => {
  test('renders as a div by default', () => {
    const wrapper = mount(HorizontalScroll);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('horizontal-scroll');
  });

  test('renders with custom HTML tag', () => {
    const wrapper = mount(HorizontalScroll, {
      props: { is: 'section' },
    });

    expect(wrapper.element.tagName).toBe('SECTION');
    expect(wrapper.classes()).toContain('horizontal-scroll');
  });

  test('renders with custom component', () => {
    const CustomComponent = markRaw(
      defineComponent({
        name: 'CustomComponent',
        render: () => h('main'),
      })
    );

    const wrapper = mount(HorizontalScroll, {
      props: { is: CustomComponent },
    });

    expect(wrapper.element.tagName).toBe('MAIN');
    expect(wrapper.classes()).toContain('horizontal-scroll');
  });

  test('renders slot content', () => {
    const text = randomString();
    const wrapper = mount(HorizontalScroll, {
      slots: {
        default: () => text,
      },
    });

    expect(wrapper.text()).toContain(text);
  });
});
