import { mount } from '@/lib/tests';
import { ref } from 'vue';
import RootRenderer from '../RootRenderer.vue';
import { appRootInjectionKey } from '@/components/service/appRoot/lib/AppRootInjection';
import { randomString } from '@/lib/tests';

describe('RootRenderer', () => {
  test('renders slot content directly when teleportContainer is not set', () => {
    const text = randomString();
    const wrapper = mount(RootRenderer, {
      slots: { default: () => text },
    });

    expect(wrapper.text()).toBe(text);
  });

  test('teleports content to provided container', () => {
    const text = randomString();
    const container = document.createElement('div');
    document.body.appendChild(container);

    mount(RootRenderer, {
      global: {
        provide: {
          [appRootInjectionKey]: ref({
            platform: 'base',
            appearance: 'light',
            isRendered: true,
            teleportContainer: container,
          }),
        },
      },
      slots: { default: () => text },
    });

    expect(container.textContent).toContain(text);

    container.remove();
  });

  test('reacts to reactive teleportContainer changes', async () => {
    const text = randomString();
    const container1 = document.createElement('div');
    const container2 = document.createElement('div');
    document.body.appendChild(container1);
    document.body.appendChild(container2);

    const teleportContainer = ref<HTMLElement | null>(container1);

    mount(RootRenderer, {
      global: {
        provide: {
          [appRootInjectionKey]: ref({
            platform: 'base',
            appearance: 'light',
            isRendered: true,
            teleportContainer,
          }),
        },
      },
      slots: { default: () => text },
    });

    expect(container1.textContent).toContain(text);

    teleportContainer.value = container2;
    await Promise.resolve(); // wait for DOM update

    expect(container2.textContent).toContain(text);

    container1.remove();
    container2.remove();
  });
});
