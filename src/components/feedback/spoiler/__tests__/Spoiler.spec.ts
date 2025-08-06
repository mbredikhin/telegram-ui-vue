import { mount, randomString } from '@/lib/tests';
import Spoiler from '../Spoiler.vue';

describe('Spoiler', () => {
  test('does not show content by default', () => {
    const wrapper = mount(Spoiler);

    expect(wrapper.classes()).not.toContain('spoiler--visible');
  });

  test('shows content when `visible` prop is true', () => {
    const wrapper = mount(Spoiler, {
      props: { visible: true },
    });

    expect(wrapper.classes()).toContain('spoiler--visible');
  });

  test('toggles visibility on click', async () => {
    const wrapper = mount(Spoiler);

    await wrapper.trigger('click');

    expect(wrapper.classes()).toContain('spoiler--visible');

    await wrapper.trigger('click');

    expect(wrapper.classes()).not.toContain('spoiler--visible');
  });

  test('toggles visibility on keydown', async () => {
    const wrapper = mount(Spoiler);

    await wrapper.trigger('keydown');

    expect(wrapper.classes()).toContain('spoiler--visible');
  });

  test('reacts to external `visible` prop change', async () => {
    const wrapper = mount(Spoiler, {
      props: { visible: false },
    });

    expect(wrapper.classes()).not.toContain('spoiler--visible');

    await wrapper.setProps({ visible: true });

    expect(wrapper.classes()).toContain('spoiler--visible');
  });

  test('renders slot content', () => {
    const text = randomString();
    const wrapper = mount(Spoiler, {
      slots: {
        default: `<span class="test-content">${text}</span>`,
      },
    });

    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.find('.test-content').text()).toBe(text);
  });
});
