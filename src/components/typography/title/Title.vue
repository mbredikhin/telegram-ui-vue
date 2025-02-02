<template>
  <Typography v-bind="props" :is="props.is ?? levelTags[props.level]" :class="classes">
    <slot />
  </Typography>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Typography, type TypographyProps } from '../';

/**
 * The Title component is designed to render text as a page or section heading,
 * providing clear hierarchy and structure within content. It supports three levels of emphasis,
 * allowing for flexibility in design while maintaining semantic integrity. By default, it uses `h3`
 * for its semantic HTML element but can be customized via the `level` prop or explicitly with the `Component` prop.
 */
type TitleLevel = '1' | '2' | '3';

export interface TitleProps extends /* @vue-ignore */ TypographyProps {
  /** Determines the size and semantic tag of the title, with options for `h2`, `h3`, or `h4`. */
  level?: TitleLevel;
}

const props = withDefaults(defineProps<TitleProps>(), {
  level: '2',
});

const levelTags: Record<TitleLevel, string> = {
  '1': 'h2',
  '2': 'h3',
  '3': 'h4',
};

const classes = computed(() => ({
  title: true,
  [`title--${props.level}`]: true,
}));
</script>

<style lang="scss" scoped>
.title--1 {
  font-size: var(--tgui-font-title-1-font-size);
  line-height: var(--tgui-font-title-1-line-height);
}

.title--2 {
  font-size: var(--tgui-font-title-2-font-size);
  line-height: var(--tgui-font-title-2-line-height);
}

.title--3 {
  font-size: var(--tgui-font-title-3-font-size);
  line-height: var(--tgui-font-title-3-line-height);
}
</style>
