import { mount } from '@/lib/tests';
import ImageBadge from '../ImageBadge.vue';

describe('ImageBadge', () => {
  test('renders badge with type="number"', () => {
    const wrapper = mount(ImageBadge, {
      attrs: {
        type: 'number',
      },
      slots: {
        default: '3',
      },
    });

    expect(wrapper.find('.image-badge').exists()).toBe(true);
    expect(wrapper.text()).toBe('3');
  });

  test('does not render if type is not "number" and throws error', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const wrapper = mount(ImageBadge, {
      attrs: { type: 'info' },
    });

    const badge = wrapper.findComponent({ name: 'Badge' });
    expect(badge.exists()).toBe(false);

    expect(errorSpy).toHaveBeenCalledWith(
      '[ImageBadge]: Component supports only type="number"'
    );

    errorSpy.mockRestore();
  });
});
