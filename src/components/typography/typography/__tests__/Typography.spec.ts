import { mount, randomString } from '@/lib/tests';
import Typography from '../Typography.vue';

describe('Typography', () => {
  test('renders slot content', () => {
    const text = randomString();
    const wrapper = mount(Typography, {
      slots: {
        default: text,
      },
    });

    expect(wrapper.text()).toBe(text);
  });

  test('applies default props', () => {
    const wrapper = mount(Typography);

    const root = wrapper.find('.typography');

    expect(root.element.tagName.toLowerCase()).toBe('span');
    expect(root.classes()).toContain('typography--weight-3');
  });

  test.each([
    { weight: '1', expectedClass: 'typography--weight-1' },
    { weight: '2', expectedClass: 'typography--weight-2' },
    { weight: '3', expectedClass: 'typography--weight-3' },
  ])(
    'applies correct weight class for weight=$weight',
    ({ weight, expectedClass }) => {
      const wrapper = mount(Typography, {
        props: {
          weight,
        },
      });

      const root = wrapper.find('.typography');

      expect(root.classes()).toContain(expectedClass);
    }
  );

  test.each([
    { prop: 'caps', expectedClass: 'typography--caps' },
    { prop: 'plain', expectedClass: 'typography--plain' },
  ])('applies $expectedClass when $prop=true', ({ prop, expectedClass }) => {
    const wrapper = mount(Typography, {
      props: {
        [prop]: true,
      },
    });

    const root = wrapper.find('.typography');

    expect(root.classes()).toContain(expectedClass);
  });

  test('renders with custom tag via `is` prop', () => {
    const wrapper = mount(Typography, {
      props: {
        is: 'h2',
      },
    });

    const root = wrapper.find('h2.typography');

    expect(root.exists()).toBe(true);
  });
});
