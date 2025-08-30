import { mount, randomString } from '@/lib/tests';
import Title from '../Title.vue';

describe('Title', () => {
  test('renders with default props', () => {
    const text = randomString();
    const wrapper = mount(Title, {
      slots: {
        default: text,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.exists()).toBe(true);
    expect(root.text()).toBe(text);

    expect(root.props('is')).toBe('h3');
    expect(root.props('weight')).toBe('3');

    expect(root.classes()).toContain('title');
    expect(root.classes()).toContain('title--2');
  });

  test.each([
    { level: '1', expectedTag: 'h2', expectedClass: 'title--1' },
    { level: '2', expectedTag: 'h3', expectedClass: 'title--2' },
    { level: '3', expectedTag: 'h4', expectedClass: 'title--3' },
  ])(
    'applies correct tag ($expectedTag) and class ($expectedClass) for level=$level',
    ({ level, expectedTag, expectedClass }) => {
      const wrapper = mount(Title, {
        props: {
          level,
        },
      });

      const root = wrapper.findComponent({ name: 'Typography' });

      expect(root.props('is')).toBe(expectedTag);
      expect(root.classes()).toContain(expectedClass);
    }
  );

  test('forwards extra attrs to Typography', () => {
    const testId = randomString();
    const dataTest = randomString();

    const wrapper = mount(Title, {
      attrs: {
        id: testId,
        'data-test': dataTest,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.attributes('id')).toBe(testId);
    expect(root.attributes('data-test')).toBe(dataTest);
  });

  test('respects explicit override of is prop', () => {
    const wrapper = mount(Title, {
      attrs: {
        is: 'section',
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.props('is')).toBe('section');
  });
});
