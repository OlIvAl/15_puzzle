import { combineReducers } from 'redux';
import {IMoveTileAction} from '../interfaces/actions';
import {MOVE_TILE_ACTION} from '../constants/actions';
import {ITilesState} from '../interfaces/states';
import {ITile} from '../interfaces/entities';

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

export default combineReducers({
  tiles: tilesReducer,
  counter: counterReducer
});