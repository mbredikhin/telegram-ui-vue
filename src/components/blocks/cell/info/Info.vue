<template>
  <div :class="classes">
    <slot
      v-if="isAvatarStack && slots['avatar-stack']?.()"
      name="avatar-stack"
    />

    <Text v-if="hasSlotContent(slots.default)">
      <slot />
    </Text>

    <Subheadline
      v-if="isText && hasSlotContent(slots.subtitle)"
      class="subtitle"
      level="2"
      :plain="false"
    >
      <slot name="subtitle" />
    </Subheadline>
  </div>
</template>

<script setup lang="ts">
import { Subheadline, Text } from '@/components/typography';
import { hasSlotContent } from '@/helpers/vue';
import { computed, VNode } from 'vue';

/**
 * A versatile component designed to display either text information with an optional subtitle or a stack of avatars.
 * It adapts its structure based on the `type` prop, allowing for a wide range of use cases within user interfaces.
 */

export interface InfoProps {
  /** Determines the type of content to display, affecting the layout and styling. */
  type: 'text' | 'avatarStack';
  /** Text content for the component, utilized when the `type` is set to 'text'. */
  subtitle?: string;
}

const props = withDefaults(defineProps<InfoProps>(), {
  type: 'text',
  subtitle: '',
});

const slots = defineSlots<{
  /** An `AvatarStack` component to display when the `type` is 'avatarStack', showcasing multiple avatars. */
  ['avatar-stack']?: () => VNode[];
  /** Main content displayed as a header */
  default?: () => VNode[];
  /** Content displayed below the header as a subtitle */
  subtitle?: () => VNode[];
}>();

const isAvatarStack = computed(() => props.type === 'avatarStack');

const isText = computed(() => props.type === 'text');

const classes = computed(() => ({
  info: true,
  [`info--${props.type}`]: true,
}));
</script>

<style lang="scss" scoped>
.info--text {
  text-align: right;
}

.info--avatarStack {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--tgui-secondary-hint-color);
}

.subtitle {
  margin: 2px 0 0;
  color: var(--tgui-hint-color);
}
</style>
