<template>
  <Tappable is="button" :class="classes" @click="emit('click')">
    <LargeTitle v-if="platform === 'ios'">
      <slot />
    </LargeTitle>
    <Title v-else>
      <slot />
    </Title>
  </Tappable>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { LargeTitle, Title } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const platform = usePlatform();

const classes = computed(() => ({
  ['pin-input-button']: true,
  ['pin-input-button--ios']: platform === 'ios',
}));
</script>

<style lang="scss" scoped>
.pin-input-button {
  width: var(--tgui-pin-input-button-width);
  height: 56px;
  padding: 0;
  border: none;
  border-radius: 16px;
  color: var(--tgui-text-color);
  background: var(--tgui-tertiary-bg-color);

  &--ios {
    width: 76px;
    height: 76px;
    border-radius: 50%;
  }
}
</style>
