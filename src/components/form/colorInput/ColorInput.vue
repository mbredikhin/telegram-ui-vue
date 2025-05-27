<template>
  <FormInput :status="attrs.status" :class="classes">
    <template #header>
      <slot name="header" />
    </template>
    <template #before>
      <slot name="before" />
    </template>
    <template #after>
      <div class="color-input__circle">
        <VisuallyHidden
          is="input"
          type="color"
          v-bind="attrs"
          :value="inputValue"
          @input="onChange"
        />
        <div
          class="color-input__circle-color"
          :style="{ 'background-color': String(inputValue) }"
        ></div>
      </div>
    </template>
    <component
      :is="platform === 'ios' ? Text : Subheadline"
      caps
      class="color-input__text"
    >
      {{ inputValue }}
    </component>
  </FormInput>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import FormInput, { FormInputProps } from '../formInput/FormInput.vue';
import { VisuallyHidden } from '@/components/service';
import { Subheadline, Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed, ref, useAttrs, VNode, watch } from 'vue';

/**
 * Renders a color picker input within a form structure, displaying the selected color value.
 * It adapts the text style based on the platform and supports additional properties like header and status.
 */

export interface ColorInputProps extends /* @vue-ignore */ FormInputProps {
  defaultValue?: string;
}

const props = withDefaults(defineProps<ColorInputProps>(), {
  value: '',
  defaultValue: '#EFEFF4',
  status: 'default',
});

defineSlots<{
  /** Optional header content, displayed above the form input on `base` platform. */
  header?: () => VNode[];
  /** Content to be displayed before the form input, such as icons or labels. */
  before?: () => VNode[];
}>();

const attrs: FormInputProps = useAttrs();
const inputValue = ref(attrs.value || props.defaultValue);
const platform = usePlatform();

watch(
  () => props.value,
  (newValue) => {
    if (!newValue) {
      return;
    }
    inputValue.value = newValue;
  }
);

const classes = computed(() => ({
  ['color-input']: true,
  ['color-input--ios']: platform === 'ios',
}));

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  inputValue.value = target.value;
}
</script>

<style lang="scss">
.color-input {
  display: flex;
  gap: 10px;
  min-height: 48px;
  padding: 10px 12px 10px 16px;
}

.color-input--ios {
  padding: 10px 16px;
  min-height: 50px;
}

.color-input__circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg at 50% 50%,
    #0c28ff 0deg,
    #03ffff 60deg,
    #24d627 120deg,
    #fdff22 180deg,
    #ff2227 240deg,
    #fe2df6 300deg,
    #7122ff 360deg
  );
}

.color-input__circle-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.color-input__circle-color::before,
.color-input__circle-color::after {
  content: '';
  position: absolute;
  border-radius: inherit;
}

.color-input__circle-color::before {
  inset: 2px;
  background: var(--tgui-bg-color);
}

.color-input__circle-color::after {
  inset: 4px;
  background: inherit;
}

.color-input__text {
  flex: 1 1 0;
}
</style>
