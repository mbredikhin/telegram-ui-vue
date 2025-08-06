import { mount, randomString } from '@/lib/tests';
import Timeline from '../Timeline.vue';
import TimelineItem from '../TimelineItem.vue';
import { h } from 'vue';

describe('Timeline', () => {
  const getTimelineItems = () => [
    () => h(TimelineItem, { header: 'Step 1' }, () => 'First'),
    () => h(TimelineItem, { header: 'Step 2' }, () => 'Second'),
    () => h(TimelineItem, { header: 'Step 3' }, () => 'Third'),
  ];

  test('renders the correct number of timeline items', () => {
    const wrapper = mount(Timeline, {
      props: { active: 1 },
      slots: {
        default: getTimelineItems(),
      },
    });

    expect(wrapper.findAll('.timeline-item')).toHaveLength(3);
  });

  test('sets mode correctly based on active prop', () => {
    const wrapper = mount(Timeline, {
      props: { active: 1 },
      slots: {
        default: getTimelineItems(),
      },
    });

    const items = wrapper.findAll('.timeline-item');

    expect(items[0].classes()).toContain('timeline-item--active');
    expect(items[1].classes()).toContain('timeline-item--pre-active');
    expect(items[2].classes()).not.toContain('timeline-item--active');
    expect(items[2].classes()).not.toContain('timeline-item--pre-active');
  });

  test('renders in horizontal mode', () => {
    const wrapper = mount(Timeline, {
      props: {
        horizontal: true,
        active: 0,
      },
      slots: {
        default: getTimelineItems(),
      },
    });

    expect(wrapper.classes()).toContain('timeline--horizontal');

    const items = wrapper.findAll('.timeline-item');

    for (const item of items) {
      expect(item.classes()).toContain('timeline-item--horizontal');
    }
  });

  test('renders properly if no active prop is provided', () => {
    const wrapper = mount(Timeline, {
      slots: {
        default: getTimelineItems(),
      },
    });

    const items = wrapper.findAll('.timeline-item');

    expect(items[0].classes()).not.toContain('timeline-item--active');
    expect(items[0].classes()).not.toContain('timeline-item--pre-active');
  });

  test('applies props only if timeline item is vnode', () => {
    const textNodeContent = randomString();
    const wrapper = mount(Timeline, {
      props: { active: 1, horizontal: true },
      slots: {
        default: [...getTimelineItems(), () => textNodeContent],
      },
    });

    const items = wrapper.findAll('.timeline-item');

    // Checking rendering of TimelineItem instances
    expect(items).toHaveLength(3);
    expect(items[0].classes()).toContain('timeline-item--active');
    expect(items[1].classes()).toContain('timeline-item--pre-active');

    // Checking rendering of raw string
    const raw = wrapper
      .findAll('li')
      .filter((el) => !el.classes().includes('timeline-item'));

    expect(raw.length).toBe(0); // raw strings shouldn't be rendered as li elements
    expect(wrapper.text()).toContain(textNodeContent);
  });
});
