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

export const tilesSelector: Selector<IAppState, ITilesState> = (state) => state.tiles.present;
export const timerSelector: Selector<IAppState, string> = (state: IAppState): string => {
  const time: number = state.timer.time;
  const hour: number = Math.floor(time / 3600);
  const minute: number = Math.floor((time - hour * 3600) / 60);
  const second: number = time - hour * 3600 - minute * 60;

  return `${hour.toString().length < 2 ? `0${hour}` : hour}:`
    + `${minute.toString().length < 2 ? `0${minute}` : minute}:`
    + `${second.toString().length < 2 ? `0${second}` : second}`
};
export const counterSelector: Selector<IAppState, number> = (state: IAppState): number => state.counter.present;
export const modalSelector: Selector<IAppState, string> = (state: IAppState): string => state.modal;

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