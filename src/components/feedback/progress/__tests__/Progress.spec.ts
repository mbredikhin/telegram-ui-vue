import { mount } from '@/lib/tests';
import Progress from '../Progress.vue';
import { Mock } from 'vitest';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Progress', () => {
  test('renders with default props', () => {
    const wrapper = mount(Progress);
    const el = wrapper.find('[role="progressbar"]');

    expect(el.exists()).toBe(true);
    expect(el.attributes('aria-valuenow')).toBe('0');
    expect(el.attributes('aria-valuemin')).toBe('0');
    expect(el.attributes('aria-valuemax')).toBe('100');
    expect(el.classes()).toContain('progress');
    expect(el.classes()).toContain('progress--base');
    expect(el.attributes('title')).toBe('0 / 100');
  });

  test('applies correct width style based on progress value', () => {
    const wrapper = mount(Progress, {
      props: {
        value: 25,
      },
    });

    const line = wrapper.find('.progress__line');
    expect(line.attributes('style')).toContain('width: 25%');
  });

  test('clamps values outside the allowed range', async () => {
    const wrapper = mount(Progress, {
      props: {
        value: -25,
      },
    });

    expect(
      wrapper.find('[role="progressbar"]').attributes('aria-valuenow')
    ).toBe('0');
    expect(wrapper.find('.progress__line').attributes('style')).toContain(
      'width: 0%'
    );

    await wrapper.setProps({ value: 200 });
    expect(
      wrapper.find('[role="progressbar"]').attributes('aria-valuenow')
    ).toBe('100');
    expect(wrapper.find('.progress__line').attributes('style')).toContain(
      'width: 100%'
    );
  });

  test('shows correct platform class', async () => {
    const { usePlatform } = await import('@/composables/usePlatform');
    (usePlatform as Mock).mockReturnValue('ios');

    const wrapper = mount(Progress, {
      props: {
        value: -25,
      },
    });

    expect(wrapper.find('[role="progressbar"]').classes()).toContain(
      'progress--ios'
    );
  });

  test('updates aria attributes and title correctly', async () => {
    const wrapper = mount(Progress, {
      props: {
        value: 42,
      },
    });

    const el = wrapper.find('[role="progressbar"]');
    expect(el.attributes('aria-valuenow')).toBe('42');
    expect(el.attributes('title')).toBe('42 / 100');
  });
});
