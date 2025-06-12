import { getTelegramData } from '@/lib/telegram';
import { AppRootInjection } from './AppRootInjection';

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

  return getInitialPlatform();
};
