import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {ITile} from './entities';
import {IAppState} from '../store';

export interface IMoveTileAsyncActionCreator {
  (tile: ITile): ThunkAction<void, IAppState, null, Action<string>>;
}

export interface IContinueTimerAsyncActionCreator {
  (): ThunkAction<void, IAppState, null, Action<string>>;
}

export interface IInitNewGameAsyncActionCreator {
  (): ThunkAction<void, IAppState, null, Action<string>>;
}

export interface IKeypressAsyncActionCreator {
  (code: string): ThunkAction<void, IAppState, null, Action<string>>;
}

export interface IWinAsyncActionCreator {
  (): ThunkAction<void, IAppState, null, Action<string>>;
}