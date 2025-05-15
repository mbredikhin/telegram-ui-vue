<template>
  <div :class="classes" :aria-disabled="attrs.disabled">
    <label
      v-bind="attrs"
      :aria-disabled="attrs.disabled"
      class="body"
      @focusin="onFocus"
      @focusout="onBlur"
    >
      <div v-if="slots.before?.()" class="before">
        <slot name="before" />
      </div>
      <slot />
      <div v-if="slots.after?.()" class="after">
        <slot name="after" />
      </div>
    </label>
    <FormInputTitle
      v-if="slots.header?.() && platform === 'base'"
      class="title"
    >
      <slot name="header" />
    </FormInputTitle>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import {
  computed,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ref,
  useAttrs,
} from 'vue';
import FormInputTitle from './FormInputTitle.vue';

/**
 * Wraps an input element with additional layout for headers, icons, or actions, providing a consistent look and feel across the form.
 * It supports conditional rendering based on the platform and the state of the form element.
 */

export interface Attrs extends InputHTMLAttributes, LabelHTMLAttributes {}

export interface FormInputProps extends /* @vue-ignore */ Attrs {
  /** Defines the visual state of the form input (e.g., error, focused). */
  status?: 'default' | 'error' | 'focused';
}

const props = withDefaults(defineProps<FormInputProps>(), {
  status: 'default',
});

const emit = defineEmits<{
  (e: 'focus', event: Event): void;
  (e: 'blur', event: Event): void;
}>();

const slots = defineSlots<{
  default(props?: unknown): unknown;
  /** Optional header content, displayed above the form input on `base` platform. */
  header(props?: unknown): unknown;
  /** Content to be displayed before the form input, such as icons or labels. */
  before(props?: unknown): unknown;
  /** Content to be displayed after the form input, often used for action icons or additional information. */
  after(props?: unknown): unknown;
}>();

const isFocused = ref(false);
const platform = usePlatform();
const attrs: InputHTMLAttributes = useAttrs();

const formStatus = computed(
  () => props.status || (isFocused.value ? 'focused' : 'default')
);

const classes = computed(() => ({
  ['form-input']: true,
  [`form-input--${platform}`]: true,
  [`form-input--${formStatus.value}`]: true,
  [`form-input--focused`]: isFocused.value,
  ['form-input--disabled']: attrs.disabled,
}));

function onFocus(event: Event) {
  emit('focus', event);
  if (attrs.disabled) {
    return;
  }
  isFocused.value = true;
}

function onBlur(event: Event) {
  emit('blur', event);
  isFocused.value = false;
}
</script>

<style lang="scss" scoped>
.form-input--base {
  position: relative;
  padding: 20px 22px 16px 22px;
  background: var(--tgui-bg-color);
}

.form-input--base .title {
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  top: 6px;
  left: 32px;
  /* We can't use the right option because it will be stretched, and we need the container to be small if the text is short */
  max-width: calc(100% - 32px * 2 - 22px);
  border-radius: 5px;
  padding: 0 6px;
  color: var(--tgui-secondary-hint-color);
  background: var(--tgui-bg-color);
}

.form-input--disabled {
  position: relative;
  pointer-events: none;
}

.form-input--ios.form-input--disabled {
  opacity: 0.35;
}

.form-input--base.form-input--disabled::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background: var(--tgui-bg-color);
}

.body {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.before,
.after {
  display: flex;
}

.form-input--base .body {
  border-radius: 14px;
  box-shadow: 0 0 0 2px var(--tgui-outline);
}

.form-input--base.form-input--error .title {
  color: var(--tgui-destructive-text-color);
}

.form-input--base.form-input--error .body {
  box-shadow: 0 0 0 2px var(--tgui-destructive-text-color);
}

.form-input--base.form-input--focused:not(.form-input--error) .title {
  color: var(--tgui-link-color);
}

.form-input--base.form-input--focused:not(.form-input--error) .body {
  box-shadow: 0 0 0 2px var(--tgui-link-color);
}

.form-input--ios .body {
  border-radius: 12px;
  background: var(--tgui-bg-color);
}

.form-input--ios.form-input--error .body {
  box-shadow: 0 0 0 1.5px var(--tgui-destructive-text-color);
}
</style>
