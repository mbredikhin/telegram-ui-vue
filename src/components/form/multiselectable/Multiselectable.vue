<template>
  <label data-test-id="multiselectable" :class="classes">
    <VisuallyHidden v-bind="attrs" is="input" type="checkbox" class="input">
      <slot />
    </VisuallyHidden>
    <template v-if="platform === 'ios'">
      <MultiselectableIosIcon
        data-test-id="multiselectable-ios-icon"
        class="icon"
        aria-hidden
      />
      <MultiselectableCheckedIosIcon
        data-test-id="multiselectable-checked-ios-icon"
        class="icon--checked"
        aria-hidden
      />
    </template>
    <template v-else>
      <MultiselectableBaseIcon
        data-test-id="multiselectable-base-icon"
        class="icon"
        aria-hidden
      />
      <MultiselectableCheckedBaseIcon
        data-test-id="multiselectable-checked-base-icon"
        class="icon--checked"
        aria-hidden
      />
    </template>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { VisuallyHidden } from '@/components/service';
import { usePlatform } from '@/composables/usePlatform';
import { computed, InputHTMLAttributes, useAttrs } from 'vue';
import MultiselectableIosIcon from './icons/multiselectable-ios.svg';
import MultiselectableBaseIcon from './icons/multiselectable.svg';
import MultiselectableCheckedIosIcon from './icons/multiselectable-checked-ios.svg';
import MultiselectableCheckedBaseIcon from './icons/multiselectable-checked.svg';

/**
 * Renders a custom multiselectable checkbox input, adapting its icons based on the current platform (iOS or others).
 * Supports all standard input checkbox properties.
 */

export interface MultiselectableProps
  extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<MultiselectableProps>();

const platform = usePlatform();
const attrs: InputHTMLAttributes = useAttrs();

const classes = computed(() => ({
  multiselectable: true,
  'multiselectable--disabled': attrs.disabled,
  [String(attrs.class)]: !!attrs.class,
}));
</script>

<style lang="scss" scoped>
.multiselectable {
  position: relative;
  cursor: pointer;
}

.multiselectable--disabled {
  cursor: default;
  opacity: 0.25;
}

.icon {
  display: block;
  color: var(--tgui-outline);
}

.icon--checked {
  position: absolute;
  top: 0;
  opacity: 0;
  color: var(--tgui-link-color);
}

.icon,
.icon--checked {
  transition: opacity 0.15s ease-out;
}

.input:checked ~ .icon {
  opacity: 0;
}

.input:checked ~ .icon--checked {
  opacity: 1;
}
</style>
