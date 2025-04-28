<template>
  <RootRenderer>
    <section ref="pinInput" :class="classes" v-bind="attrs">
      <header class="header">
        <Headline class="title" weight="2">{{ props.label }}</Headline>
        <div class="cells-wrapper">
          <PinInputCell
            v-for="(_, index) of Array.from({ length: normalizedPinCount })"
            :ref="
              (el) =>
                setInputRefs(el as InstanceType<typeof PinInputCell>, index)
            "
            :key="index"
            :isTyped="index < value.length"
            :value="value[index] || ''"
            :autofocus="index === 0"
            :tabIndex="-1"
            :readonly="true"
            @keydown="(event) => handleButton(index, event.key)"
          />
        </div>
      </header>
      <div class="button-wrapper">
        <div
          v-for="rows of createChunks(AVAILABLE_PINS, 3)"
          :key="rows.toString()"
          class="row"
        >
          <PinInputButton
            v-for="element of rows"
            :key="element"
            v-bind="{
              onClick:
                element === Keys.BACKSPACE
                  ? handleClickBackspace
                  : () => handleClickValue(Number(element)),
            }"
          >
            <Backspace36Icon
              v-if="element === Keys.BACKSPACE"
              class="backspace-icon"
            />
            <template v-else>
              {{ element }}
            </template>
          </PinInputButton>
        </div>
      </div>
    </section>
  </RootRenderer>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { usePlatform } from '@/composables/usePlatform';
import { computed, Ref, ref, useAttrs } from 'vue';
import { AVAILABLE_PINS, usePinInput } from './lib';
import { Keys } from '@/helpers/accessibility';
import { createChunks } from '@/helpers/chunk';
import Backspace36Icon from '@/icons/36/backspace.svg';
import PinInputCell from './PinInputCell.vue';
import { Headline } from '@/components/typography';
import PinInputButton from './PinInputButton.vue';
import { RootRenderer } from '@/components/service';

/**
 * Renders a set of input fields for entering pin codes with a virtual keypad for value entry and deletion.
 */

export interface PinInputProps {
  /** Text label displayed above the pin input cells. */
  label?: string;
  /** The number of pin input fields to display, with a minimum of 2. */
  pinCount?: number;
  /** The initial pin values to populate the input fields with. */
  value?: number[];
}

const props = withDefaults(defineProps<PinInputProps>(), {
  label: 'Enter your pin',
  pinCount: 4,
  value: () => [],
});

const emit = defineEmits<{
  (e: 'change', value: number[]): void;
}>();

const PIN_MIN_COUNT = 2;
const platform = usePlatform();
const attrs = useAttrs();
const inputRefs: Ref<(HTMLElement | null)[]> = ref([]);

const normalizedPinCount = computed(() =>
  Math.max(PIN_MIN_COUNT, props.pinCount)
);

const { value, handleClickValue, handleClickBackspace, handleButton } =
  usePinInput(
    ref({
      pinCount: normalizedPinCount.value,
      value: props.value,
    }),
    inputRefs,
    onChange
  );

const classes = computed(() => ({
  ['pin-input']: true,
  ['pin-input--ios']: platform === 'ios',
}));

function onChange(value: number[]) {
  emit('change', value);
}

function setInputRefs(
  el: InstanceType<typeof PinInputCell> | null,
  index: number
) {
  if (el) {
    inputRefs.value[index] = el.pinInputCellRef;
  } else {
    inputRefs.value[index] = null;
  }
}
</script>

<style lang="scss" scoped>
.pin-input {
  overflow: hidden;
  position: fixed;
  inset: 0;
  padding: 32px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  background: var(--tgui-bg-color);
}

.header {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-inline-size: 100%;
  flex: 1 1 0;
}

.pin-input--ios .header {
  flex: unset;
}

.header,
.title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.title {
  text-align: center;
  max-inline-size: 100%;
}

.cells-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.button-wrapper {
  --tgui-pin-input-buttons-gap: 12px;
  --tgui-pin-input-button-width: 33.3%;

  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: var(--tgui-pin-input-buttons-gap);
  margin-top: 52px;
}

.pin-input--ios .button-wrapper {
  --tgui-pin-input-button-width: 76px;
}

.row {
  display: flex;
  justify-content: center;
  gap: var(--tgui-pin-input-buttons-gap);
}

.row:last-child {
  margin-left: calc(var(--tgui-pin-input-buttons-gap) * 2);
  justify-content: flex-end;
}

.pin-input--ios .row:last-child {
  margin-left: calc(
    var(--tgui-pin-input-button-width) + var(--tgui-pin-input-buttons-gap)
  );
  justify-content: center;
}

.backspace-icon {
  display: block;
  margin: auto;
  color: var(--tgui-link-color);
}
</style>
