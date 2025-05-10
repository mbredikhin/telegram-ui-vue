<template>
  <Tappable v-bind="attrs" is="button" class="snackbar-button">
    <slot />
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { ButtonHTMLAttributes, useAttrs } from 'vue';

export interface SnackbarButtonProps
  extends /* @vue-ignore */ ButtonHTMLAttributes {}

defineProps<SnackbarButtonProps>();

const attrs: ButtonHTMLAttributes = useAttrs();
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
