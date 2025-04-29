<template>
  <header class="modal-header">
    <div class="before">
      <slot name="before" />
    </div>

    <Text v-if="platform === 'ios'" weight="2" class="children">
      <slot />
    </Text>
    <div class="after">
      <slot name="after" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { Text } from '@/components/typography';
import { usePlatform } from '@/composables/usePlatform';

defineSlots<{
  default(props?: unknown): unknown;
  /** Inserts a component before the header text, e.g. Icon */
  before(props?: unknown): unknown;
  /** Inserts a component after the header text, e.g. Icon */
  after(props?: unknown): unknown;
}>();

const platform = usePlatform();
</script>

<style lang="scss" scoped>
.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;
  padding: 16px;
}

.modal-header::before {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  content: '';
  width: 36px;
  height: 4px;
  border-radius: 4px;
  background: var(--tgui-divider);
}

.before,
.after {
  display: flex;
  align-items: center;
  flex: 1 0 0;
}

.before {
  justify-content: flex-start;
}

.after {
  justify-content: flex-end;
}

.children {
  --tgui-text-line-height: 28px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
}
</style>
