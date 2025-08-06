import { mount } from '@/lib/tests';
import Spinner from '../Spinner.vue';
import BaseSpinner from '../BaseSpinner/BaseSpinner.vue';
import IosSpinner from '../IosSpinner/IosSpinner.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Spinner', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders BaseSpinner on base platform', () => {
    const wrapper = mount(Spinner, {
      props: { size: 'm' },
    });

    expect(wrapper.findComponent(BaseSpinner).exists()).toBe(true);
    expect(wrapper.classes()).toContain('spinner');
    expect(wrapper.classes()).toContain('spinner--m');
    expect(wrapper.classes()).not.toContain('spinner--ios');
  });

  test('renders IosSpinner on iOS platform', async () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Spinner, {
      props: { size: 's' },
    });

    expect(wrapper.findComponent(IosSpinner).exists()).toBe(true);
    expect(wrapper.classes()).toContain('spinner--ios');
    expect(wrapper.classes()).toContain('spinner--s');
  });

  test('defaults to medium size when no size prop is given', () => {
    const wrapper = mount(Spinner);

    expect(wrapper.classes()).toContain('spinner--m');
  });
});
