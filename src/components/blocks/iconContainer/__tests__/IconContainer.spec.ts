import { mount } from '@/lib/tests';
import IconContainer from '../IconContainer.vue';

describe('IconContainer', () => {
  test('renders with correct base class', () => {
    const wrapper = mount(IconContainer);

    expect(wrapper.classes()).toContain('icon-container');
  });

  test('renders slot content', () => {
    const wrapper = mount(IconContainer, {
      slots: {
        default: '<svg class="test-icon" />',
      },
    });

    expect(wrapper.find('.test-icon').exists()).toBe(true);
  });
});
