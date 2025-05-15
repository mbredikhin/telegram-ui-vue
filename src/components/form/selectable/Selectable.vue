<template>
  <label :class="classes">
    <VisuallyHidden
      v-bind="attrs"
      is="input"
      :defaultChecked="props.defaultChecked"
      type="radio"
      class="input"
    >
      <slot />
    </VisuallyHidden>
    <SelectableIosIcon v-if="platform === 'ios'" class="icon" aria-hidden />
    <SelectableBaseIcon v-else class="icon" aria-hidden />
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
import SelectableIosIcon from './icons/selectable-ios.svg';
import SelectableBaseIcon from './icons/selectable-base.svg';

/**
 * Renders a custom styled selectable input (radio button), visually enhancing the default HTML input
 * with custom icons for both `iOS` and `base` platforms. It supports all standard properties and events
 * of an HTML input element of type "radio".
 *
 * The component determines the appropriate icon based on the operating platform, ensuring a consistent
 * user experience across different environments. The actual radio input is visually hidden while remaining
 * fully accessible and functional.
 */

interface SelecatableProps extends /* @vue-ignore */ InputHTMLAttributes {
  defaultChecked?: boolean;
}

const props = withDefaults(defineProps<SelecatableProps>(), {
  defaultChecked: false,
});

const platform = usePlatform();
const attrs: InputHTMLAttributes = useAttrs();

const classes = computed(() => ({
  selectable: true,
  ['selectable--disabled']: attrs.disabled,
}));
</script>

<style lang="scss" scoped>
.selectable {
  position: relative;
  cursor: pointer;
}

.selectable--disabled {
  cursor: default;
  opacity: 0.25;
}

.icon {
  display: block;
  opacity: 0;
  color: var(--tgui-link-color);
  transition: opacity 0.15s ease-out;
}

.input:checked ~ .icon {
  opacity: 1;
}
</style>
