<template>
  <article :class="classes">
    <slot />
  </article>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue';
import { CardInjection, cardInjectionKey } from './lib';

/**
 * Serves as a container for card-styled UI elements, providing context for its child components.
 * It supports different visual styles and can encapsulate various content types.
 */

export interface CardProps {
  /** Defines the visual style of the card, influencing background, shadow, and border. */
  type?: CardInjection['type'];
}

const props = withDefaults(defineProps<CardProps>(), {
  type: 'plain',
});

const cardInjection = computed<CardInjection>(() => ({
  type: props.type,
}));

provide(cardInjectionKey, cardInjection);

const classes = computed(() => ({
  card: true,
  ['card--ambient']: props.type === 'ambient',
}));
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 20px;
  box-shadow:
    0 32px 64px 0 rgba(0, 0, 0, 0.04),
    0 0 2px 1px rgba(0, 0, 0, 0.02);
}

.card--ambient {
  background: var(--tgui-plain-foreground);
}
</style>
