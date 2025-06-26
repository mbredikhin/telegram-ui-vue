import { mount, randomString } from '@/lib/tests';
import Section from '../Section.vue';
import SectionHeader from '../SectionHeader/SectionHeader.vue';
import SectionFooter from '../SectionFooter/SectionFooter.vue';
import { Divider } from '@/components/misc';
import { Mock } from 'vitest';
import { h } from 'vue';
import { Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Section', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('applies base platform class', () => {
    const wrapper = mount(Section);

    expect(wrapper.classes()).toContain('section--base');
  });

  test('applies ios platform class', () => {
    (usePlatform as Mock).mockReturnValue('ios');
    const wrapper = mount(Section);

    expect(wrapper.classes()).toContain('section--ios');
  });

  test('does not render header and footer if no slot content is present', () => {
    const wrapper = mount(Section);

    expect(wrapper.findComponent(SectionHeader).exists()).toBe(false);
    expect(wrapper.findComponent(SectionFooter).exists()).toBe(false);
  });

  test('wraps text node header into SectionHeader', () => {
    const header = randomString();
    const wrapper = mount(Section, {
      slots: {
        header,
      },
    });

    expect(wrapper.findComponent(SectionHeader).exists()).toBe(true);
    expect(wrapper.findComponent(SectionHeader).text()).toBe(header);
  });

  test('does not wrap into SectionHeader if content is component', () => {
    const wrapper = mount(Section, {
      slots: {
        header: h(Text, 'Header'),
      },
    });

    expect(wrapper.findComponent(Text).exists()).toBe(true);
    expect(wrapper.findComponent(SectionHeader).exists()).toBe(false);
  });

  test('wraps text node footer into SectionFooter', () => {
    const footer = randomString();
    const wrapper = mount(Section, {
      slots: {
        footer,
      },
    });

    expect(wrapper.findComponent(SectionFooter).exists()).toBe(true);
    expect(wrapper.findComponent(SectionFooter).text()).toBe(footer);
  });

  test('does not wrap into SectionFooter if content is component', () => {
    const wrapper = mount(Section, {
      slots: {
        footer: h(Text, 'Footer'),
      },
    });

    expect(wrapper.findComponent(Text).exists()).toBe(true);
    expect(wrapper.findComponent(SectionFooter).exists()).toBe(false);
  });

  test('renders default slot content and dividers', () => {
    const wrapper = mount(Section, {
      slots: {
        default: `
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        `,
      },
    });

    const divs = wrapper.findAll('.body > *:not(.divider)');
    expect(divs).toHaveLength(3);
    expect(wrapper.findAllComponents(Divider)).toHaveLength(2);
  });
});
