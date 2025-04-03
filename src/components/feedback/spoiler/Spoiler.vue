<template>
  <div :class="classes" @click="toggle" @keydown="toggle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

/**
 * Provides a way to hide or show content, such as details or spoilers, with a simple click.
 * The visibility state can be controlled externally via props or toggled by user interaction.
 */

export interface SpoilerProps {
  /** Controls the visibility of the content inside the spoiler. */
  visible?: boolean;
}

const props = withDefaults(defineProps<SpoilerProps>(), {
  visible: false,
});

const isVisible = ref(props.visible);

watch(
  () => props.visible,
  (value) => {
    isVisible.value = value;
  }
);

const classes = computed(() => ({
  spoiler: true,
  ['spoiler--visible']: isVisible.value,
}));

function toggle() {
  isVisible.value = !isVisible.value;
}
</script>

<style lang="scss" scoped>
.spoiler {
  position: relative;
  display: table;
}

.spoiler::before {
  position: absolute;
  content: '';
  inset: 0;
  background-color: var(--tgui-bg-color);
  background-image: url('./icons/spoiler.svg');
  z-index: var(--tgui-z-index-simple);
  transition: 0.4s ease;
}

.spoiler--visible::before {
  opacity: 0;
}
</style>
