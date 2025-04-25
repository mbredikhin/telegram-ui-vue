<template>
  <div
    :id="accordionInjection.contentId"
    class="accordion-content"
    role="region"
    :aria-labelledby="accordionInjection.labelId"
    :aria-hidden="!accordionInjection.expanded"
  >
    <div ref="body" class="body" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref, useTemplateRef } from 'vue';
import { AccordionInjection, accordionInjectionKey } from '../lib';

/**
 * Renders the content part of an accordion, leveraging context to control visibility and animation.
 * Utilizes `calcMaxHeight` for smooth height transitions during expand/collapse actions.
 */

const accordionInjection = inject(
  accordionInjectionKey
) as Ref<AccordionInjection>;
const bodyRef = useTemplateRef('body');

const bodyStyle = computed<{ maxHeight: string }>(() => ({
  maxHeight: calcMaxHeight(
    !!accordionInjection?.value?.expanded,
    bodyRef.value
  ),
}));

function calcMaxHeight(
  expanded: boolean,
  bodyElement: HTMLElement | null
): string {
  if (!expanded) {
    return '0px';
  }
  // We don't know the height of the element in the first render
  if (bodyElement === null) {
    return 'inherit';
  }
  return `${bodyElement.scrollHeight}px`;
}
</script>

<style scoped>
.accordion-content {
  overflow: hidden;
  background: var(--tgui-bg-color);
}

.body {
  max-block-size: 0;
  transition: max-height 100ms ease-in-out;
}
</style>
