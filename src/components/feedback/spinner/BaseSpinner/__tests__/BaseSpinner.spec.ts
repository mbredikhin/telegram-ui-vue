import { mount } from '@/lib/tests';
import BaseSpinner from '../BaseSpinner.vue';
import SmallIcon from '../icons/Small.vue';
import MediumIcon from '../icons/Medium.vue';
import LargeIcon from '../icons/Large.vue';

describe('BaseSpinner', () => {
  test('renders Small icon when size="s"', () => {
    const wrapper = mount(BaseSpinner, {
      props: { size: 's' },
    });

    expect(wrapper.findComponent(SmallIcon).exists()).toBe(true);
  });

  test('renders Medium icon when size="m"', () => {
    const wrapper = mount(BaseSpinner, {
      props: { size: 'm' },
    });

    expect(wrapper.findComponent(MediumIcon).exists()).toBe(true);
  });

  test('renders Large icon when size="l"', () => {
    const wrapper = mount(BaseSpinner, {
      props: { size: 'l' },
    });

    expect(wrapper.findComponent(LargeIcon).exists()).toBe(true);
  });

  test('includes spinning animation', () => {
    const wrapper = mount(BaseSpinner, {
      props: { size: 'm' },
    });

    const animateTransformEl = wrapper.find('animateTransform');

    expect(animateTransformEl.exists()).toBe(true);
    expect(animateTransformEl.attributes('attributeName')).toBe('transform');
    expect(animateTransformEl.attributes('type')).toBe('rotate');
  });
});
