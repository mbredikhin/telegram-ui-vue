import { mount, randomString } from '@/lib/tests';
import Navigation from '../Navigation.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Navigation', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders slot text if provided', () => {
    const content = randomString();
    const wrapper = mount(Navigation, {
      slots: { default: content },
    });

    expect(wrapper.text()).toBe(content);
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  test('shows chevron icon if no slot provided and platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Navigation);

    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
