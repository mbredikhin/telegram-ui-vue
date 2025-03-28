<template>
  <Typography v-bind="props" class="headline"><slot /></Typography>
</template>

<script setup lang="ts">
import { Typography } from '../';

/**
 * The Headline component serves as a wrapper for text that is intended to be displayed prominently,
 * typically used for section headings or important titles within the application. It leverages the Typography
 * component for consistent typographic styling, offering a range of customization options through its props.
 * The component defaults to an `<h5>` HTML tag, providing semantic meaning and ensuring good SEO practices,
 * but can be customized as needed.
 */

export interface HeadlineProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
}

const props = withDefaults(defineProps<HeadlineProps>(), {
  weight: '3',
  is: 'h5',
});
</script>

<style lang="scss" scoped>
.headline {
  font-size: var(--tgui-font-headline-font-size);
  line-height: var(--tgui-font-headline-line-height);
}
</style>
