<template>
  <div :style="styles" :class="classes" v-bind="attrs">
    <img
      v-if="hasSrc"
      class="image"
      :alt="attrs.alt"
      :crossOrigin="attrs.crossorigin"
      :decoding="attrs.decoding"
      :loading="attrs.loading"
      :referrerPolicy="attrs.referrerpolicy"
      :sizes="attrs.sizes"
      :src="attrs.src"
      :srcSet="attrs.srcset"
      :useMap="attrs.usemap"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-if="shouldShowFallbackIcon" class="fallback">
      <slot name="fallback-icon" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ImgHTMLAttributes, ref, useAttrs } from 'vue';

/**
 * Renders an image with optional fallback content. It supports custom sizing and will automatically
 * handle loading states and errors by optionally displaying a fallback icon. This component can also
 * include additional content, such as badges or overlays, as children.
 */

export interface ImageProps extends /* @vue-ignore */ ImgHTMLAttributes {
  /** Specifies the size of the image, with a default of 40. Sizes are defined in pixels. */
  size?: 20 | 24 | 28 | 40 | 48 | 96;
}

const props = withDefaults(defineProps<ImageProps>(), { size: 40 });

const emit = defineEmits<{
  (e: 'load', event: Event): void;
  (e: 'error', event: Event): void;
}>();

const slots = defineSlots<{
  /** Optional children to render within the image component's container. */
  default(props?: unknown): unknown;
  /** An element (often an icon) displayed when the image fails to load or the `src` attribute is not provided. */
  ['fallback-icon'](props?: unknown): unknown;
}>();

const loaded = ref(false);
const failed = ref(false);
const attrs: ImgHTMLAttributes = useAttrs();

const styles = computed(() => ({
  width: `${props.size}px`,
  minWidth: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: `${getBorderRadius(props.size)}px`,
}));

const classes = computed(() => ({
  wrapper: true,
  ['wrapper--loaded']: loaded.value,
}));

const hasSrc = computed(() => attrs.src || attrs.srcset);

const shouldShowFallbackIcon = computed(
  () =>
    (failed.value || !hasSrc.value) &&
    (slots['fallback-icon']?.() as unknown[])?.length > 0
);

function onImageLoad(event: Event) {
  if (loaded.value) {
    return;
  }
  loaded.value = true;
  failed.value = false;
  emit('load', event);
}

function onImageError(event: Event) {
  loaded.value = false;
  failed.value = true;
  emit('error', event);
}

function getBorderRadius(size: number) {
  if (size < 40) {
    return 4;
  }
  if (size < 96) {
    return 8;
  }
  return 12;
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  background-color: var(--tgui-tertiary-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 1px var(--tgui-outline);
}

.image {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  visibility: hidden;
  border-radius: inherit;
}

.wrapper--loaded .image {
  visibility: visible;
}

.fallback {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
