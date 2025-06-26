<template>
  <header :class="classes" v-bind="props">
    <template v-if="props.large">
      <Subheadline
        is="h1"
        v-if="platform === 'ios'"
        level="1"
        weight="2"
        class="title"
      >
        <slot />
      </Subheadline>
      <Text is="h1" v-else weight="2" class="title">
        <slot />
      </Text>
    </template>
    <template v-else>
      <Caption is="h1" v-if="platform === 'ios'" caps class="title">
        <slot />
      </Caption>
      <Subheadline is="h1" v-else level="2" weight="2" class="title">
        <slot />
      </Subheadline>
    </template>
  </header>
</template>

<script setup lang="ts">
import { Caption, Subheadline, Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';

export interface SectionHeaderProps {
  /** Large title, changes font size, padding and color */
  large?: boolean;
}

const props = defineProps<SectionHeaderProps>();

const platform = usePlatform();

const classes = computed(() => ({
  'section-header': true,
  'section-header--ios': platform === 'ios',
  'section-header--large': props.large,
}));
</script>

<style lang="scss" scoped>
.section-header {
  padding: 20px 24px 4px 22px;
  color: var(--tgui-link-color);
  &--large {
    padding-left: 24px;
    color: var(--tgui-text-color);
  }
  &--ios {
    padding: 16px 16px 8px 16px;
    color: var(--tgui-section-header-text-color);
  }
}
.section-header--ios.section-header--large {
  padding: 0 0 12px;
  color: var(--tgui-text-color);
}
</style>
