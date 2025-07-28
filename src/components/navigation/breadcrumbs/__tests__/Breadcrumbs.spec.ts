import { h } from 'vue';
import { mount } from '@/lib/tests';
import Breadcrumbs from '../Breadcrumbs.vue';
import DotIcon from '../icons/dot.svg';
import SlashIcon from '../icons/slash.svg';
import Chevron16Icon from '@/icons/16/chevron.svg';
import BreadcrumbsItem from '../BreadcrumbsItem.vue';

describe('Breadcrumbs', () => {
  const getBreadcrumbs = () => [
    () => h(BreadcrumbsItem, () => 'First'),
    () => h(BreadcrumbsItem, () => 'Second'),
    () => h(BreadcrumbsItem, () => 'Third'),
  ];

  test('renders slot content with dot dividers by default', () => {
    const wrapper = mount(Breadcrumbs, {
      slots: {
        default: getBreadcrumbs(),
      },
    });

    const items = wrapper.findAllComponents(BreadcrumbsItem);
    expect(items).toHaveLength(3);
    expect(wrapper.findAllComponents(DotIcon)).toHaveLength(2);
    expect(wrapper.findAllComponents(SlashIcon)).toHaveLength(0);
    expect(wrapper.findAllComponents(Chevron16Icon)).toHaveLength(0);
  });

  test('renders slash dividers when divider="slash"', () => {
    const wrapper = mount(Breadcrumbs, {
      props: { divider: 'slash' },
      slots: {
        default: getBreadcrumbs(),
      },
    });

    expect(wrapper.findAllComponents(SlashIcon)).toHaveLength(2);
    expect(wrapper.findAllComponents(DotIcon)).toHaveLength(0);
    expect(wrapper.findAllComponents(Chevron16Icon)).toHaveLength(0);
  });

  test('renders chevron dividers with correct class when divider="chevron"', () => {
    const wrapper = mount(Breadcrumbs, {
      props: { divider: 'chevron' },
      slots: {
        default: getBreadcrumbs(),
      },
    });

    const chevrons = wrapper.findAllComponents(Chevron16Icon);
    expect(chevrons).toHaveLength(2);
    chevrons.forEach((icon) => {
      expect(icon.classes()).toContain('chevron');
    });
  });

  test('does not render dividers for a single child', () => {
    const wrapper = mount(Breadcrumbs, {
      slots: {
        default: getBreadcrumbs().slice(0, 1),
      },
    });

    expect(wrapper.findAll('.divider')).toHaveLength(0);
  });
});
