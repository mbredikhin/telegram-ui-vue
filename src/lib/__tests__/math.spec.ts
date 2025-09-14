import { clamp } from '../math';

describe('clamp', () => {
  test('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test('returns min when value is less than min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test('returns max when value is greater than max', () => {
    expect(clamp(20, 0, 10)).toBe(10);
  });

  test('handles value equal to min or max', () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
