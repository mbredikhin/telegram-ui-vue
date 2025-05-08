<template>
  <Tappable is="button" role="tab" :class="classes">
    <Text :weight="textWeight">
      <slot />
    </Text>
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed } from 'vue';

/**
 * TabsItem component represents an individual tab within a TabsList.
 * It can be interactively selected to display associated content.
 */

export interface TabsListItemProps {
  /** Indicates if the tab item is currently selected. */
  selected?: boolean;
}

const props = withDefaults(defineProps<TabsListItemProps>(), {
  selected: false,
});

const platform = usePlatform();

const classes = computed(() => ({
  ['tabs-list-item']: true,
  ['tabs-list-item--selected']: props.selected,
}));

const textWeight = computed(() => {
  if (platform === 'ios') {
    return props.selected ? '1' : '2';
  }
  return '2';
});
</script>

<style lang="scss" scoped>
.tabs-list-item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1 0 0;
  max-inline-size: 100%;
  height: 44px;
  border: none;
  border-radius: inherit;
  background: transparent;
  transition: color 125ms;
  color: var(--tgui-secondary-hint-color);
}

.tabs-list-item--selected {
  color: var(--tgui-link-color);
}
</style>
