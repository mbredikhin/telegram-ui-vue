import { Ref, ref, watch } from 'vue';
import { AppRootInjection } from './AppRootInjection';
import { canUseDOM } from '@/lib/dom';
import { getTelegramData } from '@/lib/telegram';

export const getInitialAppearance = () => {
  if (
    canUseDOM &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }

  return 'light';
};

export const getBrowserAppearanceSubscriber = (
  setAppearance: (
    appearance: NonNullable<AppRootInjection['appearance']>
  ) => void
): (() => void) => {
  if (!canUseDOM || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = () => {
    setAppearance(mediaQuery.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', listener);
  return () => mediaQuery.removeEventListener('change', listener);
};

export const useAppearance = (
  appearanceProp?: AppRootInjection['appearance']
): Ref<NonNullable<AppRootInjection['appearance']>> => {
  const appearance = ref(appearanceProp || getInitialAppearance());

  const handleThemeChange = () => {
    const telegramData = getTelegramData();
    if (!telegramData) {
      return;
    }

    appearance.value = telegramData.colorScheme;
  };

  watch(
    () => appearanceProp,
    () => {
      if (appearanceProp !== undefined) {
        appearance.value = appearanceProp;
        return () => {};
      }

      const telegramData = getTelegramData();
      if (telegramData) {
        telegramData.onEvent('themeChanged', handleThemeChange);
        return () => telegramData.offEvent('themeChanged', handleThemeChange);
      }

      return getBrowserAppearanceSubscriber(
        (value) => (appearance.value = value)
      );
    }
  );

  return appearance;
};
