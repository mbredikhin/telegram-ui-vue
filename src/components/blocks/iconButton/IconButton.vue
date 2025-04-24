<template>
  <Tappable is="button" :class="classes">
    <slot />
  </Tappable>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { computed } from 'vue';

/**
 * Renders an icon button with customizable size and mode. It utilizes the `Tappable` component for enhanced
 * touch interaction, allowing it to serve various UI actions efficiently.
 */

export interface IconButtonProps {
  /** Specifies the button size, affecting icon scaling. Recommended icon sizes are 20px for 's', 24px for 'm', and 28px for 'l'. */
  size?: 's' | 'm' | 'l';
  /** Defines the button's visual style, affecting its color and background. */
  mode?: 'bezeled' | 'plain' | 'gray' | 'outline';
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  size: 'm',
  mode: 'bezeled',
});

const classes = computed(() => ({
  ['icon-button']: true,
  [`icon-button--${props.size}`]: true,
  [`icon-button--${props.mode}`]: true,
}));
</script>

<style lang="scss" scoped>
.icon-button {
  display: inline-flex;
  border-radius: 12px;
  border: none;
  padding: 8px;
}

.icon-button--s {
  padding: 6px;
  border-radius: 50%;
}

.icon-button--bezeled {
  color: var(--tgui-link-color);
  background: var(--tgui-secondary-fill);
}

.icon-button--plain {
  color: var(--tgui-link-color);
  background: transparent;
}

.icon-button--gray {
  color: var(--tgui-plain-foreground);
  background: var(--tgui-plain-background);
}

.icon-button--outline {
  color: var(--tgui-plain-foreground);
  background: inherit;
  box-shadow: 0 0 0 1px var(--tgui-outline);
}
</style>
