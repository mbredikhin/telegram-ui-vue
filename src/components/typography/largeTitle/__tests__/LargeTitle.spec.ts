import { mount, randomString } from '@/lib/tests';
import LargeTitle from '../LargeTitle.vue';

describe('LargeTitle', () => {
  test('renders with default props', () => {
    const text = randomString();
    const wrapper = mount(LargeTitle, {
      slots: {
        default: text,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.exists()).toBe(true);
    expect(root.text()).toBe(text);

    expect(root.props('is')).toBe('h1');
    expect(root.props('weight')).toBe('3');

    expect(root.classes()).toContain('large-title');
  });

  test('forwards extra attrs to Typography', () => {
    const testId = randomString();
    const dataTest = randomString();

    const wrapper = mount(LargeTitle, {
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
    const wrapper = mount(LargeTitle, {
      attrs: {
        is: 'h2',
        weight: '1',
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.props('is')).toBe('h2');
    expect(root.props('weight')).toBe('1');
  });
});
