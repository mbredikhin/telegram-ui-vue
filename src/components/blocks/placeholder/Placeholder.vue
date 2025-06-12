<template>
  <section class="placeholder">
    <slot v-if="hasSlotContent(slots.default)" />
    <dl
      v-if="hasSlotContent(slots.header) || hasSlotContent(slots.description)"
      class="fields"
    >
      <Title is="dt" v-if="hasSlotContent(slots.header)" level="3" weight="2">
        <slot name="header" />
      </Title>
      <Text
        is="dd"
        v-if="hasSlotContent(slots.description)"
        class="description"
      >
        <slot name="description" />
      </Text>
    </dl>
    <slot v-if="hasSlotContent(slots.action)" name="action" />
  </section>
</template>

<script setup lang="ts">
import { Text, Title } from '@/components/typography';
import { hasSlotContent } from '@/lib/vue';
import { VNode } from 'vue';

/** A versatile component designed to display a placeholder with optional text, images, and actions. */

const slots = defineSlots<{
  /** Element(s) to be displayed as the primary visual content, typically an image or an animation. */
  default?: () => VNode[];
  /** The primary text, usually a title or a header, for the placeholder. */
  header?: () => VNode[];
  /** Additional descriptive text to provide more details or context. */
  description?: () => VNode[];
  /** An actionable element, such as a button, to be placed in the placeholder for user interaction. */
  action?: () => VNode[];
}>();
</script>

<style lang="scss" scoped>
.placeholder {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.fields {
  overflow-wrap: anywhere;
  text-align: center;
  margin: 0;
}

.description {
  color: var(--tgui-hint-color);
  margin-left: 0;
}

.description:not(:first-child) {
  margin-top: 8px;
}
</style>
