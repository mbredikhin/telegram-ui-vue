import { mount, randomString } from '@/lib/tests';
import InlineButtonsItem from '../InlineButtonsItem.vue';
import { inlineButtonsInjectionKey } from '../lib';
import { ref } from 'vue';

describe('InlineButtonsItem', () => {
  test('renders text if provided', () => {
    const text = randomString();
    const wrapper = mount(InlineButtonsItem, {
      props: { text },
    });

    expect(wrapper.text()).toContain(text);
  });

  test('applies custom mode class', () => {
    const wrapper = mount(InlineButtonsItem, {
      props: { mode: 'gray' },
    });

    expect(wrapper.classes()).toContain('inline-buttons-item--gray');
  });

  test('renders slot content', () => {
    const wrapper = mount(InlineButtonsItem, {
      slots: {
        default: '<svg class="test-icon" />',
      },
    });

    expect(wrapper.find('.test-icon').exists()).toBe(true);
  });

  test('respects mode provided by a parent component', () => {
    const wrapper = mount(InlineButtonsItem, {
      global: {
        provide: {
          [inlineButtonsInjectionKey]: ref({ mode: 'bezeled' }),
        },
      },
    });

    expect(wrapper.classes()).toContain('inline-buttons-item--bezeled');
  });
});
