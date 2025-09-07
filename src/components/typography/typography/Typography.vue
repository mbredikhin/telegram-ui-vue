<template>
  <component v-bind="props" :is="props.is" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * The Typography component is a versatile wrapper for text content, offering
 * customizable styling options such as weight, capitalization, and HTML tag. It's designed
 * to facilitate consistent text styling across your application, with support for customization
 * through props. The component is highly reusable and adaptable to various design needs.
 */

export interface TypographyProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
}

const props = withDefaults(defineProps<TypographyProps>(), {
  weight: '1',
  caps: false,
  is: 'span',
  plain: false,
});

const classes = computed(() => ({
  typography: true,
  [`typography--weight-${props.weight}`]: true,
  'typography--plain': props.plain,
  'typography--caps': props.caps,
}));
</script>

<style lang="scss" scoped>
.typography {
  font-family: var(--tgui-font-family);
}

.typography--weight-1 {
  font-weight: var(--tgui-font-weight-accent-1);
}

.typography--weight-2 {
  font-weight: var(--tgui-font-weight-accent-2);
}

.typography--weight-3 {
  font-weight: var(--tgui-font-weight-accent-3);
}

.typography--plain {
  margin: 0;
}

.typography--caps {
  text-transform: uppercase;
}
</style>
