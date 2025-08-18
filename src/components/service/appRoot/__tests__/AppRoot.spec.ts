import { mount } from '@/lib/tests';
import { h, inject, nextTick, Ref, ref } from 'vue';
import AppRoot from '../AppRoot.vue';
import { AppRootInjection, appRootInjectionKey } from '../lib/AppRootInjection';
import { usePlatform } from '../lib/usePlatform';
import { useAppearance } from '../lib/useAppearance';

vi.mock('../lib/usePlatform', () => ({
  usePlatform: vi.fn(() => 'base'),
}));

vi.mock('../lib/useAppearance', () => ({
  useAppearance: vi.fn(() => ref('dark')),
}));

describe('AppRoot', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('applies platform and appearance classes', async () => {
    const wrapper = mount(AppRoot);

    expect(wrapper.classes()).toContain('app-root');
    expect(wrapper.classes()).toContain('app-root--base');
    expect(wrapper.classes()).toContain('app-root--dark');
  });

  test('provides appRootInjection with defaults', () => {
    vi.resetModules();

    vi.mocked(usePlatform).mockReturnValue('ios');
    vi.mocked(useAppearance).mockReturnValue(ref('light'));

    const wrapper = mount(AppRoot, {
      slots: {
        default: {
          setup() {
            const injection = inject(appRootInjectionKey);

            return () =>
              h(
                'span',
                injection?.value?.platform + ' ' + injection?.value?.appearance
              );
          },
        },
      },
    });

    expect(wrapper.find('span').text()).toBe('ios light');
  });

  test('teleportContainer defaults to self', async () => {
    let injection: Ref<AppRootInjection> | null;
    const wrapper = mount(AppRoot, {
      slots: {
        default: {
          setup() {
            injection = inject(appRootInjectionKey) as Ref<AppRootInjection>;
            return () => h('span', '');
          },
        },
      },
    });

    await nextTick();

    expect(injection!.value.teleportContainer).toBe(wrapper.element);
  });

  test('uses passed teleportContainer', () => {
    const container = document.createElement('div');
    const wrapper = mount(AppRoot, {
      props: { teleportContainer: container },
      slots: {
        default: {
          setup() {
            const injection = inject(appRootInjectionKey);
            return () =>
              h(
                'span',
                injection?.value?.teleportContainer === container
                  ? 'ok'
                  : 'fail'
              );
          },
        },
      },
    });

    expect(wrapper.find('span').text()).toBe('ok');
  });
});
