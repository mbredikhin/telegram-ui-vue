import { mount } from '@/lib/tests';
import InlineButtons from '../InlineButtons.vue';
import InlineButtonsItem from '../InlineButtonsItem.vue';

describe('InlineButtons', () => {
  test('renders slot content', () => {
    const wrapper = mount(InlineButtons, {
      slots: {
        default: '<button class="test-child-button"></button>',
      },
    });

    expect(wrapper.find('.test-child-button').exists()).toBe(true);
  });

  test('provides mode to children', () => {
    const wrapper = mount({
      components: { InlineButtons, InlineButtonsItem },
      template: `
        <InlineButtons mode="gray">
          <InlineButtonsItem text="Touch grass" />
          <InlineButtonsItem text="Write tests" />
        </InlineButtons>
      `,
    });

    const items = wrapper.findAllComponents(InlineButtonsItem);

    expect(items.length).toBe(2);
    for (const item of items) {
      expect(item.classes()).toContain('inline-buttons-item--gray');
    }
  });
});
