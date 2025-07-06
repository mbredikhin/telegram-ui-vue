import { mount } from '@/lib/tests';
import IosSpinner from '../IosSpinner.vue';
import SmallIcon from '../icons/Small.vue';
import MediumIcon from '../icons/Medium.vue';
import LargeIcon from '../icons/Large.vue';

describe('IosSpinner', () => {
  test('renders Small icon when size="s"', () => {
    const wrapper = mount(IosSpinner, {
      props: { size: 's' },
    });

    expect(wrapper.findComponent(SmallIcon).exists()).toBe(true);
  });

  test('renders Medium icon when size="m"', () => {
    const wrapper = mount(IosSpinner, {
      props: { size: 'm' },
    });

    expect(wrapper.findComponent(MediumIcon).exists()).toBe(true);
  });

  test('renders Large icon when size="l"', () => {
    const wrapper = mount(IosSpinner, {
      props: { size: 'l' },
    });

    expect(wrapper.findComponent(LargeIcon).exists()).toBe(true);
  });
});
