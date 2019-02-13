import {IInitNewGameAction, IMoveTileAction} from '../interfaces/actions';
import {INIT_NEW_GAME_ACTION, MOVE_TILE_ACTION} from '../constants/actions';

export default
function counterReducer(
  state: number = 0,
  action: IMoveTileAction & IInitNewGameAction
): number {
  switch (action.type) {
    case MOVE_TILE_ACTION:
      return state + 1;
    case INIT_NEW_GAME_ACTION:
      return 0;
    default:
      return state;
  }
}