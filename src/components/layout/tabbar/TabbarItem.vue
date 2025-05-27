<template>
  <Tappable
    is="button"
    interactiveAnimation="opacity"
    v-bind="attrs"
    :class="classes"
  >
    <div v-if="hasSlotContent(slots.default)" class="icon">
      <slot />
    </div>
    <Caption
      v-if="hasSlotContent(slots.text)"
      class="text"
      weight="2"
      :level="platform === 'ios' ? '2' : '1'"
    >
      <slot name="text" />
    </Caption>
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { Caption } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { hasSlotContent } from '@/helpers/vue';
import { ButtonHTMLAttributes, computed, useAttrs, VNode } from 'vue';

/**
 * Represents an individual tab within a `Tabbar`. Each `TabbarItem` typically contains an icon and optional text.
 * When selected, the tab exhibit different visual styles to indicate its active state.
 * The component adapts its styling based on the platform, providing a consistent look and feel across different devices.
 */

export interface TabbarItemProps
  extends /* @vue-ignore */ ButtonHTMLAttributes {
  /** Indicates whether the tab is selected or active. */
  selected?: boolean;
}

const props = withDefaults(defineProps<TabbarItemProps>(), {
  selected: false,
});

const slots = defineSlots<{
  /** The icon displayed on the tab. It should have dimensions of 28x28. */
  default?: () => VNode[];
  /** The text displayed on the tab. */
  text?: () => VNode[];
}>();

const platform = usePlatform();
const attrs: ButtonHTMLAttributes = useAttrs();

const classes = computed(() => ({
  ['tabbar-item']: true,
  ['tabbar-item--ios']: platform === 'ios',
  ['tabbar-item--selected']: props.selected,
}));
</script>

<style lang="scss" scoped>
.tabbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  flex: 1 0 0;
  max-inline-size: 100%;
  min-inline-size: 0;
  padding: 12px 16px 16px;
  margin: 0;
  border: none;
  background: transparent;
  transition: 0.15s ease-out;
  color: var(--tgui-secondary-hint-color);
}

.tabbar-item--ios {
  padding: 8px 12px 4px;
  gap: 4px;
}

.tabbar-item--selected {
  color: var(--tgui-link-color);
}

.tabbar-item--selected:not(.tabbar-item--ios) .icon {
  background: var(--tgui-secondary-fill);
}

.icon {
  display: flex;
  justify-content: center;
  min-width: 64px;
  padding: 2px 10px;
  border-radius: 35px;
}

.tabbar-item--ios .icon {
  padding: 0;
}

.text {
  white-space: nowrap;
  max-inline-size: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
