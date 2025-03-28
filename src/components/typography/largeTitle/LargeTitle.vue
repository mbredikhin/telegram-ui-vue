<template>
  <Typography v-bind="props" class="large-title"><slot /></Typography>
</template>

<script setup lang="ts">
import { Typography } from '../';
/**
 * The LargeTitle component is designed for prominent display text, typically used for major headings
 * or titles within an application. It encapsulates the Typography component's features, offering
 * extensive styling and semantic customization options while defaulting to an `<h1>` HTML element.
 * This choice of default component underscores the importance and hierarchy of the text it encapsulates,
 * making it suitable for primary page titles or significant headings.
 */

export interface LargeTitleProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
}

const props = withDefaults(defineProps<LargeTitleProps>(), {
  weight: '3',
  is: 'h1',
});
</script>

<style lang="scss" scoped>
.large-title {
  font-size: var(--tgui-font-large-title-font-size);
  line-height: var(--tgui-font-large-title-line-height);
}
</style>
