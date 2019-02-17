import {ITile} from '../interfaces/entities';
import {
  IContinueTimerAsyncActionCreator,
  IInitNewGameAsyncActionCreator,
  IKeypressAsyncActionCreator,
  IMoveTileAsyncActionCreator,
  IWinAsyncActionCreator
} from '../interfaces/asyncActionCreators';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IAppState} from '../store';
import {Action} from 'redux';
import {ITilesState} from '../interfaces/states';
import {
  incrementTimerActionCreator,
  initNewGameActionCreator,
  initTimerActionCreator,
  moveTileActionCreator,
  winActionCreator
} from './actionCreators';
import {checkMovableTile, checkWinGame, getActiveTileForKeypress} from './helpers';


export const initNewGameAsyncActionCreator: IInitNewGameAsyncActionCreator = (): ThunkAction<void, IAppState, null, Action<string>> =>
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const intervalID: number | undefined = getState().timer.intervalID;

    if (intervalID) {
      clearInterval(intervalID);
    }

    dispatch(initNewGameActionCreator());
    localStorage.removeItem('state');
  };

export const initTimerAsyncActionCreator = (): ThunkAction<void, IAppState, null, Action<string>> =>
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>
  ): void => {
    const intervalID: number = setInterval((): void => {
      dispatch(incrementTimerActionCreator());
    }, 1000);

    dispatch(initTimerActionCreator(intervalID));
  };

export const continueTimerAsyncActionCreator: IContinueTimerAsyncActionCreator = (): ThunkAction<void, IAppState, null, Action<string>> =>
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const {counter, timer: {time, intervalID}}: IAppState = getState();

    if (counter && intervalID && time) {
      dispatch(initTimerAsyncActionCreator());
    }
  };

export const checkWinAsyncActionCreator: IWinAsyncActionCreator = (): ThunkAction<void, IAppState, null, Action<string>> =>
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const tiles: ITilesState = state.tiles.present;
    const intervalID: number | undefined = state.timer.intervalID;

    if(checkWinGame(tiles)) {
      dispatch(winActionCreator());
      localStorage.removeItem('state');

      if (intervalID) {
        clearInterval(intervalID);
      }
    }
  };

export const moveTileAsyncActionCreator: IMoveTileAsyncActionCreator = (
  tile: ITile
): ThunkAction<void, IAppState, null, Action<string>> => (
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const counter: number = state.counter;
    const tiles: ITilesState = state.tiles.present;
    const hole: ITile = tiles[0];

    if (checkMovableTile(tile, hole)) {
      // координаты старые, меняем в редьюсере
      dispatch(moveTileActionCreator(tile));

      localStorage.setItem('state', JSON.stringify(getState()));

      if (counter === 0) {
        dispatch(initTimerAsyncActionCreator());
      }

      dispatch(checkWinAsyncActionCreator());
    }
  }
);

export const keypressAsyncActionCreator: IKeypressAsyncActionCreator = (
  code: string
): ThunkAction<void, IAppState, null, Action<string>> => (
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const tiles: ITilesState = state.tiles.present;
    const hole: ITile = tiles[0];

    const tile: ITile | undefined = getActiveTileForKeypress(code, tiles, hole);

    if (tile) {
      dispatch(moveTileAsyncActionCreator(tile));
    }
  }
);