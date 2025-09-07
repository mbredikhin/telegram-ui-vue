import { mount, randomString } from '@/lib/tests';
import Text from '../Text.vue';

describe('Text', () => {
  test('renders with default props', () => {
    const text = randomString();
    const wrapper = mount(Text, {
      slots: {
        default: text,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.exists()).toBe(true);
    expect(root.text()).toBe(text);

    expect(root.props('is')).toBe('span');
    expect(root.props('weight')).toBe('1');

    expect(root.classes()).toContain('text');
  });

  test('forwards extra attrs to Typography', () => {
    const testId = randomString();
    const dataTest = randomString();

    const wrapper = mount(Text, {
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
    const wrapper = mount(Text, {
      attrs: {
        is: 'p',
        weight: '1',
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.props('is')).toBe('p');
    expect(root.props('weight')).toBe('1');
  });
});
