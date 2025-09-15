/* eslint-disable vue/one-component-per-file */
import { defineComponent, inject, markRaw, ref } from 'vue';
import { mount, randomString } from '../tests';
import { appRootInjectionKey } from '@/components/service/appRoot';

describe('mount helper', () => {
  test('provides default appRoot context', () => {
    const CustomComponent = markRaw(
      defineComponent({
        setup() {
          const appRootInjection = inject(appRootInjectionKey);
          return () => JSON.stringify(appRootInjection?.value);
        },
      })
    );

    const wrapper = mount(CustomComponent);
    expect(wrapper.text()).toContain('"platform":"base"');
    expect(wrapper.text()).toContain('"appearance":"light"');
    expect(wrapper.text()).toContain('"isRendered":true');
  });

  test('allows overriding provided values', () => {
    const CustomComponent = markRaw(
      defineComponent({
        setup() {
          const appRootInjection = inject(appRootInjectionKey);
          return () => JSON.stringify(appRootInjection?.value);
        },
      })
    );

    const wrapper = mount(CustomComponent, {
      global: {
        provide: {
          [appRootInjectionKey]: ref({
            platform: 'custom',
            appearance: 'dark',
            isRendered: false,
          }),
        },
      },
    });

    expect(wrapper.text()).toContain('"platform":"custom"');
    expect(wrapper.text()).toContain('"appearance":"dark"');
    expect(wrapper.text()).toContain('"isRendered":false');
  });
});

describe('randomString', () => {
  test('generates string of correct length', () => {
    const length = 5;
    expect(randomString(length)).toHaveLength(length);
  });

  test('defaults to length 10', () => {
    expect(randomString()).toHaveLength(10);
  });

  test('only contains allowed characters', () => {
    expect(/^[A-Za-z0-9]+$/.test(randomString(50))).toBe(true);
  });

  test('produces different strings on multiple calls', () => {
    expect(randomString()).not.toEqual(randomString());
  });
});
