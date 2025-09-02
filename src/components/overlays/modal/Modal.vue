<template>
  <component
    :is="props.nested ? DrawerRootNested : DrawerRoot"
    v-bind="props"
    @update:open="(open) => emit('update:open', open)"
  >
    <DrawerTrigger v-if="hasSlotContent(slots.trigger)" asChild>
      <div>
        <slot name="trigger" />
      </div>
    </DrawerTrigger>

    <DrawerPortal :to="appRootInjection.teleportContainer">
      <slot name="overlay">
        <ModalOverlay />
      </slot>
      <DrawerContent class="wrapper" v-bind="attrs">
        <slot name="header" />
        <div class="body">
          <slot />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </component>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  AppRootInjection,
  useAppRootInjection,
} from '@/components/service/appRoot';
import {
  DrawerContent,
  DrawerDirection,
  DrawerPortal,
  DrawerRoot,
  DrawerRootNested,
  DrawerTrigger,
} from 'vauland';
import { Ref, useAttrs, VNode } from 'vue';
import ModalOverlay from './ModalOverlay.vue';
import { hasSlotContent } from '@/lib/vue';

export interface ModalProps {
  activeSnapPoint?: number | string | null;
  /**
   * Number between 0 and 1 that determines when the drawer should be closed.
   * Example: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.
   * @default 0.25
   */
  closeThreshold?: number;
  shouldScaleBackground?: boolean;
  /**
   * When `false` we don't change body's background color when the drawer is open.
   * @default true
   */
  setBackgroundColorOnScale?: boolean;
  /**
   * Duration for which the drawer is not draggable after scrolling content inside of the drawer.
   * @default 500ms
   */
  scrollLockTimeout?: number;
  /**
   * When `true`, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open
   */
  fixed?: boolean;
  /**
   * When `false` dragging, clicking outside, pressing esc, etc. will not close the drawer.
   * Use this in combination with the `open` prop, otherwise you won't be able to open/close the drawer.
   * @default true
   */
  dismissible?: boolean;
  /**
   * When `false` it allows to interact with elements outside of the drawer without closing it.
   * @default true
   */
  modal?: boolean;
  open?: boolean;
  /**
   * Opened by default, skips initial enter animation. Still reacts to `open` state changes
   * @default false
   */
  defaultOpen?: boolean;
  nested?: boolean;
  /**
   * Direction of the drawer. Can be `top` or `bottom`, `left`, `right`.
   * @default 'bottom'
   */
  direction?: DrawerDirection;
  /**
   * When `true` the `body` doesn't get any styles assigned from Vaul
   */
  noBodyStyles?: boolean;
  /**
   * When `true` only allows the drawer to be dragged by the `<Drawer.Handle />` component.
   * @default false
   */
  handleOnly?: boolean;
  preventScrollRestoration?: boolean;
  /**
   * Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up.
   * Should go from least visible. Example `[0.2, 0.5, 0.8]`.
   * You can also use px values, which doesn't take screen height into account.
   */
  snapPoints?: (number | string)[];
  /**
   * Index of a `snapPoint` from which the overlay fade should be applied. Defaults to the last snap point.
   */
  fadeFromIndex?: never;
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: undefined,
  defaultOpen: undefined,
  fixed: undefined,
  dismissible: true,
  activeSnapPoint: undefined,
  snapPoints: undefined,
  shouldScaleBackground: undefined,
  setBackgroundColorOnScale: true,
  closeThreshold: 0.25,
  fadeFromIndex: undefined,
  nested: false,
  modal: true,
  scrollLockTimeout: 100,
  direction: 'bottom',
  handleOnly: false,
});

const emit = defineEmits<{
  /** Fired upon state change, facilitating open/close state synchronization. */
  (e: 'update:open', open: boolean): void;
}>();

const slots = defineSlots<{
  /** Modal content. */
  default?: () => VNode[];
  /** Custom header component to display at the top of the modal. */
  header?: () => VNode[];
  /** Custom component for the modal's overlay backdrop. */
  overlay?: () => VNode[];
  /** Component or element used to trigger the modal's visibility. */
  trigger?: () => VNode[];
}>();

const attrs = useAttrs();
const appRootInjection = useAppRootInjection() as Ref<AppRootInjection>;
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 96%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: column;
  outline: none;
  background-color: var(--tgui-bg-color);
  z-index: var(--tgui-z-index-overlay);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--tgui-divider);
}

.body {
  overflow-y: auto;
  padding-bottom: var(--tgui-safe-area-inset-bottom);
}
</style>
