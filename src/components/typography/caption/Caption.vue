<template>
  <Typography v-bind="props" :class="classes"><slot /></Typography>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Typography, type TypographyProps } from '../';

/**
 * The Caption component is a text wrapper that applies specific typographic styles,
 * based on the provided `level` prop. It's built on top of the Typography component,
 * ensuring consistent text styling across the application. It primarily serves for text
 * that acts as a small, descriptive label or annotation.
 */
type CaptionLevel = '1' | '2';

export interface CaptionProps extends /* @vue-ignore */ Omit<TypographyProps, 'plain'> {
  /** The size level of the caption, influencing its styling and typography size. */
  level?: CaptionLevel;
}

const props = withDefaults(defineProps<CaptionProps>(), { level: '1' });

const classes = computed(() => ({
  caption: true,
  [`caption--${props.level}`]: true,
}));
</script>

<style lang="scss" scoped>
.caption--1 {
  font-size: var(--tgui-font-caption-1-font-size);
  line-height: var(--tgui-font-caption-1-line-height);
}

.caption--2 {
  font-size: var(--tgui-font-caption-2-font-size);
  line-height: var(--tgui-font-caption-2-line-height);
}
</style>
