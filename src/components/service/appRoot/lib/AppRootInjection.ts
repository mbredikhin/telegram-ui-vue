import { InjectionKey, Ref } from 'vue';

export interface AppRootInjection {
  platform: 'base' | 'ios';
  appearance?: 'light' | 'dark';
  teleportContainer?: HTMLDivElement;
  isRendered: boolean;
}

export const appRootInjectionKey = Symbol() as InjectionKey<
  Ref<AppRootInjection>
>;
