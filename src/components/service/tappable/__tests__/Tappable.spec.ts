import { mount } from '@/lib/tests';
import Tappable from '../Tappable.vue';
import Ripple from '../Ripple.vue';
import { usePlatform } from '@/composables/usePlatform';
import { useRipple } from '../lib';
import { ref } from 'vue';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

vi.mock('../lib', () => ({
  useRipple: vi.fn(() => ({
    clicks: ref([]),
    onPointerDown: vi.fn(),
    onPointerCancel: vi.fn(),
  })),
}));

describe('Tappable', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders default as div with base platform', () => {
    const wrapper = mount(Tappable);

    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.classes()).toContain('tappable');
    expect(wrapper.classes()).not.toContain('tappable--ios');
  });

  test('applies ios class when platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Tappable);

    expect(wrapper.classes()).toContain('tappable--ios');
  });

  test('applies opacity class when interactiveAnimation is opacity', () => {
    const wrapper = mount(Tappable, {
      props: { interactiveAnimation: 'opacity' },
    });

    expect(wrapper.classes()).toContain('tappable--opacity');
  });

  test('renders Ripple when platform=base and background animation', () => {
    const wrapper = mount(Tappable, {
      props: { interactiveAnimation: 'background' },
    });

    const ripple = wrapper.findComponent(Ripple);

    expect(ripple.exists()).toBe(true);
  });

  test('does not render Ripple on ios platform', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Tappable);

    const ripple = wrapper.findComponent(Ripple);

    expect(ripple.exists()).toBe(false);
  });

  test('does not render Ripple if readonly attr is set', () => {
    const wrapper = mount(Tappable, {
      attrs: { readonly: true },
    });

    const ripple = wrapper.findComponent(Ripple);

    expect(ripple.exists()).toBe(false);
  });

  test('forwards pointer events to ripple handlers', async () => {
    const onPointerDown = vi.fn();
    const onPointerCancel = vi.fn();
    vi.mocked(useRipple).mockReturnValue({
      clicks: ref([]),
      onPointerDown,
      onPointerCancel,
    });

    const wrapper = mount(Tappable);
    await wrapper.trigger('pointerdown');
    await wrapper.trigger('pointercancel');

    expect(onPointerDown).toHaveBeenCalled();
    expect(onPointerCancel).toHaveBeenCalled();
  });

  test('renders custom tag via is prop', () => {
    const wrapper = mount(Tappable, {
      props: { is: 'button' },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
  });
});
