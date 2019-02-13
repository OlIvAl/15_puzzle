import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {ITile} from './entities';
import {IAppState} from '../store';

export interface IMoveTileAsyncActionCreator {
  (tile: ITile): ThunkAction<void, IAppState, null, Action<string>>;
}