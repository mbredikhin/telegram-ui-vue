import { mount } from '@/lib/tests';
import Button from '../Button.vue';
import { Spinner } from '@/components/feedback';
import ButtonTypography from '../ButtonTypography.vue';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: () => 'ios',
}));

describe('Button', () => {
  test('renders default slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    });
    expect(wrapper.text()).toContain('Click me');
    expect(wrapper.classes()).toContain('button');
  });

  test('renders before and after slots', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button',
        before: '<span class="icon-before">A</span>',
        after: '<span class="icon-after">B</span>',
      },
    });

    expect(wrapper.find('.before .icon-before').exists()).toBe(true);
    expect(wrapper.find('.after .icon-after').exists()).toBe(true);
  });

  test('shows spinner and hides content when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: {
        default: 'Submit',
      },
    });

    expect(wrapper.findComponent(Spinner).exists()).toBe(true);
    expect(wrapper.find('.content').attributes('style')).toContain(
      'opacity: 0'
    );
  });

  test('uses correct tag from `is` prop', () => {
    const wrapper = mount(Button, {
      props: { is: 'a' },
      attrs: { href: '#' },
      slots: {
        default: 'Link',
      },
    });

    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.attributes('href')).toBe('#');
  });

  test('applies button size and mode classes', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'l',
        mode: 'outline',
      },
      slots: {
        default: 'Outlined Button',
      },
    });

    expect(wrapper.classes()).toContain('button--l');
    expect(wrapper.classes()).toContain('button--outline');
  });

  test('applies ios platform class', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('button--ios');
  });

  test('renders stretched button', () => {
    const wrapper = mount(Button, {
      props: {
        stretched: true,
      },
    });
    expect(wrapper.classes()).toContain('button--stretched');
  });

  test('renders ButtonTypography with correct size', () => {
    const wrapper = mount(Button, {
      props: { size: 'l' },
      slots: {
        default: 'Large Text',
      },
    });

    const typography = wrapper.findComponent(ButtonTypography);
    expect(typography.exists()).toBe(true);
    expect(typography.props('size')).toBe('l');
  });

  test('forwards button type attribute', () => {
    const wrapper = mount(Button, {
      attrs: { type: 'submit' },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });
});
