import { mount, randomString } from '@/lib/tests';
import Divider from '../Divider.vue';

describe('Divider', () => {
  test('renders an hr element with correct class', () => {
    const wrapper = mount(Divider);

    const hr = wrapper.find('hr');
    expect(hr.exists()).toBe(true);
    expect(hr.classes()).toContain('divider');
  });

  test('forwards additional attributes to <hr>', () => {
    const id = randomString();
    const wrapper = mount(Divider, {
      attrs: {
        id,
        'aria-hidden': 'true',
      },
    });

    const hr = wrapper.find('hr');
    expect(hr.attributes('id')).toBe(id);
    expect(hr.attributes('aria-hidden')).toBe('true');
  });
});
