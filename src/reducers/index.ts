import { combineReducers } from 'redux';
import {
  IIncrementTimerAction,
  IInitNewGameAction,
  IInitTimerAction,
  IMoveTileAction,
  IWinAction
} from '../interfaces/actions';
import {
  CLOSE_MODAL_ACTION,
  INCREMENT_TIMER_ACTION,
  INIT_NEW_GAME_ACTION, INIT_TIMER_ACTION,
  MOVE_TILE_ACTION,
  WIN_ACTION
} from '../constants/actions';
import {ITilesState, ITimerState} from '../interfaces/states';
import {ITile} from '../interfaces/entities';
import {WIN_MODAL} from '../constants/modals';
import {IAppState} from '../store';
import {generateShuffleTiles} from '../helpers';
import {BOARD_TILE_SIZE} from '../constants/config';

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

function timerReducer(
  state: ITimerState = {
    time: 0,
    intervalID: undefined
  },
  action: IIncrementTimerAction & IInitNewGameAction & IInitTimerAction
) {
  switch (action.type) {
    case INIT_TIMER_ACTION:
      return{
        ...state,
        intervalID: action.payload
      };
    case INCREMENT_TIMER_ACTION:
      return {
        ...state,
        time: state.time + 1,
      };
    case INIT_NEW_GAME_ACTION:
      return {
        time: 0,
        intervalID: undefined
      };
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
  timer: timerReducer,
  modal: modalReducer
});