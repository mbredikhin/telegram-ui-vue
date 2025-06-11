import AvatarAcronym from '../AvatarAcronym.vue';
import { mount, randomString } from '@/helpers/tests';

describe('AvatarAcronym', () => {
  test('displays slot content', () => {
    const content = randomString(2);
    const wrapper = mount(AvatarAcronym, {
      props: { size: 40 },
      slots: {
        default: content,
      },
    });

    expect(wrapper.text()).toContain(content);
  });
});
