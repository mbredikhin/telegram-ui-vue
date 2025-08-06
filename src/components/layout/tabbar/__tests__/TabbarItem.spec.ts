import { mount, randomString } from '@/lib/tests';
import TabbarItem from '../TabbarItem.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('TabbarItem', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders with default classes', () => {
    const wrapper = mount(TabbarItem);

    expect(wrapper.classes()).toContain('tabbar-item');
    expect(wrapper.classes()).not.toContain('tabbar-item--selected');
  });

  test('adds selected class when selected prop is true', () => {
    const wrapper = mount(TabbarItem, {
      props: {
        selected: true,
      },
    });

    expect(wrapper.classes()).toContain('tabbar-item--selected');
  });

  test('adds ios class when platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(TabbarItem);

    expect(wrapper.classes()).toContain('tabbar-item--ios');
  });

  test('renders icon slot if provided', () => {
    const iconContent = randomString();
    const wrapper = mount(TabbarItem, {
      slots: {
        default: `<div class="test-icon">${iconContent}</div>`,
      },
    });

    const icon = wrapper.find('.icon');

    expect(icon.exists()).toBe(true);
    expect(icon.text()).toContain(iconContent);
  });

  test('renders text slot inside Caption', () => {
    const text = randomString();
    const wrapper = mount(TabbarItem, {
      slots: {
        text: `<span class="test-text">${text}</span>`,
      },
    });

    const caption = wrapper.findComponent({ name: 'Caption' });

    expect(caption.exists()).toBe(true);
    expect(wrapper.find('.text').text()).toContain(text);
  });

  test('passes extra attrs to Tappable', () => {
    const label = randomString();
    const title = randomString();
    const wrapper = mount(TabbarItem, {
      attrs: {
        'aria-label': label,
        title,
      },
    });

    const tappable = wrapper.find('button');

    expect(tappable.attributes('aria-label')).toBe(label);
    expect(tappable.attributes('title')).toBe(title);
  });
});
