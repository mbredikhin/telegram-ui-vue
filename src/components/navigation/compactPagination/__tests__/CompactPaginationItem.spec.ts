import { h } from 'vue';
import { mount, randomString } from '@/lib/tests';
import CompactPaginationItem from '../CompactPaginationItem.vue';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('CompactPaginationItem', () => {
  test('renders a button with correct default classes and role', () => {
    const wrapper = mount(CompactPaginationItem);
    const button = wrapper.get('button');

    expect(button.attributes('role')).toBe('tab');
    expect(button.classes()).toContain('compact-pagination-item');
    expect(button.classes()).not.toContain('compact-pagination-item--selected');
    expect(button.attributes('aria-selected')).toBe('false');
  });

  test('applies selected styles and aria-selected="true" when selected', () => {
    const wrapper = mount(CompactPaginationItem, {
      props: { selected: true },
    });

    const button = wrapper.get('button');
    expect(button.classes()).toContain('compact-pagination-item--selected');
    expect(button.attributes('aria-selected')).toBe('true');
  });

  test('renders slot content inside VisuallyHidden when slot is present', () => {
    const label = randomString();
    const wrapper = mount(CompactPaginationItem, {
      slots: {
        default: () => h('span', label),
      },
    });

    const visuallyHidden = wrapper.findComponent({ name: 'VisuallyHidden' });
    expect(visuallyHidden.exists()).toBe(true);
    expect(visuallyHidden.text()).toBe(label);
  });

  test('forwards arbitrary attributes to the button', () => {
    const testAttr = randomString();
    const wrapper = mount(CompactPaginationItem, {
      attrs: {
        'data-test': testAttr,
      },
    });

    const button = wrapper.get('button');
    expect(button.attributes('data-test')).toBe(testAttr);
  });
});
