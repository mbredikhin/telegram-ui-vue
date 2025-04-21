<template>
  <div class="navigation">
    <Text v-if="$slots.default" class="text">
      <slot />
    </Text>
    <Chevron16Icon v-else-if="platform === 'ios'" class="icon" />
  </div>
</template>

<script setup lang="ts">
import { Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import Chevron16Icon from '@/icons/16/chevron.svg';

/**
 * Renders a navigation element with optional text content and an icon. The presence of the icon is
 * dependent on the content and the platform, providing flexibility for different UI scenarios.
 */

const platform = usePlatform();
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--tgui-hint-color);
}

.text {
  flex-grow: 1;
  overflow-wrap: anywhere;
}

.icon {
  flex-shrink: 0;
}
</style>
