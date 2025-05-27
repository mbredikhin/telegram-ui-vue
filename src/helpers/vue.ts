import { VNode } from 'vue';

export const hasSlotContent = (slot: (() => VNode[] | undefined) | undefined) =>
  slot?.()?.length ?? 0 > 0;

export const isComponentPassedToSlot = (
  slot: (() => VNode[] | undefined) | undefined
) => {
  const vnode = slot?.()?.at(0);
  return vnode && ['object', 'function'].includes(typeof vnode.type);
};
