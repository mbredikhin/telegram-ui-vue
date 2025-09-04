import { mount, randomString } from '@/lib/tests';
import Select from '../Select.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Select', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders with default classes', () => {
    const wrapper = mount(Select);

    expect(wrapper.classes()).toContain('select-wrapper');
  });

  test('renders with ios class if platform is ios', async () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Select);

    expect(wrapper.classes()).toContain('select-wrapper--ios');
  });

  test('renders slot content', () => {
    const options = [randomString(), randomString()];
    const wrapper = mount(Select, {
      slots: {
        default: `<option value="1">${options[0]}</option><option value="2">${options[1]}</option>`,
      },
    });

    const select = wrapper.find('select');

    expect(select.exists()).toBe(true);

    const optionElements = select.findAll('option');

    expect(options).toHaveLength(2);
    expect(optionElements[0].text()).toBe(options[0]);
    expect(optionElements[1].text()).toBe(options[1]);
  });

  test('renders chevron icon', () => {
    const wrapper = mount(Select);

    const chevron = wrapper.find('.chevron');

    expect(chevron.exists()).toBe(true);
  });

  test('binds attributes to select element', () => {
    const wrapper = mount(Select, {
      attrs: {
        disabled: true,
        name: 'fruit',
      },
    });

    const select = wrapper.find('select');

    expect(select.attributes('disabled')).toBe('');
    expect(select.attributes('name')).toBe('fruit');
  });

  test('renders header and before slots', () => {
    const headerContent = randomString();
    const beforeContent = randomString();
    const wrapper = mount(Select, {
      slots: {
        header: `<div class="test-header-content">${headerContent}</div>`,
        before: `<span class="test-before-content">${beforeContent}</span>`,
      },
    });

    expect(wrapper.find('.test-header-content').text()).toBe(headerContent);
    expect(wrapper.find('.test-before-content').text()).toBe(beforeContent);
  });

  test('applies custom class to the root element', () => {
    const customClass = randomString();
    const wrapper = mount(Select, {
      attrs: {
        class: customClass,
      },
    });

    const root = wrapper.find('[data-test-id="select"]');

    expect(root.classes()).toContain(customClass);
  });
});
