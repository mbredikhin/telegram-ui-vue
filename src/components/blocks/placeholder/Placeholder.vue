<template>
  <section class="placeholder">
    <slot v-if="slots.default?.()" />
    <dl v-if="slots.header?.() || slots.description?.()" class="fields">
      <Title is="dt" v-if="slots.header?.()" level="3" weight="2">
        <slot name="header" />
      </Title>
      <Text is="dd" v-if="slots.description?.()" class="description">
        <slot name="description" />
      </Text>
    </dl>
    <slot v-if="slots.action?.()" name="action" />
  </section>
</template>

<script setup lang="ts">
import { Text, Title } from '@/components/typography';

/** A versatile component designed to display a placeholder with optional text, images, and actions. */

const slots = defineSlots<{
  /** Element(s) to be displayed as the primary visual content, typically an image or an animation. */
  default(props?: unknown): unknown;
  /** The primary text, usually a title or a header, for the placeholder. */
  header(props?: unknown): unknown;
  /** Additional descriptive text to provide more details or context. */
  description(props?: unknown): unknown;
  /** An actionable element, such as a button, to be placed in the placeholder for user interaction. */
  action(props?: unknown): unknown;
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
