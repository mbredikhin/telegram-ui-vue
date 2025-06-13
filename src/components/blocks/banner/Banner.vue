<template>
  <section :class="classes">
    <div v-if="hasBackground" class="background">
      <slot name="background" />
    </div>
    <slot name="before" />

    <div class="middle">
      <Subheadline
        v-if="hasSlotContent(slots.callout)"
        class="subheader"
        level="2"
      >
        <slot name="callout" />
      </Subheadline>
      <Text v-if="hasSlotContent(slots.header)" class="title" weight="2">
        <slot name="header" />
      </Text>
      <Subheadline
        v-if="hasSlotContent(slots.subheader)"
        class="subheader"
        level="2"
      >
        <slot name="subheader" />
      </Subheadline>
      <component
        :is="platform === 'ios' ? Caption : Subheadline"
        v-if="hasSlotContent(slots.description)"
        class="description"
        :level="platform === 'ios' ? '1' : '2'"
      >
        <slot name="description" />
      </component>
      <div v-if="hasSlotContent(slots.default)" class="buttons">
        <slot />
      </div>
    </div>

    <Tappable
      is="div"
      v-if="props.showCloseIcon"
      class="close"
      @click="emit('close')"
    >
      <CloseAmbient28Icon v-if="hasBackground" />
      <Cancel24Icon v-if="platform === 'ios'" data-test-id="cancel-icon" />
      <Close28Icon v-else />
    </Tappable>
  </section>
</template>

<script setup lang="ts">
import { Tappable } from '@/components/service';
import { Caption, Subheadline, Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';
import { computed, type VNode } from 'vue';
import CloseAmbient28Icon from '@/icons/28/close-ambient.svg';
import Cancel24Icon from '@/icons/24/cancel.svg';
import Close28Icon from '@/icons/28/close.svg';
import { hasSlotContent } from '@/lib/vue';

/**
 * The `Banner` component renders a prominent graphical element, typically displayed at the top of a page or section,
 * designed to grab the user's attention and convey important information.
 * It is a versatile tool used for various purposes such as branding, promotion, announcements, or navigation.
 */

export interface BannerProps {
  /** Specifies the banner's layout style, which can affect its positioning and styling. */
  type?: 'section' | 'inline';
  /** Specifies whether to show the close icon or not. */
  showCloseIcon?: boolean;
}

const props = withDefaults(defineProps<BannerProps>(), {
  type: 'section',
  showCloseIcon: false,
});

const slots = defineSlots<{
  /** Element(s) to be placed on the left side of the banner, typically an icon or an image. */
  before?: () => VNode[];
  /** Content displayed above the main content as a subheading */
  callout?: () => VNode[];
  /** The main text or title displayed in the banner. */
  header?: () => VNode[];
  /** Additional information or subtext displayed below the header. */
  subheader?: () => VNode[];
  /** Further details or description provided under the subheader. */
  description?: () => VNode[];
  /** Custom background component or design, such as an image or gradient, that covers the banner's area. */
  background?: () => VNode[];
  /** Content or components, such as buttons, displayed within the banner. */
  default?: () => VNode[];
}>();

const emit = defineEmits<{
  /** Executed when the close icon of the banner is clicked. */
  (e: 'close'): void;
}>();

const platform = usePlatform();

const hasBackground = computed(() => hasSlotContent(slots.background));

const classes = computed(() => ({
  banner: true,
  ['banner--ios']: platform === 'ios',
  ['banner--base']: platform === 'base',
  ['banner--with-background']: hasBackground.value,
  ['banner--inline']: props.type === 'inline',
}));
</script>

<style lang="scss" scoped>
.banner {
  overflow: hidden;
  position: relative;
  display: flex;
  gap: 20px;
  padding: 16px 20px;
  background: var(--tgui-bg-color);
  &--with-background {
    padding: 20px;
    .title {
      color: var(--tgui-white);
    }
    .subheader {
      opacity: 0.8;
      color: var(--tgui-white);
    }
  }
  &--ios {
    border-radius: 16px;
  }
  &--inline {
    background: var(--tgui-bg-color);
  }
  &--base:not(.banner--with-background) {
    box-shadow: var(--tgui-base-section-box-shadow);
  }
}
.banner--base.banner--inline {
  margin: 8px 20px;
  border-radius: 16px;
  border: 1px solid var(--tgui-outline);
  box-shadow: none;
}
.banner--ios.banner--inline {
  margin: 8px 16px;
  background: var(--tgui-quartenary-bg-color);
}

.background {
  position: absolute;
  inset: 0;
}

.middle {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: var(--tgui-z-index-simple);
}

.subheader {
  color: var(--tgui-subtitle-text-color);
}

.description {
  color: var(--tgui-hint-color);
}

.buttons {
  display: flex;
  gap: 4px;
  margin-top: 10px;
}

.close {
  height: 28px;
  border-radius: 50%;
}
</style>
