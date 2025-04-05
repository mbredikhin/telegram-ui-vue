<template>
  <Caption v-if="platform === 'ios'" caps>
    <slot />
  </Caption>
  <Subheadline v-else level="2" weight="2">
    <slot />
  </Subheadline>
</template>

<script setup lang="ts">
import { Caption, Subheadline } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { Component } from 'vue';

export interface FormInputTitleProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag or component used to render the text, defaulting to `span`. */
  is?: Component | string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
}

const platform = usePlatform();
</script>
