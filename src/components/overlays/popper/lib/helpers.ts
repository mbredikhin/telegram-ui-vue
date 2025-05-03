import { Placement } from '@floating-ui/vue';
import { PlacementWithAuto } from './types';

export const isNotAutoPlacement = (
  placement: PlacementWithAuto
): placement is Placement => !placement.startsWith('auto');

export const getAutoPlacementAlignment = (
  placement: PlacementWithAuto
): 'start' | 'end' | null => {
  const align = placement.replace(/auto-|auto/, '');
  return align === 'start' || align === 'end' ? align : null;
};
