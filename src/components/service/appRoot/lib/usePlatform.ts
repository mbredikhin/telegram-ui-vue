import { getTelegramData } from '@/helpers/telegram';
import { AppRootInjection, appRootInjectionKey } from './AppRootInjection';
import { inject } from 'vue';

export const getInitialPlatform = () => {
  const telegramData = getTelegramData();
  if (!telegramData) {
    return 'base';
  }

  if (['ios', 'macos'].includes(telegramData.platform)) {
    return 'ios';
  }

  return 'base';
};

export const usePlatform = (
  platform?: AppRootInjection['platform']
): NonNullable<AppRootInjection['platform']> => {
  if (platform !== undefined) {
    return platform;
  }

  const appRootInjection = inject(appRootInjectionKey);
  if (
    appRootInjection?.value?.isRendered &&
    appRootInjection?.value?.platform !== undefined
  ) {
    return appRootInjection?.value?.platform;
  }

  return getInitialPlatform();
};
