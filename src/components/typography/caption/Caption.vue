<template>
  <Typography v-bind="props" :class="classes"><slot /></Typography>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Typography } from '../';

/**
 * The Caption component is a text wrapper that applies specific typographic styles,
 * based on the provided `level` prop. It's built on top of the Typography component,
 * ensuring consistent text styling across the application. It primarily serves for text
 * that acts as a small, descriptive label or annotation.
 */
type CaptionLevel = '1' | '2';

export interface CaptionProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** The size level of the caption, influencing its styling and typography size. */
  level?: CaptionLevel;
}

const props = withDefaults(defineProps<CaptionProps>(), {
  weight: '3',
  is: 'span',
  level: '1',
});

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
