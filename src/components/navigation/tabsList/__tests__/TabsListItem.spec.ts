import { mount, randomString } from '@/lib/tests';
import TabsListItem from '../TabsListItem.vue';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('TabsListItem', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders with base class', () => {
    const text = randomString();
    const wrapper = mount(TabsListItem, {
      slots: { default: () => text },
    });

    expect(wrapper.classes()).toContain('tabs-list-item');
    expect(wrapper.text()).toBe(text);
  });

  test('adds selected class when selected is true', () => {
    const wrapper = mount(TabsListItem, {
      props: { selected: true },
      slots: { default: () => 'Selected' },
    });

    expect(wrapper.classes()).toContain('tabs-list-item--selected');
  });

  test('does not add selected class when selected is false', () => {
    const wrapper = mount(TabsListItem, {
      props: { selected: false },
      slots: { default: () => 'Not Selected' },
    });

    expect(wrapper.classes()).not.toContain('tabs-list-item--selected');
  });
});
