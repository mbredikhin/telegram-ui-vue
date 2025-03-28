<template>
  <Typography v-bind="props" class="text"><slot /></Typography>
</template>

<script setup lang="ts">
import { Typography } from '../';

/**
 * Text component is designed for general-purpose text rendering,
 * offering a wide range of typographic options. It extends the Typography
 * component, inheriting its flexibility and styling capabilities.
 * This component is ideal for paragraphs, labels, or any textual content, providing
 * consistent styling across the application.
 */

export interface TextProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
}

const props = withDefaults(defineProps<TextProps>(), {
  weight: '3',
  is: 'span',
});
</script>

<style lang="scss" scoped>
.text {
  font-size: var(--tgui-font-text-font-size);
  line-height: var(--tgui-font-text-line-height);
}
</style>
