import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {BOARD_TILE_SIZE} from "./constants/config";
import rootReducer from './reducers';
import {ITilesState, ITimerState} from './interfaces/states';
import {generateShuffleTiles} from './helpers';
import {StateWithHistory} from "redux-undo";

const middlewares: Middleware[] = process.env.NODE_ENV === 'development'
  ? [thunk, logger]
  : [thunk];

export interface IAppState {
  tiles: StateWithHistory<ITilesState>;
  counter: number;
  timer: ITimerState;
  modal: string;
}

export const initState: IAppState = JSON.parse(localStorage.getItem('state') || 'null') || {
  tiles: generateShuffleTiles(BOARD_TILE_SIZE),
/*
  // for tests
  tiles: {
    1: {
      title: 1,
      row: 0,
      col: 0
    },
    2: {
      title: 2,
      row: 0,
      col: 1
    },
    3: {
      title: 3,
      row: 0,
      col: 2
    },
    4: {
      title: 4,
      row: 0,
      col: 3
    },
    5: {
      title: 5,
      row: 1,
      col: 0
    },
    6: {
      title: 6,
      row: 1,
      col: 1
    },
    7: {
      title: 7,
      row: 1,
      col: 2
    },
    8: {
      title: 8,
      row: 1,
      col: 3
    },
    9: {
      title: 9,
      row: 2,
      col: 0
    },
    10: {
      title: 10,
      row: 2,
      col: 1
    },
    11: {
      title: 11,
      row: 2,
      col: 2
    },
    12: {
      title: 12,
      row: 2,
      col: 3
    },
    13: {
      title: 13,
      row: 3,
      col: 0
    },
    14: {
      title: 14,
      row: 3,
      col: 1
    },
    0: {
      title: 0,
      row: 3,
      col: 2
    },
    15: {
      title: 15,
      row: 3,
      col: 3
    },
  },*/
  counter: 0,
  timer: {
    time: 0,
    intervalID: undefined
  },
  modal: ''
};

const store: Store = createStore(
  rootReducer,
  initState,
  applyMiddleware(...middlewares)
);

export default store;