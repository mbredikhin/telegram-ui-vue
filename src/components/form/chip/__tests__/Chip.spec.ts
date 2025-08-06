import { mount, randomString } from '@/lib/tests';
import Chip from '../Chip.vue';
import { h } from 'vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Chip', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders default slot content', () => {
    const content = randomString();
    const wrapper = mount(Chip, {
      slots: {
        default: () => content,
      },
    });

    expect(wrapper.text()).toContain(content);
  });

  test('renders before slot if provided', () => {
    const wrapper = mount(Chip, {
      slots: {
        before: () => h('span', { class: 'test-before' }, 'Before'),
      },
    });

    expect(wrapper.find('.before').exists()).toBe(true);
    expect(wrapper.find('.test-before').exists()).toBe(true);
  });

  test('renders after slot if provided', () => {
    const wrapper = mount(Chip, {
      slots: {
        after: () => h('span', { class: 'test-after' }, 'After'),
      },
    });

    expect(wrapper.find('.after').exists()).toBe(true);
    expect(wrapper.find('.test-after').exists()).toBe(true);
  });

  test('applies correct class for mode prop', async () => {
    const wrapper = mount(Chip, {
      props: { mode: 'outline' },
    });

    expect(wrapper.classes()).toContain('chip');
    expect(wrapper.classes()).toContain('chip--outline');
  });

  test('defaults to elevated mode if no mode is passed', () => {
    const wrapper = mount(Chip);

    expect(wrapper.classes()).toContain('chip--elevated');
  });

  test('renders custom tag if is prop is passed', () => {
    const wrapper = mount(Chip, {
      props: { is: 'button' },
    });

    expect(wrapper.find('button').exists()).toBe(true);
  });

  test('applies Subheadline with correct level based on platform', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const content = randomString();
    const wrapper = mount(Chip, {
      slots: {
        default: () => content,
      },
    });

    const sub = wrapper.findComponent({ name: 'Subheadline' });

    expect(sub.exists()).toBe(true);
    expect(sub.attributes('level')).toBe('2');
  });
});
