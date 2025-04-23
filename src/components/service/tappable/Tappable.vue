<template>
  <component
    :is="props.is"
    :class="classes"
    :readonly="attrs.readonly"
    @pointercancel="onPointerCancel"
    @pointerdown="onPointerDown"
  >
    <Ripple v-if="hasRippleEffect" :clicks="clicks" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { type Component, computed, useAttrs } from 'vue';
import { useRipple } from './lib';
import { usePlatform } from '@/composables/usePlatform';
import Ripple from './Ripple.vue';

export interface TappableProps {
  /** Component or HTML Tag */
  is?: Component | string;
  interactiveAnimation?: 'opacity' | 'background';
}

const props = withDefaults(defineProps<TappableProps>(), {
  is: 'div',
  interactiveAnimation: 'background',
});

const platform = usePlatform();
const { clicks, onPointerCancel, onPointerDown } = useRipple();
const attrs = useAttrs();

const classes = computed(() => ({
  tappable: true,
  ['tappable--ios']: platform === 'ios',
  ['tappable--opacity']: props.interactiveAnimation === 'opacity',
}));

const hasRippleEffect = computed(
  () =>
    platform === 'base' &&
    props.interactiveAnimation === 'background' &&
    !attrs.readonly
);
</script>

<style lang="scss" scoped>
.tappable {
  position: relative;
  isolation: isolate;
  cursor: pointer;
  transition: opacity 0.15s ease-out;
}

.tappable[readonly] {
  cursor: default;
  pointer-events: visible;
}

.tappable[disabled] {
  cursor: default;
  opacity: 0.35;
}

.tappable--opacity:active,
.tappable--ios:active {
  opacity: 0.65;
}

@media (hover: hover) and (pointer: fine) {
  .tappable--opacity:hover,
  .tappable--ios:hover {
    opacity: 0.85;
  }
}
</style>
