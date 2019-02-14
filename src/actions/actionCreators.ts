import {
  ICloseModalActionCreator, IIncrementTimerActionCreator,
  IInitNewGameActionCreator, IInitTimerActionCreator,
  IMoveTileActionCreator,
  IWinActionCreator
} from '../interfaces/actionCreators';
import {
  ICloseModalAction, IIncrementTimerAction,
  IInitNewGameAction,
  IInitTimerAction,
  IMoveTileAction,
  IWinAction
} from '../interfaces/actions';
import {
  CLOSE_MODAL_ACTION, INCREMENT_TIMER_ACTION,
  INIT_NEW_GAME_ACTION,
  INIT_TIMER_ACTION,
  MOVE_TILE_ACTION,
  WIN_ACTION
} from '../constants/actions';
import {ITile} from '../interfaces/entities';

export const closeModalActionCreator: ICloseModalActionCreator = (): ICloseModalAction => ({
  type: CLOSE_MODAL_ACTION
});

export const winActionCreator: IWinActionCreator = (): IWinAction => ({
  type: WIN_ACTION
});

export const moveTileActionCreator: IMoveTileActionCreator = (tile: ITile): IMoveTileAction => ({
  type: MOVE_TILE_ACTION,
  payload: tile
});

export const initNewGameActionCreator: IInitNewGameActionCreator = (): IInitNewGameAction => ({
  type: INIT_NEW_GAME_ACTION
});

export const initTimerActionCreator: IInitTimerActionCreator = (intervalID: number): IInitTimerAction => ({
  type: INIT_TIMER_ACTION,
  payload: intervalID
});

export const incrementTimerActionCreator: IIncrementTimerActionCreator = (): IIncrementTimerAction => ({
  type: INCREMENT_TIMER_ACTION
});
