import {IMoveTileAction, IIncrementCounterAction, IWinAction, ICloseModalAction, IInitNewGameAction} from './actions';
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

export interface ICloseModalActionCreator {
  (): ICloseModalAction;
}