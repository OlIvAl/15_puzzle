import {IInitNewGameAction, IMoveTileAction} from '../interfaces/actions';
import {INIT_NEW_GAME_ACTION, MOVE_TILE_ACTION} from '../constants/actions';
import {Reducer} from 'redux';

const counterReducer: Reducer<number, IMoveTileAction & IInitNewGameAction> = (
  state = 0,
  action
): number => {
  switch (action.type) {
    case MOVE_TILE_ACTION:
      return state + 1;
    case INIT_NEW_GAME_ACTION:
      return 0;
    default:
      return state;
  }
};

export default counterReducer;