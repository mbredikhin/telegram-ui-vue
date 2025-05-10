<template>
  <Badge
    v-if="attrs.type === 'number'"
    v-bind="attrs"
    type="number"
    class="image-badge"
  >
    <slot />
  </Badge>
</template>

<script setup lang="ts">
import { Badge, BadgeProps } from '@/components/blocks';
import { onBeforeMount, useAttrs } from 'vue';

export interface ImageBadgeProps extends /* @vue-ignore */ BadgeProps {}

defineProps<ImageBadgeProps>();

// @ts-expect-error Key 'type' satisfies the attrs key constraint
const attrs: BadgeProps = useAttrs();

onBeforeMount(() => {
  if (attrs.type !== 'number') {
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
