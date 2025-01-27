import { inject } from 'vue';
import { appRootInjectionKey, type AppRootInjection } from './AppRootInjection';
import { getTelegramData } from '@/helpers/telegram';

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

export const useAppRootInjection = () => {
  const injection = inject(appRootInjectionKey)!;

  if (!injection.value.isRendered) {
    throw new Error('[TGUI] Wrap your app with <AppRoot> component');
  }

  return injection;
};

export { appRootInjectionKey, type AppRootInjection };
