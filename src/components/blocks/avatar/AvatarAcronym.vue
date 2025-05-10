<template>
  <template v-if="!props.size"></template>
  <Caption
    v-else-if="props.size <= 28"
    v-bind="attrs"
    :level="props.size <= 24 ? '2' : '1'"
    weight="1"
    caps
  >
    <slot />
  </Caption>
  <Headline v-else-if="props.size === 40" v-bind="attrs" weight="2" caps>
    <slot />
  </Headline>
  <Title v-else-if="props.size === 48" v-bind="attrs" weight="1" level="3" caps>
    <slot />
  </Title>
  <LargeTitle v-else v-bind="attrs" weight="1" caps>
    <slot />
  </LargeTitle>
</template>

<script setup lang="ts">
import {
  Caption,
  Headline,
  LargeTitle,
  Title,
  TypographyProps,
} from '@/components/typography';
import { ImageProps } from '../image/Image.vue';
import { useAttrs } from 'vue';

export interface AvatarAcronymProps extends /* @vue-ignore */ TypographyProps {
  size?: ImageProps['size'];
}

const props = withDefaults(defineProps<AvatarAcronymProps>(), { size: 40 });

const attrs: TypographyProps = useAttrs();
</script>
