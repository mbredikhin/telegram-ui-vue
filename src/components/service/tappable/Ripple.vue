<template>
  <span aria-hidden class="ripple">
    <span
      v-for="wave of props.clicks"
      :key="wave.date"
      class="wave"
      :style="{
        top: `${wave.y}px`,
        left: `${wave.x}px`,
      }"
    ></span>
  </span>
</template>

<script setup lang="ts">
import { Wave } from './lib';

export interface RippleProps {
  clicks: Wave[];
}

const props = defineProps<RippleProps>();
</script>

<style lang="scss" scoped>
.ripple {
  overflow: hidden;
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transition: background-color 0.15s ease-out;
}

.wave {
  content: '';
  position: absolute;
  height: 24px;
  width: 24px;
  margin: -12px 0;
  border-radius: 50%;
  background: var(--tgui-outline);
  animation: waveRise 0.3s cubic-bezier(0.3, 0.3, 0.5, 1);
  opacity: 0;
}

@keyframes waveRise {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: scale(8);
    opacity: 0;
  }
}
</style>
