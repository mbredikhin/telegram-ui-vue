<template>
  <label data-test-id="checkbox" :class="classes">
    <VisuallyHidden
      v-bind="attrs"
      is="input"
      ref="checkbox"
      type="checkbox"
      class="input"
    />
    <CheckboxIcon class="icon" aria-hidden />
    <div aria-hidden class="checked-icon">
      <CheckboxIndeterminateIcon v-if="props.indeterminate" />
      <CheckboxCheckedIcon v-else />
    </div>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, InputHTMLAttributes, useAttrs } from 'vue';
import CheckboxIcon from './icons/checkbox.svg';
import CheckboxCheckedIcon from './icons/checkbox-checked.svg';
import CheckboxIndeterminateIcon from './icons/checkbox-indeterminate.svg';
import { VisuallyHidden } from '@/components/service';

/**
 * Renders a checkbox input with custom styling and optional indeterminate state.
 * The component visually hides the actual input element for accessibility while providing a custom styled appearance.
 */

export interface CheckboxProps extends /* @vue-ignore */ InputHTMLAttributes {
  /** If true, displays the checkbox with an indeterminate icon instead of checked or unchecked. */
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  indeterminate: false,
});

const attrs: InputHTMLAttributes = useAttrs();

const classes = computed(() => ({
  checkbox: true,
  'checkbox--disabled': attrs.disabled,
  [String(attrs.class)]: !!attrs.class,
}));
</script>

<style lang="scss" scoped>
.checkbox {
  cursor: pointer;
  position: relative;

  &--disabled {
    cursor: default;
    opacity: 0.3;
  }
}

.icon {
  display: block;
  color: var(--tgui-outline);
}

.checked-icon {
  position: absolute;
  top: 0;
  opacity: 0;
  color: var(--tgui-link-color);
  transition: opacity 0.15s ease-out;
}

.input:checked ~ .checked-icon {
  opacity: 1;
}
</style>
