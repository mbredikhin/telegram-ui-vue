import { mount, randomString } from '@/lib/tests';
import Tooltip from '../Tooltip.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Tooltip', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders Popper with Caption wrapping slot content', () => {
    const text = randomString();
    const wrapper = mount(Tooltip, {
      props: {
        anchor: document.createElement('button'),
      },
      slots: {
        default: () => text,
      },
    });

    const popper = wrapper.findComponent({ name: 'Popper' });

    expect(popper.exists()).toBe(true);

    const caption = wrapper.find('span');

    expect(caption.text()).toBe(text);
  });

  test('applies default light mode classes', () => {
    const wrapper = mount(Tooltip, {
      props: { anchor: document.createElement('button') },
    });

    const popper = wrapper.find('.popper');

    expect(popper.classes()).toContain('tooltip');
    expect(popper.classes()).not.toContain('tooltip--dark');
  });

  test('applies dark mode class when mode="dark"', () => {
    const wrapper = mount(Tooltip, {
      props: { anchor: document.createElement('button'), mode: 'dark' },
    });

    const popper = wrapper.find('.popper');

    expect(popper.classes()).toContain('tooltip--dark');
  });

  test('applies ios class when platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Tooltip, {
      props: {
        anchor: document.createElement('button'),
      },
    });

    const popper = wrapper.find('.popper');

    expect(popper.classes()).toContain('tooltip--ios');
  });

  test('merges arrowProps classes correctly', () => {
    const wrapper = mount(Tooltip, {
      props: {
        anchor: document.createElement('button'),
      },
      attrs: {
        arrowProps: { classes: ['test-class'] },
      },
    });

    const popper = wrapper.findComponent({ name: 'Popper' });
    const arrowProps = popper.props('arrowProps');

    expect(arrowProps.classes).toContain('test-class');
  });

  test('forwards all attrs to Popper', () => {
    const dataAttr = randomString();
    const wrapper = mount(Tooltip, {
      props: {
        anchor: document.createElement('button'),
      },
      attrs: {
        'data-test': dataAttr,
      },
    });

    const popper = wrapper.find('.popper');

    expect(popper.attributes('data-test')).toBe(dataAttr);
  });
});
