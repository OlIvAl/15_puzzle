import {BOARD_TILE_SIZE} from './constants/config';
import {ITilesState} from './interfaces/states';

export function generateShuffleTiles(bordTileSize: number) {
  function shuffleArr<T>(a: T[]): T[] {
    for (let i: number = a.length - 1; i > 0; i--) {
      const randI: number = Math.floor(Math.random() * (i + 1));
      [a[i], a[randI]] = [a[randI], a[i]];
    }
    return a;
  }

  return shuffleArr<number>(
    Array(bordTileSize ** 2).fill(undefined)
      .map((_, index: number): number => (index))
  ).reduce(
    (
      accum: ITilesState,
      currVal: number,
      index: number
    ): ITilesState => {
      accum[currVal] = {
        title: currVal,
        row: Math.floor(index / BOARD_TILE_SIZE),
        col: index % BOARD_TILE_SIZE
      };

      return accum;
    },
    {}
  )
}