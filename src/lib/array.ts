export const range = (startPosition: number, endPosition: number) => {
  const length = endPosition - startPosition + 1;
  return Array.from({ length }, (_, i) => startPosition + i);
};

export const splitIntoChunks = <T>(array: T[], chunkSize: number): T[][] =>
  Array.from({ length: Math.ceil(array.length / chunkSize) }).map((_, index) =>
    array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
