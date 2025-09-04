import { mount, randomString } from '@/lib/tests';
import PinInputCell from '../PinInputCell.vue';

describe('PinInput', () => {
  test('applies custom class to the root element', () => {
    const customClass = randomString();
    const wrapper = mount(PinInputCell, {
      attrs: {
        class: customClass,
      },
    });

    const root = wrapper.find('[data-test-id="pin-input-cell"]');

    expect(root.classes()).toContain(customClass);
  });
});
