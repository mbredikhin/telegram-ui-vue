<template>
  <label data-test-id="switch" :class="classes">
    <VisuallyHidden v-bind="attrs" is="input" type="checkbox" class="input" />
    <div aria-hidden class="control"></div>
    <slot />
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, InputHTMLAttributes, useAttrs, VNode } from 'vue';
import { usePlatform } from '@/composables/usePlatform';
import { VisuallyHidden } from '@/components/service';

/**
 * A custom switch component that mimics the behavior of a checkbox input but with enhanced styling.
 * It supports all the standard attributes of an HTML input element of type "checkbox".
 * The appearance of the switch can be customized to match either a base or iOS platform style.
 */

export interface SwitchProps extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<SwitchProps>();

defineSlots<{
  /** Switch label. */
  default?: () => VNode[];
}>();

const platform = usePlatform();
const attrs: InputHTMLAttributes = useAttrs();

const classes = computed(() => ({
  'switch-wrapper': true,
  'switch-wrapper--ios': platform === 'ios',
  'switch-wrapper--base': platform === 'base',
  'switch-wrapper--disabled': attrs.disabled,
  [String(attrs.class)]: !!attrs.class,
}));
</script>

<style lang="scss" scoped>
.switch-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 52px;
  height: 32px;
  border-radius: 16px;
}

.switch-wrapper--disabled {
  cursor: default;
  opacity: 0.4;
}

.control::before {
  position: absolute;
  content: '';
  inset: 0;
  background: var(--tgui-secondary-bg-color);
}

.switch-wrapper--base .control::before {
  border-radius: 16px;
  border: 3px solid var(--tgui-secondary-hint-color);
}

.control::after {
  position: absolute;
  content: '';
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
}

.switch-wrapper--base .control::after {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  background: var(--tgui-secondary-hint-color);
}

.switch-wrapper--ios .control::after {
  width: 28px;
  height: 28px;
  margin-left: 2px;
  box-shadow:
    0 3px 1px 0 rgba(0, 0, 0, 0.06),
    0 3px 8px 0 rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.04);
  background: var(--tgui-white);
}

.input:checked + .control::before {
  border-color: var(--tgui-link-color);
  background-color: var(--tgui-link-color);
}

.switch-wrapper--base .input:checked + .control::after {
  width: 24px;
  height: 24px;
}

.input:checked + .control::after {
  transform: translateX(20px) translateY(-50%);
}

.switch-wrapper--base .input:checked + .control::after {
  background: var(--tgui-white);
  transform: translateX(16px) translateY(-50%);
}

@media (prefers-reduced-motion: no-preference) {
  .control::before {
    transition:
      background-color,
      border-color 67ms linear;
  }

  .control::after {
    /** Value from https://material-web.dev/components/switch/ */
    transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  }

  .switch-wrapper--ios .control::before {
    transition: background-color 0.2s ease;
  }

  .switch-wrapper--ios .control::after {
    transition: transform 0.2s cubic-bezier(0.36, -0.24, 0.26, 1.32);
  }
}
</style>
