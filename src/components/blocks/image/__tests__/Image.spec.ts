import { mount } from '@/lib/tests';
import Image from '../Image.vue';

const fallbackIcon = '<svg class="test-fallback-icon" />';

describe('Image', () => {
  test('renders image with correct size and border-radius', () => {
    const wrapper = mount(Image, {
      props: { size: 48 },
      attrs: { src: 'image.png', alt: 'avatar' },
    });

    const div = wrapper.find('div');

    expect(div.attributes('style')).toContain('width: 48px');
    expect(div.classes()).not.toContain('wrapper--loaded');
  });

  test('renders slot content', () => {
    const wrapper = mount(Image, {
      slots: {
        default: '<span class="test-child">badge</span>',
      },
    });

    expect(wrapper.find('.test-child').exists()).toBe(true);
  });

  test('emits load event and adds loaded class', async () => {
    const wrapper = mount(Image, {
      attrs: { src: 'image.png' },
    });

    const img = wrapper.find('img');
    await img.trigger('load');

    expect(wrapper.emitted('load')).toBeTruthy();
    expect(wrapper.classes()).toContain('wrapper--loaded');
  });

  test('emits error event and shows fallback icon', async () => {
    const wrapper = mount(Image, {
      attrs: { src: 'image.png' },
      slots: {
        'fallback-icon': fallbackIcon,
      },
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(wrapper.emitted('error')).toBeTruthy();
    expect(wrapper.find('.fallback').exists()).toBe(true);
    expect(wrapper.find('.test-fallback-icon').exists()).toBe(true);
  });

  test('shows fallback icon when no src and fallback-icon slot exists', () => {
    const wrapper = mount(Image, {
      slots: {
        'fallback-icon': fallbackIcon,
      },
    });

    expect(wrapper.find('.test-fallback-icon').exists()).toBe(true);
  });

  test('does not show fallback if slot is missing', () => {
    const wrapper = mount(Image, {
      attrs: { src: '' },
    });

    expect(wrapper.find('.fallback').exists()).toBe(false);
  });
});
