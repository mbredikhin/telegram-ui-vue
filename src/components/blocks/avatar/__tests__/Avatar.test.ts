import Avatar from '../Avatar.vue';
import { mount, randomString } from '@/helpers/tests';

describe('Avatar', () => {
  test('displays acronym as fallback', () => {
    const acronym = randomString(2);
    const wrapper = mount(Avatar, {
      props: {
        src: '',
        acronym,
      },
    });
    const fallback = wrapper.find('.fallback > .typography');

    expect(fallback.text()).toBe(acronym);
  });
});
