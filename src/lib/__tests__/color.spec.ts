import { hexToRGB } from '../color';

describe('hexToRGB', () => {
  test.each([
    ['#ffffff', [255, 255, 255]],
    ['#000000', [0, 0, 0]],
    ['#ff0000', [255, 0, 0]],
    ['#00ff00', [0, 255, 0]],
    ['#0000ff', [0, 0, 255]],
    ['#123456', [18, 52, 86]],
  ])('converts full hex %s to RGB correctly', (hex, expected) => {
    expect(hexToRGB(hex)).toEqual(expected);
  });

  test.each([
    ['#fff', [255, 255, 255]],
    ['#000', [0, 0, 0]],
    ['#f00', [255, 0, 0]],
    ['#0f0', [0, 255, 0]],
    ['#00f', [0, 0, 255]],
    ['#abc', [170, 187, 204]],
  ])('converts shorthand hex %s to RGB correctly', (hex, expected) => {
    expect(hexToRGB(hex)).toEqual(expected);
  });

  test('handles mixed-case hex input', () => {
    expect(hexToRGB('#AaCcFf')).toEqual([170, 204, 255]);
  });
});
