<template>
  <span :class="classes">
    <template v-if="$slots.default?.() && isNumber">
      <Subheadline is="span" v-if="props.large" level="2" weight="2">
        <slot />
      </Subheadline>
      <Caption v-if="!props.large" weight="2">
        <slot />
      </Caption>
    </template>
  </span>
</template>

<script setup lang="ts">
import { Caption, Subheadline } from '@/components/typography';
import { computed } from 'vue';
/**
 * The `Badge` component renders a small numeric or dot indicator, typically used for notifications, statuses, or counts.
 * It supports several visual modes for different contexts (e.g., critical, primary) and can be sized normally or enlarged.
 */

export interface BadgeProps {
  /** The visual style of the badge: 'number' displays the content, 'dot' shows a simple dot. */
  type: 'number' | 'dot';
  /** The color scheme of the badge, affecting its background and text color. */
  mode?: 'primary' | 'critical' | 'secondary' | 'gray' | 'white';
  /** Increases the size of the badge. Applicable only when `type` is 'number'. */
  large?: boolean;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  mode: 'primary',
  large: false,
});

const isNumber = computed(() => props.type === 'number');

const classes = computed(() => ({
  badge: true,
  [`badge--${props.type}`]: true,
  [`badge--${props.mode}`]: true,
  ['badge--large']: isNumber.value && props.large,
}));
</script>

<style lang="scss" scoped>
.badge--number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  min-width: 20px;
  margin: 0 6px;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 20px;
}

.badge--large {
  height: 24px;
  padding: 0 6px;
}

.badge--dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin: 7px;
  border-radius: 50%;
}

.badge--primary {
  color: var(--tgui-button-text-color);
  background: var(--tgui-button-color);
}

.badge--critical {
  color: var(--tgui-button-text-color);
  background: var(--tgui-destructive-text-color);
}

.badge--secondary {
  color: var(--tgui-link-color);
  background: var(--tgui-secondary-fill);
}

.badge--gray {
  color: var(--tgui-plain-foreground);
  background: var(--tgui-plain-background);
}

.badge--white {
  color: var(--tgui-link-color);
  background: var(--tgui-white);
}
</style>
