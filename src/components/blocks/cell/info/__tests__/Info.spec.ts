import { mount, randomString } from '@/lib/tests';
import Info from '../Info.vue';

describe('Info', () => {
  test('renders default and subtitle content when type is "text"', () => {
    const content = randomString();
    const subtitle = randomString();
    const wrapper = mount(Info, {
      props: { type: 'text' },
      slots: {
        default: content,
        subtitle: subtitle,
      },
    });
    expect(wrapper.text()).toContain(content);
    expect(wrapper.text()).toContain(subtitle);
  });

  test('renders avatar stack slot when type is "avatarStack"', () => {
    const wrapper = mount(Info, {
      props: { type: 'avatarStack' },
      slots: {
        'avatar-stack': '<div class="test-stack"></div>',
      },
    });
    expect(wrapper.find('.test-stack').exists()).toBe(true);
  });

  test('applies correct class based on type', () => {
    const wrapper = mount(Info, { props: { type: 'avatarStack' } });
    expect(wrapper.classes()).toContain('info--avatarStack');
  });
});
