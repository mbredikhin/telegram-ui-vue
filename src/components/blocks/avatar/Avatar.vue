<template>
  <Image style="border-radius: 50%" :class="classes" v-bind="props">
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
import { computed } from 'vue';
import { Image } from '../image';
import AvatarAcronym from './AvatarAcronym.vue';
/**
 * Renders an image with specific styles for an avatar presentation, including optional acronym display and badge support.
 * Utilizes the `Image` component for core functionality, enhancing it with avatar-specific features like acronyms and badges.
 */

export interface AvatarProps {
  /** Specifies the size of the image, with a default of 40. Sizes are defined in pixels. */
  size?: 20 | 24 | 28 | 40 | 48 | 96;
  /** One or two letters to be shown as a placeholder. `fallback-icon` will not be used if `acronym` is provided. */
  acronym?: string;
}

const props = defineProps<AvatarProps>();

defineSlots<{
  /** Optional children to render within the image component's container. */
  ['default'](props?: unknown): unknown;
  /** An element (often an icon) displayed `acronym` props is not provided. */
  ['fallback-icon'](props?: unknown): unknown;
}>();

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
