<template>
  <component :is="sizeToIcon[props.size]">
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 0 0"
      to="360 0 0"
      dur="0.7s"
      repeatCount="indefinite"
    />
  </component>
</template>

<script setup lang="ts">
import SmallIcon from './icons/Small.vue';
import MediumIcon from './icons/Medium.vue';
import LargeIcon from './icons/Large.vue';

interface BaseSpinnerProps {
  size: 's' | 'm' | 'l';
}

const props = defineProps<BaseSpinnerProps>();

const sizeToIcon = {
  s: SmallIcon,
  m: MediumIcon,
  l: LargeIcon,
};
</script>
