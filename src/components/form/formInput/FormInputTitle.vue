<template>
  <Caption v-if="platform === 'ios'" caps>
    <slot />
  </Caption>
  <Subheadline v-else level="2" weight="2">
    <slot />
  </Subheadline>
</template>

<script setup lang="ts">
import { Caption, Subheadline, TypographyProps } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';

export interface FormInputTitleProps
  extends /* @vue-ignore */ TypographyProps {}

defineProps<FormInputTitleProps>();

const platform = usePlatform();
</script>
