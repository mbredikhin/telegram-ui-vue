import { mount, randomString } from '@/lib/tests';
import ButtonCell from '../ButtonCell.vue';
import { usePlatform } from '@/composables/usePlatform';

vi.mock('@/composables/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

describe('ButtonCell', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('renders default slot content', () => {
    const content = randomString();
    const wrapper = mount(ButtonCell, {
      slots: { default: content },
    });

    expect(wrapper.text()).toContain(content);
  });

  test('applies mode and platform classes', () => {
    vi.mocked(usePlatform).mockReturnValue('ios');
    const wrapper = mount(ButtonCell, {
      props: { mode: 'destructive' },
    });

    expect(wrapper.classes()).toContain('button-cell--destructive');
    expect(wrapper.classes()).toContain('button-cell--ios');
  });

  test('renders before and after slots', () => {
    const before = randomString();
    const after = randomString();
    const wrapper = mount(ButtonCell, {
      slots: {
        before: `<span>${before}</span>`,
        after: `<span>${after}</span>`,
      },
    });

    expect(wrapper.html()).toContain(before);
    expect(wrapper.html()).toContain(after);
  });
});
