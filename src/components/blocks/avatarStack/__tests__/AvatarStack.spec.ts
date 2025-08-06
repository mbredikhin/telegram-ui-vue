import { mount } from '@/lib/tests';
import AvatarStack from '../AvatarStack.vue';

describe('AvatarStack', () => {
  test('renders slot content', () => {
    const wrapper = mount(AvatarStack, {
      slots: {
        default: `
          <div class="avatar">A</div>
          <div class="avatar">B</div>
        `,
      },
    });

    const avatars = wrapper.findAll('.avatar');

    expect(avatars).toHaveLength(2);
    expect(avatars[0].text()).toBe('A');
    expect(avatars[1].text()).toBe('B');
  });
});
