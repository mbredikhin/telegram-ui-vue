import { h } from 'vue';
import { mount, randomString } from '@/lib/tests';
import Link from '../Link.vue';

describe('Link', () => {
  test('renders an anchor with base class', () => {
    const wrapper = mount(Link);

    const anchor = wrapper.find('a');

    expect(anchor.exists()).toBe(true);
    expect(anchor.classes()).toContain('link');
  });

  test('renders slot content', () => {
    const content = randomString();
    const wrapper = mount(Link, {
      slots: {
        default: () => h('span', content),
      },
    });

    expect(wrapper.text()).toContain(content);
    expect(wrapper.find('span').exists()).toBe(true);
  });

  test('binds passed HTML attributes to anchor element', () => {
    const wrapper = mount(Link, {
      attrs: {
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener',
      },
    });

    const anchor = wrapper.get('a');

    expect(anchor.attributes('href')).toBe('https://example.com');
    expect(anchor.attributes('target')).toBe('_blank');
    expect(anchor.attributes('rel')).toBe('noopener');
  });
});
