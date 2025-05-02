<template>
  <label class="rating" @change="onChangeLabel">
    <VisuallyHidden is="input" name="rating" type="radio" :value="0" />

    <label v-for="key of keys" :key="key" class="element">
      <component
        :is="props.icon"
        v-if="getPickedElementWidth(key + 1) !== undefined"
        class="element--picked"
        :style="{ width: `${(getPickedElementWidth(key + 1) || 0) * 100}%` }"
      />
      <component :is="props.icon" />

      <input
        v-for="element of elements"
        :key="element"
        type="radio"
        :value="(key + (element + 1) * normalizedPrecision).toFixed(1)"
        name="rating"
        :style="{
          width: `${normalizedPrecision * 100}%`,
          left: `${element * normalizedPrecision * 100}%`,
        }"
        class="input"
      />
    </label>
  </label>
</template>

<script setup lang="ts">
import { VisuallyHidden } from '@/components/service';
import { useEnsuredControl } from '@/composables/useEnsuredControl';
import { clamp } from '@/helpers/math';
import { type Component, computed } from 'vue';
import StarIcon from './icons/star.svg';

/**
 * Renders a customizable rating component, allowing users to provide a rating by selecting a value using icons (e.g., stars).
 * Supports fractional ratings through precision control and allows for custom rating icon components.
 */

export interface RatingProps {
  /** The precision of the rating, determining the fraction of the star that can be selected. */
  precision?: 0.1 | 0.2 | 0.25 | 0.5 | 1;
  /** The maximum rating value, representing the number of icons displayed. */
  max?: number;
  /** The current value of the rating. */
  value?: number;
  /** The component used to render the rating icons. Defaults to a star icon. */
  icon?: Component;
}

const props = withDefaults(defineProps<RatingProps>(), {
  precision: 1,
  max: 5,
  value: 0,
  icon: () => StarIcon,
});

const emit = defineEmits<{
  /** Invoked when the rating value changes. */
  (e: 'change', value: number): void;
}>();

const MINIMUM_PRECISION = 0.1;

const [value, setValue] = useEnsuredControl({
  defaultValue: props.value,
  onChange,
});

const normalizedPrecision = computed(() =>
  clamp(props.precision, MINIMUM_PRECISION, 1)
);

const elementsWithPrecision = computed(() =>
  Math.floor(1 / normalizedPrecision.value)
);

const elements = computed(() =>
  Array.from(Array(elementsWithPrecision).keys())
);

const keys = computed(() => Array.from(Array(props.max).keys()));

function onChange(value: number) {
  emit('change', value);
}

function onChangeLabel(event: Event) {
  const { target } = event;
  if (target instanceof HTMLInputElement) {
    setValue(parseFloat(target.value));
  }
}

function getPickedElementWidth(elementNumber: number) {
  if (elementNumber <= value.value) {
    return 1;
  }

  const valueRange = elementNumber - value.value;
  if (valueRange > 0 && valueRange < 1) {
    return 1 - valueRange;
  }

  return undefined;
}
</script>

<style lang="scss" scoped>
.rating {
  position: relative;
  display: flex;
  gap: 4px;
  padding: 12px;
}

.element {
  position: relative;
  color: var(--tgui-tertiary-bg-color);
}

.element:focus-visible {
  outline: 2px solid var(--tgui-link-color);
}

.element--picked {
  position: absolute;
  color: var(--tgui-link-color);
}

.input {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0;
  opacity: 0;
}
</style>
