type Chunk<T = any> = (arr: T[], size: number) => T[][];

export const chunkArray: Chunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...chunkArray(arr.slice(size), size)]
    : [arr];
