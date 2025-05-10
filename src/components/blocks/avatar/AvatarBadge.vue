<template>
  <Badge
    v-if="attrs.type === 'number'"
    v-bind="attrs"
    type="number"
    class="avatar-badge"
  >
    <slot />
  </Badge>
</template>

<script setup lang="ts">
import { Badge, BadgeProps } from '@/components/blocks';
import { onBeforeMount, useAttrs } from 'vue';

export interface AvatarBadgeProps extends /* @vue-ignore */ BadgeProps {}

defineProps<AvatarBadgeProps>();

// @ts-expect-error Key 'type' satisfies the attrs key constraint
const attrs: BadgeProps = useAttrs();

onBeforeMount(() => {
  if (attrs.type !== 'number') {
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
