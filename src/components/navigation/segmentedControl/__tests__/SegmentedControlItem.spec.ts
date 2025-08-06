import { mount, randomString } from '@/lib/tests';
import SegmentedControlItem from '../SegmentedControlItem.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('SegmentedControlItem', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders with base class', () => {
    const wrapper = mount(SegmentedControlItem, {});

    expect(wrapper.classes()).toContain('segmented-control-item');
  });

  test('adds ios class on iOS platform', async () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(SegmentedControlItem, {});

    expect(wrapper.classes()).toContain('segmented-control-item--ios');
  });

  test('binds HTML attributes', () => {
    const id = randomString();
    const wrapper = mount(SegmentedControlItem, {
      attrs: { id },
    });

    expect(wrapper.attributes('id')).toBe(id);
  });
});
