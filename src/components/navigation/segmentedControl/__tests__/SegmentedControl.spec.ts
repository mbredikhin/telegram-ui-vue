import { mount } from '@vue/test-utils';
import { h, nextTick, ref } from 'vue';
import SegmentedControl from '@/components/navigation/segmentedControl/SegmentedControl.vue';
import SegmentedControlItem, {
  SegmentedControlItemProps,
} from '@/components/navigation/segmentedControl/SegmentedControlItem.vue';
import { randomString } from '@/lib/tests';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('SegmentedControl', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const segmentedControlItemTexts = [
    randomString(),
    randomString(),
    randomString(),
  ];
  const getSegmentedControlItems = (
    props: SegmentedControlItemProps[] = []
  ) => [
    h(SegmentedControlItem, props[0], () => segmentedControlItemTexts[0]),
    h(SegmentedControlItem, props[1], () => segmentedControlItemTexts[1]),
    h(SegmentedControlItem, props[2], () => segmentedControlItemTexts[2]),
  ];

  test('renders items', () => {
    const wrapper = mount(SegmentedControl, {
      slots: {
        default: () => h('div', null, getSegmentedControlItems()),
      },
    });

    expect(wrapper.text()).toContain(segmentedControlItemTexts[0]);
    expect(wrapper.text()).toContain(segmentedControlItemTexts[1]);
    expect(wrapper.text()).toContain(segmentedControlItemTexts[2]);
  });

  test('does not render slider if no item is selected', () => {
    const wrapper = mount(SegmentedControl, {
      slots: {
        default: () => h('div', null, getSegmentedControlItems()),
      },
    });

    expect(wrapper.find('.slider').exists()).toBe(false);
  });

  test('renders slider at correct position when an item is selected', async () => {
    const wrapper = mount({
      components: { SegmentedControl, SegmentedControlItem },
      setup() {
        const items = [randomString(), randomString(), randomString()];
        const selected = ref(items[0]);

        return { items, selected };
      },
      template: `
      <SegmentedControl>
        <SegmentedControlItem
          v-for="item of items"
          :key="item"
          :selected="selected === item"
          @click="selected = item"
        >
          {{ item }}
        </SegmentedControlItem>
      </SegmentedControl>
      `,
    });

    const slider = wrapper.find('.slider');

    expect(slider.exists()).toBe(true);
    expect(slider.attributes('style')).toContain('translateX(0%)');

    const items = wrapper.findAllComponents(SegmentedControlItem);
    await items[1].trigger('click');
    await nextTick();

    expect(slider.exists()).toBe(true);
    expect(slider.attributes('style')).toContain('translateX(100%)');
  });

  test('applies ios class when platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(SegmentedControl, {
      slots: {
        default: () => h('div', null, getSegmentedControlItems()),
      },
    });

    expect(wrapper.classes()).toContain('segmented-control--ios');
  });
});
