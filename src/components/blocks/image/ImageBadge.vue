<template>
  <Badge
    v-if="props.type === 'number'"
    v-bind="props"
    type="number"
    class="image-badge"
  >
    <slot />
  </Badge>
</template>

<script setup lang="ts">
import { Badge } from '@/components/blocks';
import { onBeforeMount } from 'vue';

export interface ImageBadgeProps {
  /** The visual style of the badge: 'number' displays the content, 'dot' shows a simple dot. */
  type: 'number' | 'dot';
  /** The color scheme of the badge, affecting its background and text color. */
  mode?: 'primary' | 'critical' | 'secondary' | 'gray' | 'white';
  /** Increases the size of the badge. Applicable only when `type` is 'number'. */
  large?: boolean;
}

const props = defineProps<ImageBadgeProps>();

onBeforeMount(() => {
  if (props.type !== 'number') {
    console.error('[ImageBadge]: Component supports only type="number"');
  }
});
</script>

<style lang="scss" scoped>
.image-badge {
  position: absolute;
  right: -12px;
  top: -12px;
}
</style>
