<template>
  <div class="blockquote">
    <Subheadline v-if="props.type === 'text'" class="text">
      <slot />
    </Subheadline>
    <slot v-else />
    <IconContainer class="top-right-icon">
      <slot name="top-right-icon">
        <Quote12Icon />
      </slot>
    </IconContainer>
  </div>
</template>

<script setup lang="ts">
import { Subheadline } from '@/components/typography';
import { IconContainer } from '@/components/blocks';
import Quote12Icon from '@/icons/12/quote.svg';
import { VNode } from 'vue';

/**
 * Renders a stylized blockquote element, typically used for quotations or special text. The component can include an
 * icon in the top right corner and supports different content types for flexible use within UI designs.
 */

export interface BlockquoteProps {
  /** Determines the content type within the blockquote, influencing its presentation. */
  type?: 'text' | 'other';
}

const props = withDefaults(defineProps<BlockquoteProps>(), { type: 'text' });

defineSlots<{
  /** The main content of the blockquote. When `type` is 'text', this content is wrapped in a typography component. */
  default?: () => VNode[];
  /** An optional icon displayed in the top right corner of the blockquote. Defaults to a quote icon. */
  ['top-right-icon']?: () => VNode[];
}>();
</script>

<style lang="scss" scoped>
.blockquote {
  position: relative;
  padding: 6px 28px 8px 12px;
  border-left: 3px solid var(--tgui-link-color);
  border-radius: 4px;
  background: var(--tgui-secondary-fill);
}

.text {
  color: var(--tgui-text-color);
}

.top-right-icon {
  position: absolute;
  top: 4px;
  right: 6px;
  display: block;
}
</style>
