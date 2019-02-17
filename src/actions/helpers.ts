import {ITilesState} from '../interfaces/states';
import {ITile} from '../interfaces/entities';
import {BOARD_TILE_SIZE} from '../constants/config';

export const getActiveTileForKeypress = (code: string, tiles: ITilesState, hole: ITile): ITile | undefined => {
  if ((code === 'ArrowUp') && ((hole.row + 1) < BOARD_TILE_SIZE)) {
    return Object.values(tiles).find((tile: ITile): boolean => (
      (tile.row === (hole.row + 1)) && (tile.col === hole.col)
    ));
  }
  else if ((code === 'ArrowDown') && ((hole.row) > 0)) {
    return Object.values(tiles).find((tile: ITile): boolean => (
      (tile.row === (hole.row - 1)) && (tile.col === hole.col)
    ));
  }
  else if ((code === 'ArrowLeft') && ((hole.col + 1) < BOARD_TILE_SIZE)) {
    return Object.values(tiles).find((tile: ITile): boolean => (
      (tile.row === hole.row) && (tile.col === (hole.col + 1))
    ));
  }
  else if ((code === 'ArrowRight') && (hole.col > 0)) {
    return Object.values(tiles).find((tile: ITile): boolean => (
      (tile.row === hole.row) && (tile.col === (hole.col - 1))
    ));
  }

  return undefined;
};

export const checkMovableTile = (tile: ITile, hole: ITile): boolean => (
  (Math.abs(hole.col - tile.col) === 1) && (hole.row === tile.row)
  || (Math.abs(hole.row - tile.row) === 1) && (hole.col === tile.col)
);

export const checkWinGame = (tiles: ITilesState): boolean => (
  (tiles[0].row === (BOARD_TILE_SIZE - 1))
  && (tiles[0].col === (BOARD_TILE_SIZE - 1))
  && Object.values(tiles).every(({title, row, col}: ITile): boolean => (
    !title || (col + 1 + BOARD_TILE_SIZE * row) === title
  ))
);