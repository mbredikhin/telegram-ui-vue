import {
  AppRootInjection,
  useAppRootInjection,
} from '@/components/service/appRoot';

export const usePlatform = (): NonNullable<AppRootInjection['platform']> => {
  const injection = useAppRootInjection();
  return injection.value.platform || 'base';
};
