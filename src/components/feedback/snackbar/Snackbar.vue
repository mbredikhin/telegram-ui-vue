<template>
  <RootRenderer>
    <div data-test-id="snackbar" :class="classes" v-bind="attrs">
      <div class="body">
        <div v-if="hasSlotContent(slots.before)" class="before">
          <slot name="before" />
        </div>
        <div class="middle">
          <Caption v-if="hasSlotContent(slots.default)" weight="2">
            <slot />
          </Caption>
          <Caption v-if="hasSlotContent(slots.description)">
            <slot name="description" />
          </Caption>
          <Caption v-if="hasSlotContent(slots.link)">
            <slot name="link" />
          </Caption>
        </div>
        <div v-if="hasSlotContent(slots.after)" class="after">
          <slot name="after" />
        </div>
      </div>
    </div>
  </RootRenderer>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { RootRenderer } from '@/components/service';
import { Caption } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { useTimeout } from '@/composables/useTimeout';
import { hasSlotContent } from '@/lib/vue';
import { computed, ref, useAttrs, onMounted, VNode } from 'vue';
import { TRANSITION_FINISH_DURATION } from './lib';

/**
 * Displays a brief message at the bottom of the screen, which can contain actions and other content.
 * It automatically dismisses after a set duration, providing feedback or interaction prompts to users.
 */

export interface SnackbarProps {
  /** The duration in milliseconds after which the snackbar will automatically close. */
  duration?: number;
}

const props = withDefaults(defineProps<SnackbarProps>(), {
  duration: 4000,
});

const emit = defineEmits<{
  /** Event invoked when the snackbar is closed. */
  (e: 'close'): void;
}>();

const slots = defineSlots<{
  /** Element or component to be displayed on the left side of the snackbar. */
  before?: () => VNode[];
  /** Element or component to be displayed on the right side of the snackbar. */
  after?: () => VNode[];
  /** The main content of the snackbar, typically text or a message. */
  default?: () => VNode[];
  /** Additional content displayed below the main message. */
  description?: () => VNode[];
  /** A link component to be included in the snackbar for user interaction. */
  link?: () => VNode[];
}>();

const platform = usePlatform();
const closing = ref(false);
const attrs = useAttrs();

const classes = computed(() => ({
  snackbar: true,
  'snackbar--ios': platform === 'ios',
  'snackbar--closing': closing.value,
  [String(attrs.class)]: !!attrs.class,
}));

const closeTimeout = useTimeout(close, props.duration);

onMounted(() => {
  closeTimeout.set();
});

function close() {
  closing.value = true;
  setTimeout(() => {
    emit('close');
  }, TRANSITION_FINISH_DURATION);
}
</script>

<style lang="scss" scoped>
.snackbar {
  position: fixed;
  user-select: none;
  left: 10px;
  right: 10px;
  bottom: 10px;
  box-sizing: border-box;
  max-inline-size: 460px;
  animation: verticalIntro 340ms cubic-bezier(0.3, 0.3, 0.5, 1);
  transition: transform 320ms cubic-bezier(0.3, 0.3, 0.5, 1);
}

.body {
  position: sticky;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 16px 10px 10px;
  border-radius: 10px;
  -webkit-backdrop-filter: blur(28px);
  backdrop-filter: blur(28px);
  background: var(--tgui-surface-dark);
}

.snackbar--closing {
  transform: translate3d(0, 140%, 0);
}

.snackbar--ios {
  bottom: 16px;
}

.snackbar--ios .body {
  border-radius: 14px;
}

.before,
.after {
  display: flex;
  align-items: center;
  color: var(--tgui-toast-accent-color);
}

.middle {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  color: var(--tgui-white);
}

@keyframes verticalIntro {
  from {
    transform: translate3d(0, 140%, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
