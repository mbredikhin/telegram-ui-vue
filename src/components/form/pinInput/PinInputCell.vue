<template>
  <label ref="pinInputCell" data-test-id="pin-input-cell" :class="classes">
    <VisuallyHidden
      is="input"
      type="number"
      class="input"
      :maxLength="1"
      v-bind="attrs"
    />
    <div v-if="props.isTyped && platform !== 'ios'" class="dot"></div>
  </label>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { VisuallyHidden } from '@/components/service';
import { usePlatform } from '@/composables/usePlatform';
import { computed, InputHTMLAttributes, useAttrs, useTemplateRef } from 'vue';

export interface PinInputCellProps
  extends /* @vue-ignore */ InputHTMLAttributes {
  isTyped?: boolean;
}

const props = withDefaults(defineProps<PinInputCellProps>(), {
  isTyped: false,
});

const platform = usePlatform();
const attrs: InputHTMLAttributes = useAttrs();
const pinInputCellRef = useTemplateRef('pinInputCell');

const classes = computed(() => ({
  'pin-input-cell': true,
  'pin-input-cell--ios': platform === 'ios',
  'pin-input-cell--typed': props.isTyped,
  [String(attrs.class)]: !!attrs.class,
}));

defineExpose({ pinInputCellRef });
</script>

<style lang="scss" scoped>
.pin-input-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 44px;
  border-radius: 12px;
  border: 2.5px solid var(--tgui-divider);
  background: var(--tgui-bg-color);
  transition: border-color 0.15s ease-out;
  padding: 0;

  &--ios {
    width: 13px;
    height: 13px;
    opacity: 0.1;
    border: none;
    border-radius: 50%;
    background: var(--tgui-link-color);
  }
}

.pin-input-cell--ios.pin-input-cell--typed {
  opacity: 1;
}

.pin-input-cell:focus-within {
  border-color: var(--tgui-link-color);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--tgui-text-color);
}
</style>
