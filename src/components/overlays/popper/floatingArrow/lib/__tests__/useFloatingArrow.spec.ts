import { useFloatingArrow } from '../useFloatingArrow';

describe('useFloatingArrow', () => {
  test('positions arrow at bottom with dynamic x offset when its top placement', () => {
    const arrow = useFloatingArrow({
      placement: 'top',
      coords: { x: 10, y: 20 },
      offset: 5,
    });

    expect(arrow.value).toEqual({
      placement: 'bottom',
      styles: {
        top: '100%',
        left: '15px', // coords.x (10) + offset (5)
      },
    });
  });

  test('positions arrow at left with dynamic y offset when its right placement', () => {
    const arrow = useFloatingArrow({
      placement: 'right',
      coords: { x: 10, y: 7 },
      offset: 3,
    });

    expect(arrow.value).toEqual({
      placement: 'left',
      styles: {
        top: '10px', // coords.y (7) + offset (3)
        left: 0,
      },
    });
  });

  test('positions arrow at bottom with dynamic x offset when its bottom placement', () => {
    const arrow = useFloatingArrow({
      placement: 'bottom-start',
      coords: { x: 4, y: 2 },
      offset: 1,
    });

    expect(arrow.value).toEqual({
      placement: undefined,
      styles: {
        bottom: '100%',
        left: '5px', // coords.x (4) + offset (1)
      },
    });
  });

  test('positions arrow at right with dynamic y offset when its left placement', () => {
    const arrow = useFloatingArrow({
      placement: 'left',
      coords: { x: 6, y: 12 },
      offset: 2,
    });

    expect(arrow.value).toEqual({
      placement: 'right',
      styles: {
        top: '14px', // coords.y (12) + offset (2)
        right: 0,
      },
    });
  });

  test('respects static offset instead of coords', () => {
    const arrow = useFloatingArrow({
      placement: 'right',
      coords: { x: 100, y: 200 },
      offset: 50,
      isStaticOffset: true,
    });

    expect(arrow.value.styles.top).toBe('50px');
  });

  test('defaults coords to 0 when not provided', () => {
    const arrow = useFloatingArrow({
      placement: 'top',
      offset: 5,
    });

    expect(arrow.value.styles.left).toBe('5px'); // x=0 + offset=5
  });

  test('defaults offset to 0 when not provided', () => {
    const arrow = useFloatingArrow({
      placement: 'bottom',
      coords: { x: 7, y: 0 },
    });

    expect(arrow.value.styles.left).toBe('7px');
  });
});
