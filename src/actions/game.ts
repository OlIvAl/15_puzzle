import {
  ICloseModalAction,
  IIncrementTimerAction,
  IInitNewGameAction, IInitTimerAction,
  IMoveTileAction,
  IWinAction
} from '../interfaces/actions';
import {
  ICloseModalActionCreator, IIncrementTimerActionCreator,
  IInitNewGameActionCreator, IInitTimerActionCreator,
  IMoveTileActionCreator,
  IWinActionCreator
} from '../interfaces/actionCreators';
import {ITile} from '../interfaces/entities';
import {
  CLOSE_MODAL_ACTION,
  INCREMENT_TIMER_ACTION,
  INIT_NEW_GAME_ACTION, INIT_TIMER_ACTION,
  MOVE_TILE_ACTION,
  WIN_ACTION
} from '../constants/actions';
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
import {BOARD_TILE_SIZE} from '../constants/config';

export const closeModalActionCreator: ICloseModalActionCreator = (): ICloseModalAction => ({
  type: CLOSE_MODAL_ACTION
});

const winActionCreator: IWinActionCreator = (): IWinAction => ({
  type: WIN_ACTION
});

const moveTileActionCreator: IMoveTileActionCreator = (tile: ITile): IMoveTileAction => ({
  type: MOVE_TILE_ACTION,
  payload: tile
});

const initNewGameActionCreator: IInitNewGameActionCreator = (): IInitNewGameAction => ({
  type: INIT_NEW_GAME_ACTION
});

const initTimerActionCreator: IInitTimerActionCreator = (intervalID: number): IInitTimerAction => ({
  type: INIT_TIMER_ACTION,
  payload: intervalID
});

const incrementTimerActionCreator: IIncrementTimerActionCreator = (): IIncrementTimerAction => ({
  type: INCREMENT_TIMER_ACTION
});

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

const checkWinAsyncActionCreator: IWinAsyncActionCreator = (): ThunkAction<void, IAppState, null, Action<string>> =>
  (
    dispatch: ThunkDispatch<IAppState, null, Action<string>>,
    getState: () => IAppState
  ): void => {
    const state: IAppState = getState();
    const tiles: ITilesState = state.tiles.present;
    const intervalID: number | undefined = state.timer.intervalID;

    if((tiles[0].row === (BOARD_TILE_SIZE - 1))
      && (tiles[0].col === (BOARD_TILE_SIZE - 1))
      && Object.values(tiles).every(({title, row, col}: ITile): boolean => (
        !title || (col + 1 + BOARD_TILE_SIZE * row) === title
      ))) {
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

    if ((Math.abs(hole.col - tile.col) === 1) && (hole.row === tile.row)
      || (Math.abs(hole.row - tile.row) === 1) && (hole.col === tile.col)) {
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

    let tile: ITile | undefined = undefined;

    if ((code === 'ArrowUp') && ((hole.row + 1) < BOARD_TILE_SIZE)) {
      tile = Object.values(tiles).find((tile: ITile): boolean => (
        (tile.row === (hole.row + 1)) && (tile.col === hole.col)
      ));
    }
    else if ((code === 'ArrowDown') && ((hole.row) > 0)) {
      tile = Object.values(tiles).find((tile: ITile): boolean => (
        (tile.row === (hole.row - 1)) && (tile.col === hole.col)
      ));
    }
    else if ((code === 'ArrowLeft') && ((hole.col + 1) < BOARD_TILE_SIZE)) {
      tile = Object.values(tiles).find((tile: ITile): boolean => (
        (tile.row === hole.row) && (tile.col === (hole.col + 1))
      ));
    }
    else if ((code === 'ArrowRight') && (hole.col > 0)) {
      tile = Object.values(tiles).find((tile: ITile): boolean => (
        (tile.row === hole.row) && (tile.col === (hole.col - 1))
      ));
    }

    if (tile) {
      dispatch(moveTileAsyncActionCreator(tile));
    }
  }
);