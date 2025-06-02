import AppRoot from '@/components/service/appRoot/AppRoot.vue';
import {
  ComponentMountingOptions,
  mount as mountComponent,
} from '@vue/test-utils';
import { Component, defineComponent, h } from 'vue';

export function mount<T>(
  component: Component,
  options: ComponentMountingOptions<T>
) {
  const WrappedComponent = defineComponent({
    name: (component as Component & { __name: string }).__name,
    setup() {
      return () =>
        h(
          AppRoot,
          {},
          {
            default: () => h(component, options?.props),
          }
        );
    },
  });

  return mountComponent(WrappedComponent, options);
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
