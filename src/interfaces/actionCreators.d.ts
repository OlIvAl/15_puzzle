import {IMoveTileAction, IIncrementCounterAction, IWinAction, ICloseModalAction} from './actions';
import {ITile} from './entities';

export interface IMoveTileActionCreator {
  (tile: ITile): IMoveTileAction;
}

export interface IWinActionCreator {
  (): IWinAction;
}

export interface ICloseModalActionCreator {
  (): ICloseModalAction;
}