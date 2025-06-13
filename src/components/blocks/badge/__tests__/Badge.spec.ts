import { mount } from '@/lib/tests';
import Badge from '../Badge.vue';

describe('Badge', () => {
  test('renders with base classes', () => {
    const wrapper = mount(Badge, {
      props: {
        type: 'number',
      },
    });

    expect(wrapper.classes()).toContain('badge');
    expect(wrapper.classes()).toContain('badge--number');
    expect(wrapper.classes()).toContain('badge--primary');
  });

  test('renders with mode and large classes', () => {
    const wrapper = mount(Badge, {
      props: {
        type: 'number',
        mode: 'critical',
        large: true,
      },
      slots: {
        default: '99',
      },
    });

    expect(wrapper.classes()).toContain('badge--critical');
    expect(wrapper.classes()).toContain('badge--large');
  });

  test('renders Subheadline when large is true and type is number', () => {
    const wrapper = mount(Badge, {
      props: {
        type: 'number',
        large: true,
      },
      slots: {
        default: '42',
      },
    });

    expect(wrapper.findComponent({ name: 'Subheadline' }).exists()).toBe(true);
    expect(wrapper.text()).toBe('42');
  });

  test('renders Caption when large is false and type is number', () => {
    const wrapper = mount(Badge, {
      props: {
        type: 'number',
        large: false,
      },
      slots: {
        default: '7',
      },
    });

    expect(wrapper.findComponent({ name: 'Caption' }).exists()).toBe(true);
    expect(wrapper.text()).toBe('7');
  });

  test('renders nothing inside for dot type', () => {
    const wrapper = mount(Badge, {
      props: {
        type: 'dot',
      },
      slots: {
        default: 'ignored',
      },
    });

    // Still renders the outer span
    expect(wrapper.find('span').exists()).toBe(true);

    expect(wrapper.findComponent({ name: 'Caption' }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'Subheadline' }).exists()).toBe(false);

    expect(wrapper.text().trim()).toBe('');
  });
});
