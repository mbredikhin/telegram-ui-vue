import { mount, randomString } from '@/lib/tests';
import Cell from '../Cell.vue';

describe('Cell', () => {
  test('renders default slot content', () => {
    const content = randomString();
    const wrapper = mount(Cell, {
      slots: { default: content },
    });

    expect(wrapper.text()).toContain(content);
  });

  test('renders subhead, hint, and subtitle', () => {
    const subhead = randomString();
    const hint = randomString();
    const subtitle = randomString();
    const wrapper = mount(Cell, {
      slots: {
        subhead: `<span>${subhead}</span>`,
        hint: `<span>${hint}</span>`,
        subtitle: `<span>${subtitle}</span>`,
      },
    });

    expect(wrapper.html()).toContain(subhead);
    expect(wrapper.html()).toContain(hint);
    expect(wrapper.html()).toContain(subtitle);
  });

  test('applies hovered and multiline classes', () => {
    const wrapper = mount(Cell, {
      props: {
        hovered: true,
        multiline: true,
      },
    });

    expect(wrapper.classes()).toContain('cell--hovered');
    expect(wrapper.classes()).toContain('cell--multiline');
  });

  test('renders before and after slots', () => {
    const wrapper = mount(Cell, {
      slots: {
        before: '<div class="test-before"></div>',
        after: '<div class="test-after"></div>',
      },
    });

    expect(wrapper.find('.test-before').exists()).toBe(true);
    expect(wrapper.find('.test-after').exists()).toBe(true);
  });
});
