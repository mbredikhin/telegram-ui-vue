<template>
  <Typography v-bind="props" :class="classes"><slot /></Typography>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Typography } from '../';

/**
 * The Subheadline component is designed to render text that serves as a secondary heading
 * or subheading within content. It leverages the Typography component for consistent text styling,
 * offering additional control over the text's size through the `level` prop. By default, it renders
 * as an `<h6>` element but can be customized with the `is` prop.
 */
type SubheadlineLevel = '1' | '2';

export interface SubheadlineProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
  /** Determines the size of the subheadline, with `1` being the default and '2' providing a smaller option. */
  level?: SubheadlineLevel;
}

const props = withDefaults(defineProps<SubheadlineProps>(), {
  weight: '3',
  level: '1',
  is: 'h6',
});

const classes = computed(() => ({
  subheadline: true,
  [`subheadline--${props.level}`]: true,
}));
</script>

<style lang="scss" scoped>
.subheadline--1 {
  font-size: var(--tgui-font-subheadline-1-font-size);
  line-height: var(--tgui-font-subheadline-1-line-height);
}

.subheadline--2 {
  font-size: var(--tgui-font-subheadline-2-font-size);
  line-height: var(--tgui-font-subheadline-2-line-height);
}
</style>
