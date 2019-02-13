import {IMoveTileAction} from '../interfaces/actions';
import {IMoveTileActionCreator} from '../interfaces/actionCreators';
import {ITile} from '../interfaces/entities';
import {MOVE_TILE_ACTION} from '../constants/actions';
import {IMoveTileAsyncActionCreator} from '../interfaces/asyncActionCreators';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IAppState} from '../store';
import {Action} from 'redux';

const moveTileActionCreator: IMoveTileActionCreator = (tile: ITile): IMoveTileAction => ({
  type: MOVE_TILE_ACTION,
  payload: tile
});

export const moveTileAsyncActionCreator: IMoveTileAsyncActionCreator = (
  tile: ITile
): ThunkAction<void, IAppState, null, Action<string>> => (
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const hole: ITile = state.tiles[0];

    // ToDo: research
    if ((Math.abs(hole.col - tile.col) === 1) && (hole.row === tile.row)
      || (Math.abs(hole.row - tile.row) === 1) && (hole.col === tile.col)) {
      // координаты старые, меняем в редьюсере
      dispatch(moveTileActionCreator(tile));
    }
  }
);