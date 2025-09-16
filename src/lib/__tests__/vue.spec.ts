import { defineComponent, h, markRaw } from 'vue';
import { hasSlotContent, isComponentPassedToSlot } from '../vue';
import { randomString } from '../tests';

describe('hasSlotContent', () => {
  test('returns true when slot has content', () => {
    const slot = () => [h('span', randomString())];

    expect(hasSlotContent(slot)).toBe(true);
  });

  test('returns false when slot is empty', () => {
    const slot = () => [];

    expect(hasSlotContent(slot)).toBe(false);
  });

  test('returns false when slot is undefined', () => {
    expect(hasSlotContent(undefined)).toBe(false);
  });
});

describe('isComponentPassedToSlot', () => {
  test('returns true when slot contains a component vnode', () => {
    const CustomComponent = markRaw(
      defineComponent({
        name: 'CustomComponent',
        render: () => h('div'),
      })
    );
    const slot = () => [h(CustomComponent)];

    expect(isComponentPassedToSlot(slot)).toBe(true);
  });

  test('returns false when slot contains plain HTML element', () => {
    const slot = () => [h('div', randomString())];

    expect(isComponentPassedToSlot(slot)).toBe(false);
  });

  test('returns false when slot is undefined or empty', () => {
    expect(isComponentPassedToSlot(undefined)).toBe(false);

    const slot = () => [];

    expect(isComponentPassedToSlot(slot)).toBe(false);
  });
});
