<template>
  <Tappable v-bind="attrs" is="button" :class="classes">
    <slot />
    <Caption v-if="props.text" class="text" level="1" weight="2">
      {{ props.text }}
    </Caption>
  </Tappable>
</template>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { InlineButtonsInjection, inlineButtonsInjectionKey } from './lib';
import {
  ButtonHTMLAttributes,
  computed,
  inject,
  ref,
  Ref,
  useAttrs,
  VNode,
} from 'vue';
import { Tappable } from '@/components/service';
import { Caption } from '@/components/typography';

/**
 * `InlineButtonsItem` is designed for use within an InlineButtons container but can also serve as a standalone button
 * if used by itself. It supports displaying optional text and can inherit a styling mode from its parent InlineButtons
 * context or utilize a locally defined mode. This flexibility allows it to seamlessly integrate within various layouts
 * and designs, providing a consistent and adaptable interface element.
 */

export interface InlineButtonsItemProps
  extends /* @vue-ignore */ ButtonHTMLAttributes {
  /** Optional mode for styling the button, with 'plain' as the default. */
  mode?: InlineButtonsInjection['mode'];
  /** Text displayed inside the button. */
  text?: string;
}

const props = withDefaults(defineProps<InlineButtonsItemProps>(), {
  mode: 'plain',
  text: '',
});

defineSlots<{
  /** Typically an Icon, to be rendered inside the button. */
  default?: () => VNode[];
}>();

const attrs: ButtonHTMLAttributes = useAttrs();
const platform = usePlatform();
const inlineButtonsInjection = inject(
  inlineButtonsInjectionKey,
  ref({ mode: props.mode })
) as Ref<InlineButtonsInjection>;

const classes = computed(() => {
  const mode = inlineButtonsInjection.value.mode;
  return {
    ['inline-buttons-item']: true,
    ['inline-buttons-item--ios']: platform === 'ios',
    [`inline-buttons-item--${mode}`]: mode !== 'plain',
  };
});
</script>

<style lang="scss" scoped>
.inline-buttons-item {
  flex: 1 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
  min-height: 60px;
  min-width: 64px;
  padding: 0 12px;
  max-inline-size: 100%;
  border: none;
  border-radius: 12px;
  color: var(--tgui-link-color);
  background: transparent;
  box-sizing: border-box;
}

.inline-buttons-item--ios {
  min-height: 64px;
  min-width: 72px;
  gap: 4px;
}

.inline-buttons-item--bezeled {
  background: var(--tgui-secondary-fill);
}

.inline-buttons-item--gray {
  color: var(--tgui-plain-foreground);
  background: var(--tgui-plain-background);
}

.text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-inline-size: inherit;
}
</style>
