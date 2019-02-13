import { combineReducers } from 'redux';
import {IMoveTileAction, IWinAction} from '../interfaces/actions';
import {CLOSE_MODAL_ACTION, MOVE_TILE_ACTION, WIN_ACTION} from '../constants/actions';
import {ITilesState} from '../interfaces/states';
import {ITile} from '../interfaces/entities';
import {WIN_MODAL} from '../constants/modals';
import {IAppState} from '../store';

function tilesReducer(
  state: ITilesState = {},
  action: IMoveTileAction
): ITilesState {
  switch (action.type) {
    case MOVE_TILE_ACTION:
      const hole: ITile = state[0];
      const tile: ITile = action.payload;

      return {
        ...state,
        ...{
          0: {
            title: 0,
            row: tile.row,
            col: tile.col
          }
        },
        ...{
          [tile.title]: {
            title: tile.title,
            row: hole.row,
            col: hole.col
          }
        }
      };
    default:
      return state;
  }
}

function counterReducer(
  state: number = 0,
  action: IMoveTileAction
): number {
  switch (action.type) {
    case MOVE_TILE_ACTION:
      return state + 1;
    default:
      return state;
  }
}

function modalReducer(
  state: string = '',
  action: IWinAction
): string {
  switch (action.type) {
    case WIN_ACTION:
      return WIN_MODAL;
    case CLOSE_MODAL_ACTION:
      return '';
    default:
      return state;
  }
}

export default combineReducers<IAppState>({
  tiles: tilesReducer,
  counter: counterReducer,
  modal: modalReducer
});