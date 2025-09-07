import { mount, randomString } from '@/lib/tests';
import Subheadline from '../Subheadline.vue';

describe('Subheadline', () => {
  test('renders with default props', () => {
    const text = randomString();
    const wrapper = mount(Subheadline, {
      slots: {
        default: text,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.exists()).toBe(true);
    expect(root.text()).toBe(text);

    expect(root.props('is')).toBe('h6');
    expect(root.props('weight')).toBe('1');

    expect(root.classes()).toContain('subheadline');
    expect(root.classes()).toContain('subheadline--1');
  });

  test('applies correct class for level 2', () => {
    const wrapper = mount(Subheadline, {
      props: {
        level: '2',
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.classes()).toContain('subheadline--2');
  });

  test('forwards extra attrs to Typography', () => {
    const testId = randomString();
    const dataTest = randomString();

    const wrapper = mount(Subheadline, {
      attrs: {
        id: testId,
        'data-test': dataTest,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.attributes('id')).toBe(testId);
    expect(root.attributes('data-test')).toBe(dataTest);
  });

  test('respects override of is and weight props', () => {
    const wrapper = mount(Subheadline, {
      attrs: {
        is: 'h4',
        weight: '1',
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.props('is')).toBe('h4');
    expect(root.props('weight')).toBe('1');
  });
});
