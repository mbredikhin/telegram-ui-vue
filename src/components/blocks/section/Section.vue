<template>
  <section :class="classes">
    <div class="body-with-header">
      <slot v-if="isComponentPassedToSlot(slots.header)" name="header" />
      <SectionHeader v-else-if="hasSlotContent(slots.header)">
        <slot name="header" />
      </SectionHeader>

      <div class="body">
        <template v-for="(vnode, index) in defaultSlotContent" :key="index">
          <component :is="vnode" />
          <Divider
            v-if="index < defaultSlotContent.length - 1"
            class="divider"
          />
        </template>
      </div>
    </div>
    <slot v-if="isComponentPassedToSlot(slots.footer)" name="footer" />
    <SectionFooter v-else-if="hasSlotContent(slots.footer)">
      <slot name="footer" />
    </SectionFooter>
  </section>
</template>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { computed, VNode } from 'vue';
import SectionHeader from './SectionHeader.vue';
import SectionFooter from './SectionFooter.vue';
import { Divider } from '@/components/misc';
import { hasSlotContent, isComponentPassedToSlot } from '@/helpers/vue';

/**
 * Organizes content into distinct sections with optional headers and footers. It automatically wraps
 * primitive header and footer content in the appropriate sub-components, and inserts dividers between
 * children when rendering multiple elements.
 */

const slots = defineSlots<{
  /** The content for the section body. */
  default?: () => VNode[];
  /**
   * The content for the section header. If a string is passed, `SectionHeader` is automatically used.
   * For more control or a large title, use `<SectionHeader large>{{ headerText }}</SectionHeader>`.
   */
  header?: () => VNode[];
  /**
   * The content for the section footer. If a string is passed, `SectionFooter` is automatically used.
   * For a centered footer, use `<SectionFooter centered>{{ footerText }}</SectionFooter>`.
   */
  footer?: () => VNode[];
}>();

const platform = usePlatform();

const classes = computed(() => ({
  section: true,
  ['section--base']: platform === 'base',
  ['section--ios']: platform === 'ios',
}));

const defaultSlotContent = computed(() => slots.default?.() ?? []);
</script>

<style lang="scss" scoped>
.section {
  &--base .body-with-header {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    background: var(--tgui-section-bg-color);
  }
  &--ios .body {
    border-radius: 12px;
    background: var(--tgui-section-bg-color);
    & > :first-child {
      border-radius: 12px 12px 0 0;
    }
    & > :last-child {
      border-radius: 0 0 12px 12px;
    }
    & > :only-child {
      border-radius: 12px;
    }
  }
}
</style>
