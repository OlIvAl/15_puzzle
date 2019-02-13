import {IMoveTileAction, IIncrementCounterAction} from './actions';
import {ITile} from './entities';

export interface IMoveTileActionCreator {
  (tile: ITile): IMoveTileAction;
}
