import { mount, randomString } from '@/lib/tests';
import Textarea from '../Textarea.vue';
import { usePlatform } from '@/composables/usePlatform';
import { randomInt } from 'crypto';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('Textarea', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders correctly with default props', () => {
    const wrapper = mount(Textarea);

    const textarea = wrapper.find('textarea');

    expect(wrapper.classes()).toContain('textarea-wrapper');
    expect(textarea.exists()).toBe(true);
    expect(textarea.classes()).toContain('textarea');
  });

  test('applies ios class when platform is ios', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(Textarea);

    expect(wrapper.classes()).toContain('textarea-wrapper--ios');
  });

  test('renders slot content in textarea', () => {
    const content = randomString();
    const wrapper = mount(Textarea, {
      slots: {
        default: content,
      },
    });

    expect(wrapper.find('textarea').element.textContent).toContain(content);
  });

  test('renders header slot content', () => {
    const header = randomString();
    const wrapper = mount(Textarea, {
      slots: {
        header,
      },
    });

    expect(wrapper.text()).toContain(header);
  });

  test('forwards extra attributes to textarea', () => {
    const placeholder = randomString();
    const name = randomString();
    const rows = randomInt(1, 5);
    const wrapper = mount(Textarea, {
      attrs: {
        placeholder,
        name,
        rows,
      },
    });

    const textarea = wrapper.find('textarea');

    expect(textarea.attributes('placeholder')).toBe(placeholder);
    expect(textarea.attributes('name')).toBe(name);
    expect(textarea.attributes('rows')).toBe(String(rows));
  });
});
