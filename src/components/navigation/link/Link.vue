<template>
  <a class="link" v-bind="attrs">
    <slot />
  </a>
</template>

<script setup lang="ts">
import { AnchorHTMLAttributes, useAttrs } from 'vue';

export interface LinkProps extends /* @vue-ignore */ AnchorHTMLAttributes {}

defineProps<LinkProps>();

const attrs: AnchorHTMLAttributes = useAttrs();
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: var(--tgui-link-color);
}
</style>
