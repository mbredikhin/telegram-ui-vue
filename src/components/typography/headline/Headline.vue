<template>
  <Typography v-bind="props" class="headline"><slot /></Typography>
</template>

<script setup lang="ts">
import { Typography, type TypographyProps } from '../';

/**
 * The Headline component serves as a wrapper for text that is intended to be displayed prominently,
 * typically used for section headings or important titles within the application. It leverages the Typography
 * component for consistent typographic styling, offering a range of customization options through its props.
 * The component defaults to an `<h5>` HTML tag, providing semantic meaning and ensuring good SEO practices,
 * but can be customized as needed.
 */

export type HeadlineProps = /* @vue-ignore */ TypographyProps;

const props = withDefaults(defineProps<HeadlineProps>(), { is: 'h5' });
</script>

<style lang="scss" scoped>
.headline {
  font-size: var(--tgui-font-headline-font-size);
  line-height: var(--tgui-font-headline-line-height);
}
</style>
