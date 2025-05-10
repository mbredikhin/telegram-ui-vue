<template>
  <Text v-if="props.size === 'l'" weight="2" v-bind="attrs">
    <slot />
  </Text>
  <Subheadline v-else level="2" weight="2" v-bind="attrs">
    <slot />
  </Subheadline>
</template>

<script setup lang="ts">
import { Subheadline, Text, TypographyProps } from '@/components/typography';
import { useAttrs } from 'vue';

export interface ButtonTypographyProps
  extends /* @vue-ignore */ TypographyProps {
  size: 's' | 'm' | 'l';
}

const props = withDefaults(defineProps<ButtonTypographyProps>(), {
  size: 'm',
});

const attrs: TypographyProps = useAttrs();
</script>
