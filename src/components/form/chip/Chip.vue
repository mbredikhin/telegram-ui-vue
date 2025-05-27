<template>
  <Tappable :is="props.is" interactiveAnimation="opacity" :class="classes">
    <div v-if="hasSlotContent(slots.before)" class="before">
      <slot name="before" />
    </div>
    <Subheadline
      class="text"
      :level="platform === 'ios' ? '2' : '1'"
      weight="2"
    >
      <slot />
    </Subheadline>
    <div v-if="hasSlotContent(slots.after)" class="after">
      <slot name="after" />
    </div>
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { Subheadline } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { hasSlotContent } from '@/helpers/vue';
import { type Component, computed, VNode } from 'vue';

export interface ChipProps {
  /** Defines the visual style of the chip, affecting its background, border, and shadow. */
  mode?: 'elevated' | 'mono' | 'outline';
  /** Specifies the HTML tag or component used to render the Chip, defaulting to `div`. */
  is?: Component | string;
}

const props = withDefaults(defineProps<ChipProps>(), {
  mode: 'elevated',
  is: 'div',
});

const slots = defineSlots<{
  /** Content or component to be placed before the main text, typically an icon or avatar. */
  before?: () => VNode[];
  /** Content or component to be placed after the main text, such as an icon indicating an action. */
  after?: () => VNode[];
  /** The main text content of the chip. */
  default?: () => VNode[];
}>();

const platform = usePlatform();

const classes = computed(() => ({
  chip: true,
  [`chip--${props.mode}`]: true,
}));
</script>

<style lang="scss" scoped>
.chip {
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 10px;
}

.chip--elevated {
  background: var(--tgui-surface-primary);
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.05);
}

.chip--mono {
  background: var(--tgui-plain-background);
}

.chip--outline {
  border-radius: 10px;
  box-shadow: 0 0 0 1px var(--tgui-outline);
}

.text {
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 1 0;
  color: var(--tgui-plain-foreground);
}

.before {
  margin-right: 2px;
}

.after {
  display: flex;
  align-items: center;
  /* Visually centering icons, because of line-height */
  margin-top: 1.5px;
  color: var(--tgui-secondary-hint-color);
}
</style>
