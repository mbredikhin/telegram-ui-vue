<template>
  <Tappable is="button" class="snackbar-button">
    <slot />
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
</script>

<style lang="scss" scoped>
.snackbar-button {
  border: none;
  padding: 0;
  color: var(--tgui-toast-accent-color);
  background: transparent;
  font-family: var(--tgui-font-family);
}
</style>
