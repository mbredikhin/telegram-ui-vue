import Blockquote from '../Blockquote.vue';
import Quote12Icon from '@/icons/12/quote.svg';
import { mount, randomString } from '@/lib/tests';
import { h } from 'vue';

describe('Blockquote', () => {
  test('renders slot content inside Subheadline when type is "text"', () => {
    const content = randomString();
    const wrapper = mount(Blockquote, {
      props: { type: 'text' },
      slots: {
        default: content,
      },
    });

    const subheadline = wrapper.findComponent({ name: 'Subheadline' });
    expect(subheadline.exists()).toBe(true);
    expect(subheadline.text()).toBe(content);
  });

  test('renders raw slot content when type is "other"', () => {
    const wrapper = mount(Blockquote, {
      props: { type: 'other' },
      slots: {
        default: '<p class="custom-content">Custom content</p>',
      },
    });

    expect(wrapper.find('p.custom-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Subheadline' }).exists()).toBe(false);
  });

  test('shows default quote icon when top-right-icon slot is not provided', () => {
    const wrapper = mount(Blockquote);
    const icon = wrapper.findComponent(Quote12Icon);
    expect(icon.exists()).toBe(true);
  });

  test('renders custom icon in top-right-icon slot', () => {
    const CustomIcon = {
      name: 'CustomIcon',
      template: '<svg class="custom-icon" />',
    };

    const wrapper = mount(Blockquote, {
      slots: {
        'top-right-icon': h(CustomIcon),
      },
    });

    expect(wrapper.find('.custom-icon').exists()).toBe(true);
    expect(wrapper.findComponent(Quote12Icon).exists()).toBe(false);
  });
});
