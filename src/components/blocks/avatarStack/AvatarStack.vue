<template>
  <div class="avatar-stack">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Renders a container for displaying avatars in a stacked layout. This component
 * allows for the creation of visually grouped avatar representations, often used
 * to indicate multiple users or participants.
 */

defineSlots<{
  /** An array of `Avatar` components to be rendered within the stack. */
  ['default'](props?: unknown): unknown;
}>();
</script>

<style lang="scss" scoped>
.avatar-stack {
  display: flex;
}

.avatar-stack > :not(:first-child) {
  margin-left: -12px;
}

.avatar-stack > * {
  box-shadow: 0 0 0 3px var(--tgui-bg-color) !important;
}
</style>
