import { mount } from '@/lib/tests';
import Banner from '../Banner.vue';
import { Mock } from 'vitest';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Banner', () => {
  test('renders base classes correctly', () => {
    const wrapper = mount(Banner);
    expect(wrapper.classes()).toContain('banner');
    expect(wrapper.classes()).toContain('banner--base');
  });

  test('applies inline type class when type="inline"', () => {
    const wrapper = mount(Banner, {
      props: {
        type: 'inline',
      },
    });

    expect(wrapper.classes()).toContain('banner--inline');
  });

  test('renders background slot and applies background class', () => {
    const wrapper = mount(Banner, {
      slots: {
        background: '<div id="bg"></div>',
      },
    });

    expect(wrapper.find('.background').exists()).toBe(true);
    expect(wrapper.classes()).toContain('banner--with-background');
  });

  test('renders callout, header, subheader, description, and default slots', () => {
    const wrapper = mount(Banner, {
      slots: {
        callout: '<div data-test-id="callout-content">Callout</div>',
        header: '<div data-test-id="header-content">Header</div>',
        subheader: '<div data-test-id="subheader-content">Subheader</div>',
        description: '<div>Description</div>',
        default: '<button class="action">Action</button>',
      },
    });

    expect(
      wrapper.find('.subheader [data-test-id="callout-content"]').exists()
    ).toBe(true);
    expect(
      wrapper.find('.title [data-test-id="header-content"]').exists()
    ).toBe(true);
    expect(
      wrapper.find('.subheader [data-test-id="subheader-content"]').exists()
    ).toBe(true);
    expect(wrapper.find('.description').exists()).toBe(true);
    expect(wrapper.find('.buttons .action').exists()).toBe(true);
  });

  test('renders before slot content', () => {
    const wrapper = mount(Banner, {
      slots: {
        before: '<div data-test-id="before-content">Before</div>',
      },
    });

    expect(wrapper.find('[data-test-id="before-content"]').exists()).toBe(true);
  });

  test('renders correct close icon and emits close on click (base platform)', async () => {
    const wrapper = mount(Banner, {
      props: {
        showCloseIcon: true,
      },
    });

    expect(wrapper.find('.close').exists()).toBe(true);
    await wrapper.find('.close').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
  });

  test('renders cancel icon on iOS platform', async () => {
    const { usePlatform } = await import('@/composables/usePlatform');
    (usePlatform as Mock).mockReturnValue('ios');

    const wrapper = mount(Banner, {
      props: {
        showCloseIcon: true,
      },
    });

    expect(wrapper.classes()).toContain('banner--ios');
    expect(wrapper.find('[data-test-id="cancel-icon"]').exists()).toBe(true);
  });
});
