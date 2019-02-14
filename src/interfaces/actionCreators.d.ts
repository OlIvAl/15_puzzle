import {
  IMoveTileAction,
  IWinAction,
  ICloseModalAction,
  IInitNewGameAction,
  IIncrementTimerAction,
  IInitTimerAction
} from './actions';
import {ITile} from './entities';

export interface IMoveTileActionCreator {
  (tile: ITile): IMoveTileAction;
}

export interface IInitNewGameActionCreator {
  (): IInitNewGameAction;
}

export interface IWinActionCreator {
  (): IWinAction;
}

export interface IInitTimerActionCreator {
  (intervalID: number): IInitTimerAction;
}
export interface IIncrementTimerActionCreator {
  (): IIncrementTimerAction;
}

export interface ICloseModalActionCreator {
  (): ICloseModalAction;
}