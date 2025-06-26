import { mount, randomString } from '@/lib/tests';
import SectionFooter from '../SectionFooter.vue';
import * as platformComposable from '@/composables/usePlatform';

describe('SectionFooter', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders Caption on iOS platform', () => {
    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('ios');

    const text = randomString();
    const wrapper = mount(SectionFooter, {
      slots: {
        default: text,
      },
    });

    expect(wrapper.findComponent({ name: 'Caption' }).exists()).toBe(true);
    expect(wrapper.find('.text').text()).toBe(text);
    expect(wrapper.classes()).toContain('section-footer--ios');
  });

  test('renders Subheadline on base platform', () => {
    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('base');

    const text = randomString();
    const wrapper = mount(SectionFooter, {
      slots: {
        default: text,
      },
    });

    expect(wrapper.findComponent({ name: 'Subheadline' }).exists()).toBe(true);
    expect(wrapper.find('.text').text()).toBe(text);
    expect(wrapper.classes()).not.toContain('section-footer--ios');
  });

  test('applies centered class when prop is set', () => {
    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('ios');

    const text = randomString();
    const wrapper = mount(SectionFooter, {
      props: { centered: true },
      slots: {
        default: text,
      },
    });

    expect(wrapper.classes()).toContain('section-footer--centered');
  });
});
