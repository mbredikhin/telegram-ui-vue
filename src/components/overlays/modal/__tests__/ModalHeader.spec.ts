import { mount, randomString } from '@/lib/tests';
import ModalHeader from '../ModalHeader.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('ModalHeader', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders before and after slots', () => {
    const beforeText = randomString();
    const afterText = randomString();
    const wrapper = mount(ModalHeader, {
      slots: {
        before: () => beforeText,
        after: () => afterText,
      },
    });

    expect(wrapper.find('.before').text()).toContain(beforeText);
    expect(wrapper.find('.after').text()).toContain(afterText);
  });

  test('does not render default slot text on base platform', () => {
    const defaultText = randomString();
    const wrapper = mount(ModalHeader, {
      slots: {
        default: () => defaultText,
      },
    });

    expect(wrapper.text()).not.toContain(defaultText);
    expect(wrapper.find('.children').exists()).toBe(false);
  });

  test('renders default slot text inside Text on ios platform', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const text = randomString();
    const wrapper = mount(ModalHeader, {
      slots: {
        default: () => text,
      },
    });

    const textNode = wrapper.findComponent({ name: 'Text' });

    expect(textNode.exists()).toBe(true);
    expect(textNode.text()).toContain(text);
    expect(textNode.classes()).toContain('children');
  });

  test('applies correct base classes', () => {
    const wrapper = mount(ModalHeader);

    expect(wrapper.classes()).toContain('modal-header');
    expect(wrapper.find('.before').exists()).toBe(true);
    expect(wrapper.find('.after').exists()).toBe(true);
  });
});
