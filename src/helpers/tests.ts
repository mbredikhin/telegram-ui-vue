import { appRootInjectionKey } from '@/components/service/appRoot';
import AppRoot from '@/components/service/appRoot/AppRoot.vue';
import {
  ComponentMountingOptions,
  mount as mountComponent,
} from '@vue/test-utils';
import { Component, ref } from 'vue';

export function mount<T>(
  component: Component,
  options: ComponentMountingOptions<T>
) {
  return mountComponent(component, {
    parentComponent: AppRoot,
    ...options,
    global: {
      provide: {
        [appRootInjectionKey]: ref({
          platform: 'base',
          appearance: 'light',
          isRendered: true,
        }),
      },
      ...options.global,
    },
  });
}

export const randomString = (length = 10) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
