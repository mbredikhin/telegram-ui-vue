<template>
  <label :class="classes">
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

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import CheckboxIcon from './icons/checkbox.svg';
import CheckboxCheckedIcon from './icons/checkbox_checked.svg';
import CheckboxIndeterminateIcon from './icons/checkbox_indeterminate.svg';
import { VisuallyHidden } from '@/components/service';
/**
 * Renders a checkbox input with custom styling and optional indeterminate state.
 * The component visually hides the actual input element for accessibility while providing a custom styled appearance.
 */

export interface CheckboxProps {
  /** If true, displays the checkbox with an indeterminate icon instead of checked or unchecked. */
  indeterminate?: boolean;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  indeterminate: false,
});

const attrs = useAttrs();

const classes = computed(() => ({
  checkbox: true,
  'checkbox--disabled': attrs.disabled,
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
