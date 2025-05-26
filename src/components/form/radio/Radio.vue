<template>
  <label :class="classes" @click="onClick">
    <VisuallyHidden
      v-bind="attrs"
      is="input"
      type="radio"
      class="input"
      :checked="checked"
    />
    <RadioIcon class="icon" aria-hidden />
    <RadioCheckedIcon class="icon--checked" aria-hidden />
  </label>
</template>

<script setup lang="ts">
import { VisuallyHidden } from '@/components/service';
import { computed, InputHTMLAttributes, useAttrs } from 'vue';
import RadioIcon from './icons/radio.svg';
import RadioCheckedIcon from './icons/radio-checked.svg';
import { useEnsuredControl } from '@/composables/useEnsuredControl';

/**
 * Renders a custom radio button, visually hiding the actual input while displaying custom icons for unchecked and checked states.
 * It supports all standard properties and events of an HTML input element of type "radio".
 */

export interface RadioProps extends /* @vue-ignore */ InputHTMLAttributes {
  defaultChecked?: boolean;
}

const props = withDefaults(defineProps<RadioProps>(), {
  defaultChecked: false,
});

const emit = defineEmits<{
  (e: 'input', value: boolean): void;
}>();

const attrs: InputHTMLAttributes = useAttrs();

const [checked, setChecked] = useEnsuredControl({
  defaultValue:
    (attrs.checked as boolean) ?? (props.defaultChecked as boolean) ?? false,
  onChange,
});

const classes = computed(() => ({
  radio: true,
  ['radio--disabled']: attrs.disabled,
}));

function onClick() {
  const value = !attrs.checked;
  setChecked(value);
  emit('input', value);
}

function onChange(value: boolean) {
  emit('input', value);
}
</script>

<style lang="scss" scoped>
.radio {
  position: relative;
  cursor: pointer;
  display: block;
}

.radio--disabled {
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
