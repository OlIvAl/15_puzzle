import {ICloseModalAction, IMoveTileAction, IWinAction} from '../interfaces/actions';
import {ICloseModalActionCreator, IMoveTileActionCreator, IWinActionCreator} from '../interfaces/actionCreators';
import {ITile} from '../interfaces/entities';
import {CLOSE_MODAL_ACTION, MOVE_TILE_ACTION, WIN_ACTION} from '../constants/actions';
import {IMoveTileAsyncActionCreator, IWinAsyncActionCreator} from '../interfaces/asyncActionCreators';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IAppState} from '../store';
import {Action} from 'redux';
import {ITilesState} from '../interfaces/states';
import {BOARD_TILE_SIZE} from '../constants/config';

export const closeModalActionCreator: ICloseModalActionCreator = (): ICloseModalAction => ({
  type: CLOSE_MODAL_ACTION
});

const winActionCreator: IWinActionCreator = (): IWinAction => ({
  type: WIN_ACTION
});

const moveTileActionCreator: IMoveTileActionCreator = (tile: ITile): IMoveTileAction => ({
  type: MOVE_TILE_ACTION,
  payload: tile
});

const checkWinAsyncActionCreator: IWinAsyncActionCreator = (): ThunkAction<void, IAppState, null, Action<string>> =>
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const tiles: ITilesState = state.tiles;

    if(Object.values(tiles).every((tile: ITile, index: number, arr: ITile[]): boolean => (
      !tile.title
        || !arr[index + 1]
        // проверяем, что элементы расположены по порядку
        || (((arr[index + 1].col + BOARD_TILE_SIZE * arr[index + 1].row) - (tile.col + BOARD_TILE_SIZE * tile.row)) === 1)
    ))) {
      dispatch(winActionCreator());
    }
  };

export const moveTileAsyncActionCreator: IMoveTileAsyncActionCreator = (
  tile: ITile
): ThunkAction<void, IAppState, null, Action<string>> => (
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const tiles: ITilesState = state.tiles;
    const hole: ITile = tiles[0];

    // ToDo: research
    if ((Math.abs(hole.col - tile.col) === 1) && (hole.row === tile.row)
      || (Math.abs(hole.row - tile.row) === 1) && (hole.col === tile.col)) {
      // координаты старые, меняем в редьюсере
      dispatch(moveTileActionCreator(tile));

      dispatch(checkWinAsyncActionCreator());
    }
  }
);