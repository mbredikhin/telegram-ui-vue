import AvatarBadge from '../AvatarBadge.vue';
import { mount } from '@/lib/tests';

describe('AvatarBadge', () => {
  test('renders when type is "number"', () => {
    const wrapper = mount(AvatarBadge, {
      attrs: {
        type: 'number',
      },
      slots: {
        default: '99+',
      },
    });

    expect(wrapper.find('.avatar-badge').exists()).toBe(true);
    expect(wrapper.text()).toContain('99+');
  });

  test('does not render when type is not "number"', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const wrapper = mount(AvatarBadge, {
      attrs: {
        type: 'text',
      },
      slots: {
        default: 'Invalid',
      },
    });

    const badge = wrapper.findComponent({ name: 'Badge' });

    expect(badge.exists()).toBe(false);
    expect(spy).toHaveBeenCalledWith(
      '[AvatarBadge]: Component supports only type="number"'
    );
    spy.mockRestore();
  });
});
