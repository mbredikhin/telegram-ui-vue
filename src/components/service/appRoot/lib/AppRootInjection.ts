import { inject, InjectionKey, Ref } from 'vue';

export interface AppRootInjection {
  platform: 'base' | 'ios';
  appearance?: 'light' | 'dark';
  teleportContainer?: HTMLDivElement;
  isRendered: boolean;
}

export const appRootInjectionKey = Symbol() as InjectionKey<
  Ref<AppRootInjection>
>;

export const useAppRootInjection = () => {
  const injection = inject(appRootInjectionKey);

  if (!injection?.value?.isRendered) {
    throw new Error('[TGUI] Wrap your app with <AppRoot> component');
  }

  return injection;
};
