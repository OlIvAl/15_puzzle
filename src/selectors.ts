import {createSelector, Selector} from 'reselect';
import {IAppState} from './store';
import {ITilesState} from './interfaces/states';
import {ITile} from './interfaces/entities';
import {TILE_MARGIN, TILE_SIZE} from './constants/config';

export interface ITileWithCoords {
  title: number;
  top: number;
  left: number;
}

export const tilesSelector: Selector<IAppState, ITilesState> = (state: IAppState): ITilesState => state.tiles;
export const counterSelector: Selector<IAppState, number> = (state: IAppState): number => state.counter;

export const tilesWithCoordsSelector = createSelector<IAppState, ITilesState, ITileWithCoords[]>(
  tilesSelector,
  (tiles: ITilesState): ITileWithCoords[] => (
    Object.values(tiles).map(({
                                title,
                                row,
                                col
                              }: ITile): ITileWithCoords => ({
      title,
      top: row * TILE_SIZE + row * TILE_MARGIN,
      left: col * TILE_SIZE + col * TILE_MARGIN
    }))
  )
);