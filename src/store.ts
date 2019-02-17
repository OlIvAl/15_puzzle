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