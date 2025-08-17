import { ref, nextTick } from 'vue';
import {
  getInitialAppearance,
  getBrowserAppearanceSubscriber,
  useAppearance,
} from '../useAppearance';
import { getTelegramData } from '@/lib/telegram';
import { WebApp } from '@twa-dev/types';

const canUseDomMock = vi.fn(() => true);
vi.mock('@/lib/dom', () => ({
  get canUseDOM() {
    return canUseDomMock;
  },
}));

vi.mock('@/lib/telegram', () => ({ getTelegramData: vi.fn() }));

describe('useAppearance', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('getInitialAppearance', () => {
    test('returns dark when matchMedia matches dark', () => {
      const matchMediaMock = vi.fn(() => ({ matches: true }));
      Object.defineProperty(window, 'matchMedia', {
        value: matchMediaMock,
        configurable: true,
      });

      expect(getInitialAppearance()).toBe('dark');
    });

    test('returns light when matchMedia not available', () => {
      Object.defineProperty(window, 'matchMedia', {
        value: undefined,
        configurable: true,
      });

      expect(getInitialAppearance()).toBe('light');
    });
  });

  describe('getBrowserAppearanceSubscriber', () => {
    test('subscribes and unsubscribes correctly', () => {
      const listeners: Record<string, () => void> = {};
      const mediaQuery = {
        matches: false,
        addEventListener: vi.fn((event, cb) => (listeners[event] = cb)),
        removeEventListener: vi.fn((event) => delete listeners[event]),
      };
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn(() => mediaQuery),
        configurable: true,
      });

      const spy = vi.fn();
      const unsubscribe = getBrowserAppearanceSubscriber(spy);

      mediaQuery.matches = true;
      listeners.change();

      expect(spy).toHaveBeenCalledWith('dark');

      unsubscribe();

      expect(mediaQuery.removeEventListener).toHaveBeenCalled();
    });

    test('returns noop if DOM not usable', () => {
      canUseDomMock.mockReturnValue(false);
      Object.defineProperty(window, 'matchMedia', {
        value: undefined,
        configurable: true,
      });

      const unsubscribe = getBrowserAppearanceSubscriber(() => {});

      expect(unsubscribe).toBeTypeOf('function');
      expect(() => unsubscribe()).not.toThrow();
    });
  });

  describe('useAppearance', () => {
    test('uses provided appearanceProp as controlled value', async () => {
      const controlled = ref<'dark' | 'light'>('dark');
      const appearance = useAppearance(controlled);

      expect(appearance.value).toBe('dark');

      controlled.value = 'light';
      await nextTick();

      expect(appearance.value).toBe('light');
    });

    test('uses telegram color scheme by default if specified', async () => {
      vi.mocked(getTelegramData).mockReturnValue({
        colorScheme: 'dark',
      } as unknown as WebApp);

      const appearance = useAppearance();

      expect(appearance.value).toBe('dark');
    });
  });
});
