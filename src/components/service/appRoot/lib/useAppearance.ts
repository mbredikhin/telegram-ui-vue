import { MaybeRef, Ref, ref, toValue, watch } from 'vue';
import { AppRootInjection } from './AppRootInjection';
import { canUseDOM } from '@/lib/dom';
import { getTelegramData } from '@/lib/telegram';

export const getInitialAppearance = () => {
  const telegramData = getTelegramData();
  if (telegramData?.colorScheme) {
    return telegramData.colorScheme;
  }

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
  appearanceProp?: MaybeRef<AppRootInjection['appearance']>
): Ref<NonNullable<AppRootInjection['appearance']>> => {
  const appearance = ref(toValue(appearanceProp) || getInitialAppearance());

  const handleThemeChange = () => {
    const telegramData = getTelegramData();
    if (!telegramData) {
      return;
    }

    appearance.value = telegramData.colorScheme;
  };

  watch(
    () => toValue(appearanceProp),
    (value) => {
      if (value !== undefined) {
        appearance.value = value;
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
