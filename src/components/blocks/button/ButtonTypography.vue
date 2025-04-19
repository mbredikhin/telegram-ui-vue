<template>
  <Text v-if="props.size === 'l'" v-bind="props" weight="2">
    <slot />
  </Text>
  <Subheadline v-else v-bind="props" level="2" weight="2">
    <slot />
  </Subheadline>
</template>

<script setup lang="ts">
import { Subheadline, Text } from '@/components/typography';

export interface ButtonTypographyProps {
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
  size: 's' | 'm' | 'l';
}

const props = withDefaults(defineProps<ButtonTypographyProps>(), {
  size: 'm',
  is: 'span',
});
</script>
