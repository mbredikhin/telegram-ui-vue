import { range, splitIntoChunks } from '../array';

describe('range', () => {
  test('creates inclusive range between start and end', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('returns single-element array if start and end are equal', () => {
    expect(range(3, 3)).toEqual([3]);
  });

  test('works with negative numbers', () => {
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2]);
  });

  test('returns empty array if start > end', () => {
    expect(range(5, 3)).toEqual([]);
  });
});

describe('splitIntoChunks', () => {
  test('splits array into equal sized chunks', () => {
    expect(splitIntoChunks([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test('last chunk can be smaller if not divisible', () => {
    expect(splitIntoChunks([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test('returns single chunk if size >= array length', () => {
    expect(splitIntoChunks([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test('returns empty array for empty input', () => {
    expect(splitIntoChunks([], 3)).toEqual([]);
  });

  test('works with chunk size 1', () => {
    expect(splitIntoChunks([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });
});
