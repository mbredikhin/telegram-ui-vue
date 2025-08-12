import { useFloatingMiddlewares } from '../useFloatingMiddlewares';
import type { Middleware } from '@floating-ui/vue';

vi.mock('@floating-ui/vue', () => ({
  offset: vi.fn((opts) => ({ name: 'offset', options: opts })),
  flip: vi.fn((opts) => ({ name: 'flip', options: opts })),
  autoPlacement: vi.fn((opts) => ({ name: 'autoPlacement', options: opts })),
  shift: vi.fn(() => ({ name: 'shift' })),
  size: vi.fn((opts) => ({ name: 'size', options: opts })),
  arrow: vi.fn((opts) => ({ name: 'arrow', options: opts })),
}));

describe('useFloatingMiddlewares', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('applies offset with default values', () => {
    const { middlewares } = useFloatingMiddlewares({});

    const offsetMiddleware = middlewares.value.find(
      (middleware) => middleware.name === 'offset'
    );

    expect(offsetMiddleware).toEqual({
      name: 'offset',
      options: { crossAxis: 0, mainAxis: 0 },
    });
  });

  test('applies offset with arrow height included', () => {
    const { middlewares } = useFloatingMiddlewares({
      withArrow: true,
      arrowHeight: 8,
      offsetByMainAxis: 4,
      offsetByCrossAxis: 2,
    });

    const offsetMiddleware = middlewares.value.find(
      (middleware) => middleware.name === 'offset'
    );

    expect(offsetMiddleware).toEqual({
      name: 'offset',
      options: { crossAxis: 2, mainAxis: 12 },
    });
  });

  test('uses flip middleware for non-auto placement', () => {
    const { middlewares, strictPlacement } = useFloatingMiddlewares({
      placement: 'bottom-start',
    });

    const hasFlipMiddleware = middlewares.value.some(
      (middleware) => middleware.name === 'flip'
    );

    expect(hasFlipMiddleware).toBe(true);
    expect(strictPlacement).toBe('bottom-start');
  });

  test('uses autoPlacement middleware for auto placement', () => {
    const { middlewares, strictPlacement } = useFloatingMiddlewares({
      placement: 'auto-start',
    });

    const hasAutoPlacementMiddleware = middlewares.value.some(
      (middleware) => middleware.name === 'autoPlacement'
    );

    expect(hasAutoPlacementMiddleware).toBe(true);
    expect(strictPlacement).toBeUndefined();
  });

  test('applies size middleware when sameWidth is true', () => {
    const { middlewares } = useFloatingMiddlewares({
      sameWidth: true,
    });

    const sizeMiddleware = middlewares.value.find(
      (middleware) => middleware.name === 'size'
    );

    expect(sizeMiddleware).toBeDefined();
  });

  test('applies custom middlewares', () => {
    const customMiddleware: Middleware = {
      name: 'customMiddleware',
    } as Middleware;

    const { middlewares } = useFloatingMiddlewares({
      customMiddlewares: [customMiddleware],
    });

    expect(middlewares.value).toContain(customMiddleware);
  });

  test('applies arrow middleware when withArrow is true', () => {
    const fakeArrow = {} as Element;
    const { middlewares } = useFloatingMiddlewares({
      withArrow: true,
      arrowRef: fakeArrow,
      arrowPadding: 5,
    });

    const arrowMiddleware = middlewares.value.find(
      (middleware) => middleware.name === 'arrow'
    );

    expect(arrowMiddleware).toEqual({
      name: 'arrow',
      options: { element: fakeArrow, padding: 5 },
    });
  });

  test('always includes shift middleware', () => {
    const { middlewares } = useFloatingMiddlewares({});

    const hasShiftMiddleware = middlewares.value.some(
      (middleware) => middleware.name === 'shift'
    );

    expect(hasShiftMiddleware).toBe(true);
  });
});
