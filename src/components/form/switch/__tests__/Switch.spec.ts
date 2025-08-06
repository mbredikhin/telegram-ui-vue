import { mount, randomString } from '@/lib/tests';
import Switch from '../Switch.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Switch', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders correctly with default props', () => {
    const wrapper = mount(Switch);

    const input = wrapper.find('input[type="checkbox"]');
    const control = wrapper.find('.control');

    expect(wrapper.classes()).toContain('switch-wrapper');
    expect(wrapper.classes()).toContain('switch-wrapper--base');
    expect(input.exists()).toBe(true);
    expect(control.exists()).toBe(true);
  });

  test('applies ios class when platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Switch);

    expect(wrapper.classes()).toContain('switch-wrapper--ios');
  });

  test('applies disabled class when input is disabled', () => {
    const wrapper = mount(Switch, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.classes()).toContain('switch-wrapper--disabled');
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  test('renders label', () => {
    const label = randomString();
    const wrapper = mount(Switch, {
      slots: {
        default: label,
      },
    });

    expect(wrapper.text()).toContain(label);
  });

  test('reflects checked state after click', async () => {
    const wrapper = mount(Switch);

    const input = wrapper.find('input');

    expect((input.element as HTMLInputElement).checked).toBe(false);

    await input.setValue(true);

    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  test('forwards extra attributes to input', () => {
    const name = randomString();
    const label = randomString();
    const wrapper = mount(Switch, {
      attrs: {
        name,
        'aria-label': label,
      },
    });

    const input = wrapper.find('input');

    expect(input.attributes('name')).toBe(name);
    expect(input.attributes('aria-label')).toBe(label);
  });
});
