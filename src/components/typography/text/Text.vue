<template>
  <Typography v-bind="attrs" class="text">
    <slot />
  </Typography>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Typography, TypographyProps } from '../';

/**
 * Text component is designed for general-purpose text rendering,
 * offering a wide range of typographic options. It extends the Typography
 * component, inheriting its flexibility and styling capabilities.
 * This component is ideal for paragraphs, labels, or any textual content, providing
 * consistent styling across the application.
 */

export interface TextProps
  extends /* @vue-ignore */ Omit<TypographyProps, 'plain'> {}

defineProps<TextProps>();

const attrs = computed<TextProps>(() => ({
  weight: '1',
  is: 'span',
  ...useAttrs(),
}));
</script>

<style lang="scss" scoped>
.text {
  font-size: var(--tgui-font-text-font-size);
  line-height: var(--tgui-font-text-line-height);
}
</style>
