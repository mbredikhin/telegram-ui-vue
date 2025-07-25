import { mount, randomString } from '@/lib/tests';
import Tabbar from '../Tabbar.vue';
import { usePlatform } from '@/composables/usePlatform';
import { Mock } from 'vitest';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Tabbar', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders with base platform class', () => {
    const wrapper = mount(Tabbar);

    expect(wrapper.findComponent('.tabbar').exists()).toBe(true);
    expect(wrapper.classes()).toContain('tabbar');
    expect(wrapper.classes()).not.toContain('tabbar--ios');
  });

  test('adds ios class on ios platform', () => {
    (usePlatform as Mock).mockReturnValue('ios');

    const wrapper = mount(Tabbar);

    expect(wrapper.classes()).toContain('tabbar');
    expect(wrapper.classes()).toContain('tabbar--ios');
  });

  test('renders tabs', () => {
    const text = randomString();
    const wrapper = mount(Tabbar, {
      slots: {
        default: `<div class="test-tab">${text}</div>`,
      },
    });

    expect(wrapper.find('.test-tab').exists()).toBe(true);
    expect(wrapper.find('.test-tab').text()).toBe(text);
  });

  test('renders inside FixedLayout', () => {
    const wrapper = mount(Tabbar);

    const fixedLayout = wrapper.findComponent({ name: 'FixedLayout' });
    expect(fixedLayout.exists()).toBe(true);
  });
});
