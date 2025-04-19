<template>
  <Tappable :is="props.is" :type="attrs.type || 'button'" :class="classes">
    <Spinner v-if="props.loading" class="spinner" size="s" />
    <div v-if="slots.before?.()" class="before">
      <slot name="before" />
    </div>
    <ButtonTypography class="content" :size="props.size">
      <slot />
    </ButtonTypography>
    <div v-if="slots.after?.()" class="after">
      <slot name="after" />
    </div>
  </Tappable>
</template>

<script setup lang="ts">
import { Spinner } from '@/components/feedback';
import { Tappable } from '@/components/service';
import { usePlatform } from '@/composables/usePlatform';
import { computed, useAttrs, type Component } from 'vue';
import ButtonTypography from './ButtonTypography.vue';

export interface ButtonProps {
  /** Controls the size of the button, influencing padding and font size. */
  size?: 's' | 'm' | 'l';
  /** If true, stretches the button to fill the width with its container. */
  stretched?: boolean;
  /** Defines the button's visual style, affecting its background and text color. */
  mode?: 'filled' | 'bezeled' | 'plain' | 'gray' | 'outline' | 'white';
  /** Displays a loading indicator in place of the button content when true. */
  loading?: boolean;
  /** Disables the button, preventing user interactions, when true. */
  disabled?: boolean;
  /** Specifies the root element type for the button, allowing for semantic customization or integration with routing libraries. */
  is?: Component | string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'm',
  mode: 'filled',
  is: 'button',
});

const slots = defineSlots<{
  /** Inserts a component before the button text, typically an icon. */
  before(props?: unknown): unknown;
  /** Inserts a component after the button text, such as a badge or indicator. */
  after(props?: unknown): unknown;
  /** Main content of a button. */
  default(props?: unknown): unknown;
}>();

const platform = usePlatform();
const attrs = useAttrs();

const classes = computed(() => ({
  button: true,
  [`button--${props.mode}`]: true,
  [`button--${props.size}`]: true,
  [`button--ios`]: platform === 'ios',
  [`button--${props.stretched}`]: props.stretched,
  [`button--${props.loading}`]: props.loading,
}));
</script>

<style lang="scss" scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  box-sizing: border-box;
  max-inline-size: 100%;
  min-inline-size: 80px;
}

.button--stretched {
  inline-size: 100%;
  flex-grow: 1;
}

.button::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.15s ease-out;
  background: var(--tgui-bg-color);
}

.before,
.after {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: var(--tgui-z-index-simple);
}

.spinner.spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: auto;
  background: inherit;
  border-radius: inherit;
  color: var(--tgui-button-spinner-color);
}

.button--s {
  height: 36px;
  min-width: 34px;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 20px;
}

.button--m {
  height: 42px;
  min-width: 42px;
  gap: 8px;
  padding: 8px 14px;
}

.button--l {
  height: 50px;
  gap: 10px;
  padding: 10px 20px;
}

.button--filled {
  --tgui-button-hovered-opacity: 0.15;
  --tgui-button-spinner-color: var(--tgui-button-text-color);
  color: var(--tgui-button-text-color);
  background: var(--tgui-button-color);
}

.button--bezeled {
  --tgui-button-hovered-opacity: 0.07;
  --tgui-button-spinner-color: var(--tgui-link-color);
  color: var(--tgui-link-color);
  background: var(--tgui-secondary-fill);
}

.button--plain {
  --tgui-button-hovered-opacity: 0.03;
  --tgui-button-spinner-color: var(--tgui-plain-foreground);
  color: var(--tgui-link-color);
  background: transparent;
}

.button--gray {
  --tgui-button-hovered-opacity: 0.5;
  --tgui-button-spinner-color: var(--tgui-plain-foreground);
  color: var(--tgui-plain-foreground);
  background: var(--tgui-plain-background);
}

.button--outline {
  --tgui-button-hovered-opacity: 0.5;
  --tgui-button-spinner-color: var(--tgui-plain-foreground);
  color: var(--tgui-plain-foreground);
  background: inherit;
  box-shadow: 0 0 0 1px var(--tgui-outline);
}

.button--white {
  --tgui-button-hovered-opacity: 0.5;
  --tgui-button-spinner-color: var(--tgui-surface-dark);
  background: var(--tgui-white);
}

.button--ios.button--m {
  border-radius: 12px;
}

.button--ios::after {
  content: unset;
}

.button--loading .before,
.button--loading .after,
.button--loading .content {
  opacity: 0;
}

@media (hover: hover) and (pointer: fine) {
  .button:hover::after {
    opacity: var(--tgui-button-hovered-opacity);
  }
}
</style>
