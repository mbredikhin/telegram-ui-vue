<template>
  <component :is="sizeToIcon[props.size]" />
</template>

<script setup lang="ts">
import SmallIcon from './icons/Small.vue';
import MediumIcon from './icons/Medium.vue';
import LargeIcon from './icons/Large.vue';

interface IosSpinnerProps {
  size: 's' | 'm' | 'l';
}

const props = defineProps<IosSpinnerProps>();

const sizeToIcon = {
  s: SmallIcon,
  m: MediumIcon,
  l: LargeIcon,
};
</script>
