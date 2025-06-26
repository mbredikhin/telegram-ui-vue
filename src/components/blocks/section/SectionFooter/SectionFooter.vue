<template>
  <footer :class="classes">
    <Caption v-if="platform === 'ios'" class="text">
      <slot />
    </Caption>
    <Subheadline v-else level="2" class="text">
      <slot />
    </Subheadline>
  </footer>
</template>

<script setup lang="ts">
import { Caption, Subheadline } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';

export interface SectionFooterProps {
  /** Centering text, adding additional indents */
  centered?: boolean;
}

const props = defineProps<SectionFooterProps>();

const platform = usePlatform();

const classes = computed(() => ({
  'section-footer': true,
  'section-footer--ios': platform === 'ios',
  'section-footer--centered': props.centered,
}));
</script>

<style lang="scss" scoped>
.section-footer {
  padding: 12px 24px;
  &--ios {
    padding: 8px 16px 0;
  }
  &--centered {
    padding: 16px 24px 20px;
    text-align: center;
  }
}
.section-footer--ios.section-footer--centered {
  padding: 16px 16px 0;
}

.text {
  color: var(--tgui-section-header-text-color);
}
</style>
