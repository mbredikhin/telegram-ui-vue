import { mount, randomString } from '@/lib/tests';
import SectionHeader from '../SectionHeader.vue';
import * as platformComposable from '@/composables/usePlatform';

describe('SectionHeader', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders small Caption on iOS platform', () => {
    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('ios');

    const text = randomString();
    const wrapper = mount(SectionHeader, {
      slots: {
        default: text,
      },
    });

    expect(wrapper.findComponent({ name: 'Caption' }).exists()).toBe(true);
    expect(wrapper.classes()).toContain('section-header--ios');
    expect(wrapper.find('.title').text()).toBe(text);
  });

  test('renders small Subheadline on base platform', () => {
    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('base');

    const text = randomString();
    const wrapper = mount(SectionHeader, {
      slots: {
        default: text,
      },
    });

    expect(wrapper.findComponent({ name: 'Subheadline' }).exists()).toBe(true);
    expect(wrapper.find('.title').text()).toBe(text);
  });

  test('renders large Subheadline or Text correctly base on platform', () => {
    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('ios');

    const text = randomString();
    const wrapperIOS = mount(SectionHeader, {
      props: { large: true },
      slots: {
        default: text,
      },
    });

    expect(wrapperIOS.findComponent({ name: 'Subheadline' }).exists()).toBe(
      true
    );
    expect(wrapperIOS.classes()).toContain('section-header--large');
    expect(wrapperIOS.find('.title').text()).toBe(text);

    vi.spyOn(platformComposable, 'usePlatform').mockReturnValue('base');

    const wrapperBase = mount(SectionHeader, {
      props: { large: true },
      slots: {
        default: text,
      },
    });

    expect(wrapperBase.findComponent({ name: 'Text' }).exists()).toBe(true);
    expect(wrapperBase.find('.title').text()).toBe(text);
  });
});
