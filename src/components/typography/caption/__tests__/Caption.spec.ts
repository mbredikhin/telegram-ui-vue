import { mount, randomString } from '@/lib/tests';
import Caption from '../Caption.vue';

describe('Caption', () => {
  test('renders with default props', () => {
    const text = randomString();
    const wrapper = mount(Caption, {
      slots: {
        default: text,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.exists()).toBe(true);
    expect(root.text()).toBe(text);

    expect(root.props('is')).toBe('span');
    expect(root.props('weight')).toBe('1');

    expect(root.classes()).toContain('caption');
    expect(root.classes()).toContain('caption--1');
  });

  test('applies level correctly', () => {
    const wrapper = mount(Caption, {
      props: {
        level: '2',
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.classes()).toContain('caption--2');
    expect(root.classes()).not.toContain('caption--1');
  });

  test('forwards extra attrs to Typography', () => {
    const testId = randomString();
    const dataTest = randomString();

    const wrapper = mount(Caption, {
      attrs: {
        id: testId,
        'data-test': dataTest,
      },
    });

    const root = wrapper.findComponent({ name: 'Typography' });

    expect(root.attributes('id')).toBe(testId);
    expect(root.attributes('data-test')).toBe(dataTest);
  });
});
