import {ITilesState} from '../interfaces/states';
import {IInitNewGameAction, IMoveTileAction} from '../interfaces/actions';
import {INIT_NEW_GAME_ACTION, MOVE_TILE_ACTION} from '../constants/actions';
import {ITile} from '../interfaces/entities';
import {generateShuffleTiles} from '../helpers';
import {BOARD_TILE_SIZE} from '../constants/config';

export default
function tilesReducer(
  state: ITilesState = {},
  action: IMoveTileAction & IInitNewGameAction
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
    case INIT_NEW_GAME_ACTION:
      return generateShuffleTiles(BOARD_TILE_SIZE);
    default:
      return state;
  }
}
