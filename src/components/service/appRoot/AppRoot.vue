<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, ref, computed } from 'vue';
import { type AppRootInjection, appRootInjectionKey, getInitialPlatform } from './lib';

const appRootInjection = ref<AppRootInjection>({
  isRendered: false,
  appearance: 'light',
  platform: getInitialPlatform(),
});

provide(appRootInjectionKey, appRootInjection);

const classes = computed<string[]>(() => [
  'app-root',
  `app-root--${appRootInjection.value.platform}`,
  `app-root--${appRootInjection.value.appearance}`,
]);
</script>

<style lang="scss">
.app-root {
  --tgui-bg-color: #ffffff;
  --tgui-text-color: #000000;
  --tgui-hint-color: #707579;
  --tgui-link-color: #007aff;
  --tgui-button-color: #007aff;
  --tgui-button-text-color: #ffffff;
  --tgui-secondary-bg-color: #efeff4;
  --tgui-header-bg-color: #ffffff;
  --tgui-accent-text-color: #007aff;
  --tgui-section-bg-color: #ffffff;
  --tgui-section-header-text-color: #707579;
  --tgui-subtitle-text-color: #707579;
  --tgui-destructive-text-color: #e53935;
  --tgui-skeleton: rgba(0, 0, 0, 0.01);
  --tgui-divider: rgba(0, 0, 0, 0.08);
  --tgui-outline: rgba(0, 0, 0, 0.02);
  --tgui-surface-primary: rgba(255, 255, 255, 0.58);
  --tgui-surface-dark: rgba(56, 56, 56, 0.52);
  --tgui-quaternary-bg-color: #f6f6fa;
  --tgui-segmented-control-active-bg: #ffffff;
  --tgui-card-bg-color: #ffffff;
  --tgui-secondary-hint-color: #a2acb0;
  --tgui-secondary-fill: rgba(67, 120, 255, 0.06);
  --tgui-green: #31d158;
  --tgui-destructive-background: rgba(241, 46, 46, 0.02);
  --tgui-primary-code-highlight: #4378ff;
  --tgui-secondary-code-highlight: #b00fb4;
  --tgui-tertiary-code-highlight: #3a9f20;
  --tgui-plain-background: rgba(0, 0, 0, 0.02);
  --tgui-plain-foreground: rgba(0, 0, 0, 0.5);
  --tgui-toast-accent-color: #55a6ff;
  --tgui-tooltip-background-dark: rgba(0, 0, 0, 0.52);
  --tgui-white: #ffffff;
  --tgui-black: #000000;

  --tgui-font-weight-accent-1: 700;
  --tgui-font-weight-accent-2: 600;
  --tgui-font-weight-accent-3: 400;

  &--dark {
    --tgui-bg-color: #212121;
    --tgui-text-color: #ffffff;
    --tgui-hint-color: #aaaaaa;
    --tgui-link-color: #2990ff;
    --tgui-button-color: #2990ff;
    --tgui-button-text-color: #ffffff;
    --tgui-secondary-bg-color: #0f0f0f;
    --tgui-header-bg-color: #212121;
    --tgui-accent-text-color: #007aff;
    --tgui-section-bg-color: #212121;
    --tgui-section-header-text-color: #aaaaaa;
    --tgui-subtitle-text-color: #aaaaaa;
    --tgui-destructive-text-color: #e53935;
    --tgui-skeleton: rgba(255, 255, 255, 0.01);
    --tgui-divider: rgba(255, 255, 255, 0.02);
    --tgui-outline: rgba(255, 255, 255, 0.06);
    --tgui-surface-primary: rgba(23, 23, 23, 0.58);
    --tgui-surface-dark: rgba(56, 56, 56, 0.52);
    --tgui-quaternary-bg-color: #2f2f2f;
    --tgui-segmented-control-active-bg: #2f2f2f;
    --tgui-card-bg-color: #323232;
    --tgui-secondary-hint-color: #78797e;
    --tgui-secondary-fill: rgba(41, 144, 255, 0.08);
    --tgui-green: #32e55e;
    --tgui-destructive-background: rgba(241, 46, 46, 0.08);
    --tgui-primary-code-highlight: #2990ff;
    --tgui-secondary-code-highlight: #e937ed;
    --tgui-tertiary-code-highlight: #5ae536;
    --tgui-plain-background: rgba(255, 255, 255, 0.03);
    --tgui-plain-foreground: rgba(255, 255, 255, 0.58);
    --tgui-toast-accent-color: #55a6ff;
    --tgui-tooltip-background-dark: rgba(0, 0, 0, 0.52);
    --tgui-white: #ffffff;
    --tgui-black: #000000;
  }

  // OS-specific tokens below

  &--base {
    --tgui-font-family: 'Roboto', sans-serif;
    --tgui-font-family--mono: 'Roboto Mono', monospace;

    --tgui-font-large-title-font-size: 34px;
    --tgui-font-large-title-line-height: 42px;
    --tgui-font-large-title: 400 34px/42px var(--tgui-font-family);
    --tgui-font-large-title--semi-bold: 600 34px/42px var(--tgui-font-family);
    --tgui-font-large-title--bold: 700 34px/42px var(--tgui-font-family);

    --tgui-font-title-1: 400 28px/36px var(--tgui-font-family);
    --tgui-font-title-1--semi-bold: 600 28px/36px var(--tgui-font-family);
    --tgui-font-title-1--bold: 700 28px/36px var(--tgui-font-family);

    --tgui-font-title-2: 400 24px/32px var(--tgui-font-family);
    --tgui-font-title-2--semi-bold: 600 24px/32px var(--tgui-font-family);
    --tgui-font-title-2--bold: 700 24px/32px var(--tgui-font-family);

    --tgui-font-title-3: 400 20px/24px var(--tgui-font-family);
    --tgui-font-title-3--semi-bold: 600 20px/24px var(--tgui-font-family);
    --tgui-font-title-3--bold: 700 20px/24px var(--tgui-font-family);

    --tgui-font-headline-font-size: 19px;
    --tgui-font-headline-line-height: 28px;
    --tgui-font-headline: 400 19px/28px var(--tgui-font-family);
    --tgui-font-headline--semi-bold: 600 19px/28px var(--tgui-font-family);
    --tgui-font-headline--bold: 700 19px/28px var(--tgui-font-family);

    --tgui-font-text-font-size: 17px;
    --tgui-font-text-line-height: 26px;
    --tgui-font-text: 400 17px/26px var(--tgui-font-family);
    --tgui-font-text--medium: 500 17px/26px var(--tgui-font-family);
    --tgui-font-text--semi-bold: 600 17px/26px var(--tgui-font-family);
    --tgui-font-text--bold: 700 17px/26px var(--tgui-font-family);

    --tgui-font-subheadline-1-font-size: 16px;
    --tgui-font-subheadline-1-line-height: 24px;
    --tgui-font-subheadline-1: 400 16px/24px var(--tgui-font-family);
    --tgui-font-subheadline-1--code: 400 16px/24px var(--tgui-font-family--mono);
    --tgui-font-subheadline-1--semi-bold: 600 16px/24px var(--tgui-font-family);
    --tgui-font-subheadline-1--bold: 700 16px/24px var(--tgui-font-family);

    --tgui-font-subheadline-2-font-size: 15px;
    --tgui-font-subheadline-2-line-height: 22px;
    --tgui-font-subheadline-2: 400 15px/22px var(--tgui-font-family);
    --tgui-font-subheadline-2--code: 400 15px/22px var(--tgui-font-family--mono);
    --tgui-font-subheadline-2--semi-bold: 600 15px/22px var(--tgui-font-family);
    --tgui-font-subheadline-2--bold: 700 15px/22px var(--tgui-font-family);

    --tgui-font-caption-1-font-size: 13px;
    --tgui-font-caption-1-line-height: 20px;
    --tgui-font-caption-1: 400 13px/20px var(--tgui-font-family);
    --tgui-font-caption-1--semi-bold: 600 13px/20px var(--tgui-font-family);
    --tgui-font-caption-1--bold: 700 13px/20px var(--tgui-font-family);

    --tgui-font-caption-2-font-size: 10px;
    --tgui-font-caption-2-line-height: 16px;
    --tgui-font-caption-2: 400 10px/16px var(--tgui-font-family);
    --tgui-font-caption-2--semi-bold: 600 10px/16px var(--tgui-font-family);
    --tgui-font-caption-2--bold: 700 10px/16px var(--tgui-font-family);
    --tgui-font-caption-2-line-height: 16px;
  }

  &--ios {
    --tgui-font-family: 'SF Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Apple Color Emoji',
      sans-serif;
    --tgui-font-family--mono: 'SF Mono', 'Apple Color Emoji', monospace;

    --tgui-font-large-title-font-size: 34px;
    --tgui-font-large-title-line-height: 41px;
    --tgui-font-large-title: 400 34px/41px var(--tgui-font-family);
    --tgui-font-large-title--semi-bold: 600 34px/41px var(--tgui-font-family);
    --tgui-font-large-title--bold: 700 34px/41px var(--tgui-font-family);

    --tgui-font-title-1: 400 28px/34px var(--tgui-font-family);
    --tgui-font-title-1--semi-bold: 600 28px/34px var(--tgui-font-family);
    --tgui-font-title-1--bold: 700 28px/34px var(--tgui-font-family);

    --tgui-font-title-2: 400 24px/28px var(--tgui-font-family);
    --tgui-font-title-2--semi-bold: 600 24px/28px var(--tgui-font-family);
    --tgui-font-title-2--bold: 700 24px/28px var(--tgui-font-family);

    --tgui-font-title-3: 400 20px/25px var(--tgui-font-family);
    --tgui-font-title-3--semi-bold: 600 20px/25px var(--tgui-font-family);
    --tgui-font-title-3--bold: 700 20px/25px var(--tgui-font-family);

    --tgui-font-headline-font-size: 19px;
    --tgui-font-headline-line-height: 24px;
    --tgui-font-headline: 400 19px/24px var(--tgui-font-family);
    --tgui-font-headline--semi-bold: 600 19px/24px var(--tgui-font-family);
    --tgui-font-headline--bold: 700 19px/24px var(--tgui-font-family);

    --tgui-font-text-font-size: 17px;
    --tgui-font-text-line-height: 22px;
    --tgui-font-text: 400 17px/22px var(--tgui-font-family);
    --tgui-font-text--medium: 500 17px/22px var(--tgui-font-family);
    --tgui-font-text--semi-bold: 600 17px/22px var(--tgui-font-family);
    --tgui-font-text--bold: 700 17px/22px var(--tgui-font-family);

    --tgui-font-subheadline-1-font-size: 16px;
    --tgui-font-subheadline-1-line-height: 21px;
    --tgui-font-subheadline-1: 400 16px/21px var(--tgui-font-family);
    --tgui-font-subheadline-1--code: 400 16px/21px var(--tgui-font-family--mono);
    --tgui-font-subheadline-1--semi-bold: 600 16px/21px var(--tgui-font-family);
    --tgui-font-subheadline-1--bold: 700 16px/21px var(--tgui-font-family);

    --tgui-font-subheadline-2-font-size: 15px;
    --tgui-font-subheadline-2-line-height: 20px;
    --tgui-font-subheadline-2: 400 15px/20px var(--tgui-font-family);
    --tgui-font-subheadline-2--code: 400 15px/20px var(--tgui-font-family--mono);
    --tgui-font-subheadline-2--semi-bold: 600 15px/20px var(--tgui-font-family);
    --tgui-font-subheadline-2--bold: 700 15px/20px var(--tgui-font-family);

    --tgui-font-caption-1: 400 13px/16px var(--tgui-font-family);
    --tgui-font-caption-1--semi-bold: 600 13px/16px var(--tgui-font-family);
    --tgui-font-caption-1--bold: 700 13px/16px var(--tgui-font-family);
    --tgui-font-caption-1-line-height: 16px;

    --tgui-font-caption-2-font-size: 10px;
    --tgui-font-caption-2-line-height: 13px;
    --tgui-font-caption-2: 400 10px/13px var(--tgui-font-family);
    --tgui-font-caption-2--semi-bold: 600 10px/13px var(--tgui-font-family);
    --tgui-font-caption-2--bold: 700 10px/13px var(--tgui-font-family);
    --tgui-font-caption-2-line-height: 13px;
  }
}
</style>
