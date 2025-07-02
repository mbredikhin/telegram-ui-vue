import { mount, randomString } from '@/lib/tests';
import Skeleton from '../Skeleton.vue';

describe('Skeleton', () => {
  test('renders the default skeleton with base class', () => {
    const wrapper = mount(Skeleton);
    const el = wrapper.find('div');

    expect(el.classes()).toContain('skeleton');
    expect(el.classes()).not.toContain('skeleton--visible');
    expect(el.classes()).not.toContain('skeleton--no-animation');
  });

  test('applies "skeleton--visible" class when visible is true', () => {
    const wrapper = mount(Skeleton, {
      props: { visible: true },
    });

    expect(wrapper.find('div').classes()).toContain('skeleton--visible');
  });

  test('applies "skeleton--no-animation" class when withoutAnimation is true', () => {
    const wrapper = mount(Skeleton, {
      props: { withoutAnimation: true },
    });

    expect(wrapper.find('div').classes()).toContain('skeleton--no-animation');
  });

  test('renders slot content correctly', () => {
    const content = randomString();
    const wrapper = mount(Skeleton, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.html()).toContain(content);
  });
});
