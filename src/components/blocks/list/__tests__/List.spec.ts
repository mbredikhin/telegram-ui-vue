import List from '../List.vue';
import { mount } from '@/lib/tests';
import { Mock } from 'vitest';
import { h } from 'vue';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('List', () => {
  test('renders as div by default', () => {
    const wrapper = mount(List, {
      slots: {
        default: () => 'List item',
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('list');
  });

  test('renders with custom tag', () => {
    const wrapper = mount(List, {
      props: {
        is: 'ul',
      },
      slots: {
        default: () => h('li', 'List item'),
      },
    });

    expect(wrapper.element.tagName).toBe('UL');
    expect(wrapper.html()).toContain('<li>List item</li>');
  });

  test('does not add ios class on base platform', async () => {
    const wrapper = mount(List);

    expect(wrapper.classes()).not.toContain('list--ios');
  });

  test('adds ios class when platform is ios', async () => {
    const { usePlatform } = await import('@/composables/usePlatform');
    (usePlatform as Mock).mockReturnValue('ios');

    const wrapper = mount(List);

    expect(wrapper.classes()).toContain('list--ios');
  });
});
