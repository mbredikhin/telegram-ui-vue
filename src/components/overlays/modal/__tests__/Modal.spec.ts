import { mount, randomString } from '@/lib/tests';
import Modal from '../Modal.vue';
import ModalOverlay from '../ModalOverlay.vue';

vi.mock('vauland', () => ({
  DrawerRoot: { template: '<div class="drawer-root"><slot /></div>' },
  DrawerRootNested: {
    template: '<div class="drawer-root-nested"><slot /></div>',
  },
  DrawerPortal: { template: '<div class="drawer-portal"><slot /></div>' },
  DrawerTrigger: {
    template: '<button class="drawer-trigger"><slot /></button>',
  },
  DrawerContent: {
    template: '<div class="drawer-content" v-bind="$attrs"><slot /></div>',
  },
  DrawerOverlay: {
    template: '<div class="drawer-overlay"><slot /></div>',
  },
}));

describe('Modal', () => {
  test('renders default structure with overlay and body', () => {
    const text = randomString();
    const wrapper = mount(Modal, {
      slots: {
        default: text,
      },
      global: {
        stubs: { ModalOverlay },
      },
    });

    expect(wrapper.findComponent(ModalOverlay).exists()).toBe(true);
    expect(wrapper.find('.drawer-content .body').text()).toBe(text);
  });

  test('renders header', () => {
    const header = randomString();
    const wrapper = mount(Modal, {
      slots: {
        header: `<div class="test-header">${header}</div>`,
      },
    });

    expect(wrapper.find('.test-header').text()).toBe(header);
  });

  test('renders trigger slot inside DrawerTrigger', () => {
    const trigger = randomString();
    const wrapper = mount(Modal, {
      slots: {
        trigger: `<span class="test-trigger">${trigger}</span>`,
      },
    });

    expect(wrapper.find('.drawer-trigger .test-trigger').text()).toBe(trigger);
  });

  test('allows overriding overlay slot', () => {
    const overlay = randomString();
    const wrapper = mount(Modal, {
      slots: {
        overlay: `<div class="test-overlay">${overlay}</div>`,
      },
    });

    expect(wrapper.find('.test-overlay').text()).toBe(overlay);
    expect(wrapper.findComponent(ModalOverlay).exists()).toBe(false);
  });

  test('emits update:open when DrawerRoot emits', async () => {
    const wrapper = mount(Modal);

    await wrapper.vm.$emit('update:open', true);

    expect(wrapper.emitted('update:open')).toBeTruthy();
    expect(wrapper.emitted('update:open')![0]).toEqual([true]);
  });

  test('forwards attrs to DrawerContent', () => {
    const id = randomString();
    const dataTest = randomString();
    const wrapper = mount(Modal, {
      attrs: {
        id,
        'data-test': dataTest,
      },
    });

    const drawerContent = wrapper.find('.drawer-content');

    expect(drawerContent.attributes('id')).toBe(id);
    expect(drawerContent.attributes('data-test')).toBe(dataTest);
  });
});
