<template>
  <component :is="is" :class="classes" />
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
  weight: '3',
  is: 'span',
});

const classes = computed(() => ({
  wrapper: true,
  [`wrapper--weight-${props.weight}`]: true,
  ['wrapper--plain']: props.plain,
  ['wrapper--caps']: props.caps,
}));
</script>

<style lang="scss" module>
.wrapper {
  font-family: var(--tgui-font-family);
}

.wrapper--plain {
  margin: 0;
}

.wrapper--weight-1 {
  font-weight: var(--tgui-font-weight-accent-1);
}

.wrapper--weight-2 {
  font-weight: var(--tgui-font-weight-accent-2);
}

.wrapper--weight-3 {
  font-weight: var(--tgui-font-weight-accent-3);
}

.wrapper--caps {
  text-transform: uppercase;
}
</style>
