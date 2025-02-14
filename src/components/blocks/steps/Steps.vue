<template>
  <div class="steps">
    <div
      v-for="(_, index) of Array.from({ length: props.count })"
      :key="index"
      :class="{
        step: true,
        ['step--active']: index < props.progress,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
/**
 * Renders a visual indicator of steps or progress in a process, such as a tutorial or a multi-step form.
 * It visually represents total steps and current progress.
 */

export interface StepsProps {
  /** Total number of steps. */
  count: number;
  /** Current progress, indicating how many steps have been completed. Progress is 0-indexed and goes up to `count`. */
  progress: number;
}

const props = defineProps<StepsProps>();
</script>

<style lang="scss" scoped>
.steps {
  display: flex;
  gap: 9px;
  padding: 12px;
}

.step {
  min-width: 3px;
  height: 3px;
  width: 100%;
  border-radius: 2px;
  background: var(--tgui-tertiary-bg-color);
}

.step--active {
  background: var(--tgui-link-color);
}
</style>
