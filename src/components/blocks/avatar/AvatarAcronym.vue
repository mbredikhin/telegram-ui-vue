<template>
  <template v-if="!props.size"></template>
  <Caption
    v-else-if="props.size <= 28"
    v-bind="props"
    :level="props.size <= 24 ? '2' : '1'"
    weight="1"
    caps
  >
    <slot />
  </Caption>
  <Headline v-else-if="props.size === 40" v-bind="props" weight="2" caps>
    <slot />
  </Headline>
  <Title v-else-if="props.size === 48" v-bind="props" weight="1" level="3" caps>
    <slot />
  </Title>
  <LargeTitle v-else v-bind="props" weight="1" caps>
    <slot />
  </LargeTitle>
</template>

<script setup lang="ts">
import { Caption, Headline, LargeTitle, Title } from '@/components/typography';
import { ImageProps } from '../image/Image.vue';

export interface AvatarAcronymProps {
  /** Controls the font weight of the text, with options ranging from light to bold. */
  weight?: '1' | '2' | '3';
  /** If true, transforms the text to uppercase for stylistic emphasis. */
  caps?: boolean;
  /** Specifies the HTML tag used to render the text. */
  is?: string;
  /** When true, removes the default margins around the text, useful for inline styling or custom layouts. */
  plain?: boolean;
  size: ImageProps['size'];
}

const props = defineProps<AvatarAcronymProps>();
</script>

<style lang="scss" scoped></style>
