import { h } from 'vue';
import { mount, randomString } from '@/lib/tests';
import CompactPagination from '../CompactPagination.vue';

describe('CompactPagination', () => {
  test('renders with base class and default mode', () => {
    const wrapper = mount(CompactPagination);
    const paginationElement = wrapper.find('[role="tablist"]');

    expect(paginationElement.exists()).toBe(true);
    expect(paginationElement.classes()).toContain('compact-pagination');
    expect(paginationElement.classes()).toContain(
      'compact-pagination--default'
    );
  });

  test.each(['default', 'ambient', 'white'] as const)(
    'applies correct mode class when mode is "%s"',
    (mode) => {
      const wrapper = mount(CompactPagination, {
        props: { mode },
      });

      expect(wrapper.classes()).toContain(`compact-pagination--${mode}`);
    }
  );

  test('renders slot content', () => {
    const content = randomString();
    const wrapper = mount(CompactPagination, {
      slots: {
        default: () => h('span', content),
      },
    });

    expect(wrapper.text()).toContain(content);
    expect(wrapper.find('span').exists()).toBe(true);
  });
});
