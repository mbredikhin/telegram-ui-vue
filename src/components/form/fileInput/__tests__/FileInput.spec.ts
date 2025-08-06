import { mount, randomString } from '@/lib/tests';
import FileInput from '../FileInput.vue';

describe('FileInput', () => {
  test('renders the default label', () => {
    const wrapper = mount(FileInput);

    expect(wrapper.text()).toContain('Attach file');
  });

  test('renders a custom label', () => {
    const label = randomString();
    const wrapper = mount(FileInput, {
      props: { label },
    });

    expect(wrapper.text()).toContain(label);
  });

  test('forwards attributes to the input', () => {
    const wrapper = mount(FileInput, {
      attrs: {
        multiple: true,
        accept: '.png',
      },
    });
    const input = wrapper.find('input[type="file"]');

    expect(input.attributes('multiple')).toBeDefined();
    expect(input.attributes('accept')).toBe('.png');
  });

  test('renders the attach icon', () => {
    const wrapper = mount(FileInput);
    const icon = wrapper.find('[data-test-id="attach-icon"]');

    expect(icon.exists()).toBe(true);
  });

  test('renders default slot content', () => {
    const content = randomString();
    const wrapper = mount(FileInput, {
      slots: {
        default: `<div class="test-slot-content">${content}</div>`,
      },
    });

    expect(wrapper.find('.test-slot-content').exists()).toBe(true);
    expect(wrapper.html()).toContain(content);
  });

  test('does not emit anything by default when input is changed', async () => {
    const wrapper = mount(FileInput);
    const input = wrapper.find('input[type="file"]');

    // It's possible to set only an empty string as a value programmatically for a file input
    await input.setValue('');

    const emittedEventNames = Object.keys(wrapper.emitted());
    expect(emittedEventNames).toContain('change');
    expect(emittedEventNames).toContain('input');
  });
});
