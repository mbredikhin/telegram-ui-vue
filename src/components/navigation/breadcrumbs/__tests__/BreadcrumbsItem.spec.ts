import { mount, randomString } from '@/lib/tests';
import BreadcrumbsItem from '../BreadcrumbsItem.vue';
import { randomInt } from 'crypto';

describe('BreadcrumbsItem', () => {
  test('renders with default tag', () => {
    const text = randomString();
    const wrapper = mount(BreadcrumbsItem, {
      slots: {
        default: () => text,
      },
    });

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('breadcrumbs-item');
    expect(wrapper.text()).toBe(text);
  });

  test('renders with custom tag via `is` prop', () => {
    const href = randomString();
    const text = randomString();
    const wrapper = mount(BreadcrumbsItem, {
      props: {
        is: 'a',
      },
      attrs: {
        href,
      },
      slots: {
        default: () => text,
      },
    });

    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe(href);
    expect(wrapper.text()).toBe(text);
  });

  test('wraps content inside Subheadline', () => {
    const text = randomString();
    const wrapper = mount(BreadcrumbsItem, {
      slots: {
        default: () => text,
      },
    });

    const subheadline = wrapper.findComponent({ name: 'Subheadline' });
    expect(subheadline.exists()).toBe(true);
    expect(subheadline.text()).toBe(text);
  });

  test('forwards additional attributes', () => {
    const label = randomString();
    const tabindex = randomInt(1, 3);
    const wrapper = mount(BreadcrumbsItem, {
      attrs: {
        'aria-label': label,
        tabindex,
      },
    });

    expect(wrapper.attributes('aria-label')).toBe(label);
    expect(wrapper.attributes('tabindex')).toBe(String(tabindex));
  });
});
