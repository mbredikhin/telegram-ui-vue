import { mount, randomString } from '@/lib/tests';
import CardChip from '../CardChip.vue';

describe('CardChip', () => {
  test('renders CardChip with before and after slot content', () => {
    const content = randomString();
    const wrapper = mount(CardChip, {
      slots: {
        before: '<div class="before-icon"></div>',
        default: content,
        after: '<div class="after-icon"></div>',
      },
    });

    expect(wrapper.find('.before-icon').exists()).toBe(true);
    expect(wrapper.find('.after-icon').exists()).toBe(true);
    expect(wrapper.text()).toContain(content);
  });
});
