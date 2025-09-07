<template>
  <Typography v-bind="attrs" class="large-title">
    <slot />
  </Typography>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Typography, TypographyProps } from '../';

/**
 * The LargeTitle component is designed for prominent display text, typically used for major headings
 * or titles within an application. It encapsulates the Typography component's features, offering
 * extensive styling and semantic customization options while defaulting to an `<h1>` HTML element.
 * This choice of default component underscores the importance and hierarchy of the text it encapsulates,
 * making it suitable for primary page titles or significant headings.
 */

export interface LargeTitleProps extends /* @vue-ignore */ TypographyProps {}

defineProps<LargeTitleProps>();

const attrs = computed<LargeTitleProps>(() => ({
  weight: '1',
  is: 'h1',
  ...useAttrs(),
}));
</script>

<style lang="scss" scoped>
.large-title {
  font-size: var(--tgui-font-large-title-font-size);
  line-height: var(--tgui-font-large-title-line-height);
}
</style>
