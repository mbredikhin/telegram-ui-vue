<template>
  <Image style="border-radius: 50%" :class="classes" v-bind="attrs">
    <template #fallback-icon>
      <AvatarAcronym v-if="props.acronym" :size="props.size">
        {{ props.acronym }}
      </AvatarAcronym>
      <slot v-else name="fallback-icon" />
    </template>
    <slot />
  </Image>
</template>

<script setup lang="ts">
import { computed, ImgHTMLAttributes, useAttrs, VNode } from 'vue';
import { Image, ImageProps } from '@/components/blocks';
import AvatarAcronym from './AvatarAcronym.vue';

/**
 * Renders an image with specific styles for an avatar presentation, including optional acronym display and badge support.
 * Utilizes the `Image` component for core functionality, enhancing it with avatar-specific features like acronyms and badges.
 */

interface Attrs extends ImageProps, ImgHTMLAttributes {}

export interface AvatarProps extends /* @vue-ignore */ Attrs {
  /** One or two letters to be shown as a placeholder. `fallback-icon` will not be used if `acronym` is provided. */
  acronym?: string;
}

const props = defineProps<AvatarProps>();

defineSlots<{
  /** Optional children to render within the image component's container. */
  default?: () => VNode[];
  /** An element (often an icon) displayed `acronym` props is not provided. */
  ['fallback-icon']?: () => VNode[];
}>();

const attrs: Attrs = useAttrs();

const classes = computed(() => ({
  avatar: true,
  ['avatar--with-acronym']: props.acronym,
}));
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
}

.avatar--with-acronym {
  background-color: var(--tgui-secondary-fill);
  color: var(--tgui-link-color);
}
</style>
