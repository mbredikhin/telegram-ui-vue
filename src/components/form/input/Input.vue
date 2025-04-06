<template>
  <FormInput :status="props.status" :disabled="props.disabled" :class="classes">
    <template #header>
      <slot name="header" />
    </template>
    <template #before>
      <slot name="before" />
    </template>
    <template #after>
      <slot name="after" />
    </template>

    <Text
      is="input"
      v-if="platform === 'ios'"
      Subheadline
      class="input__inner"
      :type="props.type"
      :disabled="props.disabled"
      v-bind="$attrs"
    />
    <Subheadline
      is="input"
      v-else
      class="input__inner"
      :type="props.type"
      :disabled="props.disabled"
      v-bind="$attrs"
    />
  </FormInput>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';
import FormInput from '../formInput/FormInput.vue';
import { Subheadline, Text } from '@/components/typography';

/**
 * Renders a text input field with enhanced styling and integration into a form structure. Supports customization through props and standard input attributes.
 * It automatically adapts typography and layout based on the platform, ensuring a consistent user experience across devices.
 */

export interface InputProps {
  /** Defines the visual state of the form input (e.g., error, focused). */
  status?: 'default' | 'error' | 'focused';
  /** Indicates if the form input is disabled. */
  disabled?: boolean;
  /** Input type. */
  type: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  disabled: false,
  type: 'text',
});

const platform = usePlatform();

const classes = computed(() => ({
  ['input-wrapper']: true,
  ['input-wrapper--ios']: platform === 'ios',
}));
</script>

<style lang="scss">
.input-wrapper {
  padding: 12px 16px;
}

.input-wrapper--ios {
  min-height: 48px;
}

.input__inner {
  display: block;
  width: 100%;
  margin: 0;
  border: 0;
  outline: 0;
  padding: 0;
  resize: none;
  background: transparent;
  box-sizing: border-box;
  text-overflow: ellipsis;
  color: var(--tgui-text-color);
}

.input__inner::-webkit-outer-spin-button,
.input__inner::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.input__inner::placeholder {
  color: var(--tgui-secondary-hint-color);
}
</style>
