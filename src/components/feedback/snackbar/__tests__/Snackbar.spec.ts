import { mount, randomString } from '@/lib/tests';
import Snackbar from '../Snackbar.vue';
import { nextTick } from 'vue';
import { Mock } from 'vitest';
import { TRANSITION_FINISH_DURATION } from '../lib';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

vi.useFakeTimers();

describe('Snackbar', () => {
  test('renders all slot sections', () => {
    const beforeContent = randomString();
    const mainContent = randomString();
    const descriptionContent = randomString();
    const linkContent = randomString();
    const afterContent = randomString();
    const wrapper = mount(Snackbar, {
      slots: {
        before: `<div data-test-id="before">${beforeContent}</div>`,
        default: `<span>${mainContent}</span>`,
        description: `<span>${descriptionContent}</span>`,
        link: `<a href="#">${linkContent}</a>`,
        after: `<div data-test-id="after">${afterContent}</div>`,
      },
    });

    expect(wrapper.find('[data-test-id="before"]').exists()).toBe(true);
    expect(wrapper.find('[data-test-id="after"]').exists()).toBe(true);
    expect(wrapper.text()).toContain(beforeContent);
    expect(wrapper.text()).toContain(mainContent);
    expect(wrapper.text()).toContain(descriptionContent);
    expect(wrapper.text()).toContain(linkContent);
    expect(wrapper.text()).toContain(afterContent);
  });

  test('applies ios class when platform is ios', async () => {
    const { usePlatform } = await import('@/composables/usePlatform');
    (usePlatform as Mock).mockReturnValue('ios');

    const wrapper = mount(Snackbar);
    const el = wrapper.find('[data-test-id="snackbar"]');

    expect(el.classes()).toContain('snackbar--ios');
  });

  test('closes after duration and emits "close"', async () => {
    const duration = 1000;
    const wrapper = mount(Snackbar, {
      props: {
        duration,
      },
    });

    vi.advanceTimersByTime(duration);

    await nextTick();
    const el = wrapper.find('[data-test-id="snackbar"]');
    expect(el.classes()).toContain('snackbar--closing');

    vi.advanceTimersByTime(TRANSITION_FINISH_DURATION);
    await nextTick();

    expect(wrapper.emitted('close')).toBeTruthy();
  });

  test('forwards root attributes', () => {
    const wrapper = mount(Snackbar, {
      attrs: {
        id: 'snack',
        'aria-live': 'polite',
      },
    });

    const root = wrapper.find('.snackbar');
    expect(root.attributes('id')).toBe('snack');
    expect(root.attributes('aria-live')).toBe('polite');
  });
});
