import { AppRootInjection, useAppRootInjection } from '@/components';

export const usePlatform = (): NonNullable<AppRootInjection['platform']> => {
  const injection = useAppRootInjection();
  return injection.value.platform || 'base';
};
