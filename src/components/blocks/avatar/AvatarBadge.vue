<template>
  <Badge
    v-if="props.type === 'number'"
    v-bind="props"
    type="number"
    class="avatar-badge"
  >
    <slot />
  </Badge>
</template>

<script setup lang="ts">
import { Badge } from '@/components/blocks';
import { onBeforeMount } from 'vue';

export interface AvatarBadgeProps {
  /** The visual style of the badge: 'number' displays the content, 'dot' shows a simple dot. */
  type: 'number' | 'dot';
  /** The color scheme of the badge, affecting its background and text color. */
  mode?: 'primary' | 'critical' | 'secondary' | 'gray' | 'white';
  /** Increases the size of the badge. Applicable only when `type` is 'number'. */
  large?: boolean;
}

const props = defineProps<AvatarBadgeProps>();

onBeforeMount(() => {
  if (props.type !== 'number') {
    console.error('[AvatarBadge]: Component supports only type="number"');
  }
});
</script>

<style lang="scss" scoped>
.avatar-badge {
  position: absolute;
  right: -12px;
  top: 0px;
}
</style>
