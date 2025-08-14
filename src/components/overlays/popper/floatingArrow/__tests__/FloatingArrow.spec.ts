import { mount } from '@/lib/tests';
import FloatingArrow from '../FloatingArrow.vue';
import { h, markRaw } from 'vue';

describe('FloatingArrow', () => {
  test('renders with default props', () => {
    const wrapper = mount(FloatingArrow);

    expect(wrapper.classes()).toContain('floating-arrow');
    expect(wrapper.classes()).not.toContain('floating-arrow--placement-bottom');
    expect(wrapper.find('.icon').exists()).toBe(true);
  });

  test('applies placement classes correctly', () => {
    const placements: [string, string][] = [
      ['top', 'floating-arrow--placement-bottom'],
      ['right', 'floating-arrow--placement-left'],
      ['bottom', ''],
      ['left', 'floating-arrow--placement-right'],
    ];

    for (const [placement, expectedClass] of placements) {
      const wrapper = mount(FloatingArrow, {
        props: { placement },
      });

      if (expectedClass) {
        expect(wrapper.classes()).toContain(expectedClass);
      } else {
        expect(wrapper.classes()).toEqual(
          expect.not.arrayContaining([
            'floating-arrow--placement-right',
            'floating-arrow--placement-bottom',
            'floating-arrow--placement-left',
          ])
        );
      }
    }
  });

  test('applies inline styles from useFloatingArrow', () => {
    const wrapper = mount(FloatingArrow, {
      props: {
        placement: 'top',
        coords: { x: 10 },
        offset: 5,
      },
    });

    const style = wrapper.attributes('style');
    // left = coords.x + offset
    expect(style).toContain('left: 15px;');
    expect(style).toContain('top: 100%;');
  });

  test('renders custom icon when provided', () => {
    const CustomIcon = markRaw({
      name: 'CustomIcon',
      render() {
        return h('span', { class: 'test-icon' }, 'icon');
      },
    });
    const wrapper = mount(FloatingArrow, {
      props: {
        icon: CustomIcon,
      },
    });

    expect(wrapper.find('.test-icon').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'CustomIcon' }).exists()).toBe(true);
  });

  test('respects static offset', () => {
    const wrapper = mount(FloatingArrow, {
      props: {
        placement: 'right',
        coords: { y: 200 },
        offset: 50,
        isStaticOffset: true,
      },
    });

    const style = wrapper.attributes('style');
    expect(style).toContain('top: 50px;');
  });
});
