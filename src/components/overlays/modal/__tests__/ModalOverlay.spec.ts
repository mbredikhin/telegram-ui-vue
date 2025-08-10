import ModalOverlay from '../ModalOverlay.vue';
import { mount } from '@/lib/tests';
import { getTelegramData } from '@/lib/telegram';
import { hexToRGB } from '@/lib/color';
import { nextTick } from 'vue';
import { WebApp } from '@twa-dev/types';

vi.mock('@/lib/telegram', () => ({
  getTelegramData: vi.fn(),
}));

vi.mock('@/lib/color', () => ({
  hexToRGB: vi.fn(),
}));

describe('ModalOverlay', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('uses telegram theme bg_color if available', async () => {
    const bg = '#808080';
    const rgb: [number, number, number] = [128, 128, 128];

    vi.mocked(getTelegramData).mockReturnValue({
      themeParams: { bg_color: bg },
    } as unknown as WebApp);

    vi.mocked(hexToRGB).mockReturnValue(rgb);

    const wrapper = mount(ModalOverlay, {
      global: {
        stubs: {
          DrawerRoot: { template: '<div><slot /></div>' },
          DrawerPortal: { template: '<div><slot /></div>' },
          DrawerOverlay: {
            template: '<div class="modal-overlay" v-bind="$attrs"></div>',
          },
        },
      },
    });

    await nextTick();

    expect(getTelegramData).toHaveBeenCalled();
    expect(hexToRGB).toHaveBeenCalledWith(bg);
    expect(wrapper.find('.modal-overlay').attributes('style')).toContain(
      `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4)`
    );
  });
});
