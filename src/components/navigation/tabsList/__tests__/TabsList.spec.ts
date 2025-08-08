import { h, nextTick, ref } from 'vue';
import { mount, randomString } from '@/lib/tests';
import TabsList from '../TabsList.vue';
import TabsListItem, { TabsListItemProps } from '../TabsListItem.vue';

describe('TabsList', () => {
  const tabTexts = [randomString(), randomString(), randomString()];
  const getTabsListItems = (props: TabsListItemProps[] = []) => [
    h(TabsListItem, props[0], () => tabTexts[0]),
    h(TabsListItem, props[1], () => tabTexts[1]),
    h(TabsListItem, props[2], () => tabTexts[2]),
  ];

  test('renders tabs', () => {
    const wrapper = mount(TabsList, {
      slots: {
        default: () => h('div', null, getTabsListItems()),
      },
    });

    expect(wrapper.text()).toContain(tabTexts[0]);
    expect(wrapper.text()).toContain(tabTexts[1]);
    expect(wrapper.text()).toContain(tabTexts[2]);
  });

  test('does not render slider if no tab is selected', () => {
    const wrapper = mount(TabsList, {
      slots: {
        default: () => h('div', null, getTabsListItems()),
      },
    });

    expect(wrapper.find('.slider').exists()).toBe(false);
  });

  test('renders slider at correct position if a tab is selected', async () => {
    const wrapper = mount({
      components: { TabsList, TabsListItem },
      setup() {
        const tabs = [randomString(), randomString(), randomString()];
        const selected = ref(tabs[0]);

        return { tabs, selected };
      },
      template: `
        <TabsList>
          <TabsListItem
            v-for="tab of tabs"
            :key="tab"
            :selected="selected === tab"
            @click="selected = tab"
          >
            {{ tab }}
          </TabsListItem>
        </TabsList>
        `,
    });

    const slider = wrapper.find('.slider');

    expect(slider.exists()).toBe(true);
    expect(slider.attributes('style')).toContain('translateX(0%)');

    const items = wrapper.findAllComponents(TabsListItem);
    await items[1].trigger('click');
    await nextTick();

    expect(slider.exists()).toBe(true);
    expect(slider.attributes('style')).toContain('translateX(100%)');
  });
});
