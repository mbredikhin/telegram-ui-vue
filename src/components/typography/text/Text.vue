<template>
  <Typography v-bind="props" class="text"><slot /></Typography>
</template>

<script setup lang="ts">
import { Typography, type TypographyProps } from '../';

/**
 * Text component is designed for general-purpose text rendering,
 * offering a wide range of typographic options. It extends the Typography
 * component, inheriting its flexibility and styling capabilities.
 * This component is ideal for paragraphs, labels, or any textual content, providing
 * consistent styling across the application.
 */

export type TextProps = /* @vue-ignore */ Omit<TypographyProps, 'plain'>;

const props = withDefaults(defineProps<TextProps>(), { is: 'span' });
</script>

<style lang="scss" scoped>
.text {
  font-size: var(--tgui-font-text-font-size);
  line-height: var(--tgui-font-text-line-height);
}
</style>
