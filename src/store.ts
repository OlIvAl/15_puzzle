import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {BORD_TILE_SIZE} from "./constants/config";
import rootReducer from './reducers';
import {ITilesState} from './interfaces/states';

const middlewares: Middleware[] = process.env.NODE_ENV === `development`
  ? [thunk, logger]
  : [thunk];

function shuffleArr<T>(a: T[]): T[] {
  for (let i: number = a.length - 1; i > 0; i--) {
    const randI: number = Math.floor(Math.random() * (i + 1));
    [a[i], a[randI]] = [a[randI], a[i]];
  }
  return a;
}

export interface IAppState {
  tiles: ITilesState;
  counter: number;
}

export const initState: IAppState = {
  tiles: shuffleArr<number>(
    Array(BORD_TILE_SIZE * BORD_TILE_SIZE).fill(undefined)
      .map((_, index: number): number => (index))
  ).reduce(
    (
      accum: ITilesState,
      currVal: number,
      index: number
    ): ITilesState => {
      accum[currVal] = {
        title: currVal,
        row: Math.floor(index / BORD_TILE_SIZE),
        col: index % BORD_TILE_SIZE
      };

      return accum;
    },
    {}
  ),
  counter: 0
};

const store: Store = createStore(
  rootReducer,
  initState,
  applyMiddleware(...middlewares)
);

export default store;