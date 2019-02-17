import {ITilesState, ITimerState} from '../interfaces/states';
import {StateWithHistory, ActionCreators as UndoActionCreators} from "redux-undo";
import {IAppState} from '../store';
import counterReducer from './counterReducer';
import timerReducer from './timerReducer';
import modalReducer from './modalReducer';
import {
  closeModalActionCreator,
  incrementTimerActionCreator,
  initNewGameActionCreator,
  initTimerActionCreator,
  moveTileActionCreator, winActionCreator
} from '../actions/actionCreators';
import {ITile} from '../interfaces/entities';
import {WIN_MODAL} from '../constants/modals';
import tilesReducer from './tilesReducer';

describe('reducers', () => {
  const fakeIntervalID: number = 123;
  const fakeCounter: number = 10;
  const fakeTime: number = 3666;
  const fakeModal: string = 'modal';
  const notOrderedTiles: ITilesState = {
    1: {
      title: 1,
      row: 0,
      col: 1
    },
    2: {
      title: 2,
      row: 2,
      col: 1
    },
    3: {
      title: 3,
      row: 3,
      col: 1
    },
    4: {
      title: 4,
      row: 3,
      col: 3
    },
    5: {
      title: 5,
      row: 2,
      col: 3
    },
    6: {
      title: 6,
      row: 1,
      col: 3
    },
    7: {
      title: 7,
      row: 1,
      col: 2
    },
    8: {
      title: 8,
      row: 0,
      col: 2
    },
    9: {
      title: 9,
      row: 2,
      col: 0
    },
    10: {
      title: 10,
      row: 0,
      col: 0
    },
    11: {
      title: 11,
      row: 3,
      col: 0
    },
    12: {
      title: 12,
      row: 3,
      col: 2
    },
    13: {
      title: 13,
      row: 1,
      col: 0
    },
    14: {
      title: 14,
      row: 2,
      col: 2
    },
    15: {
      title: 15,
      row: 0,
      col: 3
    },
    0: {
      title: 0,
      row: 1,
      col: 1
    },
  };
  const stateWithHistoryPartialFields: StateWithHistory<{}> = {
    present: {},
    past: [],
    group: [],
    future: [],
    limit: 4,
    _latestUnfiltered: {},
    index: 0
  };

  const currentHole: ITile = notOrderedTiles[0];

  const rightTileTop: ITile = notOrderedTiles[1];
  const rightTileBottom: ITile = notOrderedTiles[2];
  const rightTileLeft: ITile = notOrderedTiles[13];
  const rightTileRight: ITile = notOrderedTiles[7];

  const rightTiles: ITile[] = [
    rightTileTop,
    rightTileBottom,
    rightTileLeft,
    rightTileRight
  ];

  const cornerTileTopLeft: ITile = notOrderedTiles[10];
  const cornerTileTopRight: ITile = notOrderedTiles[8];
  const cornerTileBottomLeft: ITile = notOrderedTiles[9];
  const cornerTileBottomRight: ITile = notOrderedTiles[14];

  const cornerTiles: ITile[] = [
    cornerTileTopLeft,
    cornerTileTopRight,
    cornerTileBottomLeft,
    cornerTileBottomRight
  ];

  const wrongTiles: ITile[] = [
    notOrderedTiles[15],
    notOrderedTiles[6],
    notOrderedTiles[5],
    notOrderedTiles[4],
    notOrderedTiles[12],
    notOrderedTiles[3],
    notOrderedTiles[11],
  ];

  const notOrderedTilesWithStateHistory: Pick<IAppState, 'tiles'> = {
    tiles: {
      ...stateWithHistoryPartialFields,
      present: notOrderedTiles
    }
  };
  const notEmptyTimer: Pick<IAppState, 'timer'> = {
    timer: {
      time: fakeTime,
      intervalID: fakeIntervalID
    }
  };
  const notEmptyCounter: Pick<IAppState, 'counter'> = {counter: fakeCounter};
  const notEmptyModal: Pick<IAppState, 'modal'> = {modal: fakeModal};

  const state: IAppState = {
    ...notOrderedTilesWithStateHistory,
    ...notEmptyTimer,
    ...notEmptyCounter,
    ...notEmptyModal
  };

  describe('counter', () => {
    it('возвращает initial state', () => {
      // @ts-ignore
      expect(counterReducer(undefined, {})).toEqual(0);
    });
    it('обрабатывает MOVE_TILE_ACTION', () => {
      expect(counterReducer(state.counter, moveTileActionCreator(currentHole)))
        .toEqual(state.counter + 1);
    });
    it('обрабатывает INIT_NEW_GAME_ACTION', () => {
      expect(counterReducer(state.counter, initNewGameActionCreator()))
        .toEqual(0);
    });
    it('обрабатывает UndoActionTypes.UNDO', () => {
      expect(counterReducer(state.counter, UndoActionCreators.undo()))
        .toEqual(state.counter - 1);
    });
  });
  describe('timer', () => {
    const initState: ITimerState = {
      time: 0,
      intervalID: undefined
    };

    it('возвращает initial state', () => {
      // @ts-ignore
      expect(timerReducer(undefined, {})).toEqual(initState);
    });
    it('обрабатывает INIT_NEW_TIMER_ACTION', () => {
      expect(timerReducer(state.timer, initTimerActionCreator(fakeIntervalID)))
        .toEqual({
          ...notEmptyTimer.timer,
          intervalID: fakeIntervalID
        });
    });
    it('обрабатывает INCREMENT_TIMER_ACTION', () => {
      expect(timerReducer(state.timer, incrementTimerActionCreator()))
        .toEqual({
          ...notEmptyTimer.timer,
          time: notEmptyTimer.timer.time + 1
        });
    });
    it('обрабатывает INIT_NEW_GAME_ACTION', () => {
      expect(timerReducer(state.timer, initNewGameActionCreator()))
        .toEqual(initState);
    });
  });
  describe('modal', () => {
    it('возвращает initial state', () => {
      // @ts-ignore
      expect(modalReducer(undefined, {})).toEqual('');
    });
    it('обрабатывает WIN_ACTION', () => {
      expect(modalReducer(state.modal, winActionCreator())).toEqual(WIN_MODAL);
    });
    it('обрабатывает CLOSE_MODAL_ACTION', () => {
      expect(modalReducer(state.modal, closeModalActionCreator())).toEqual('');
    });
  });
  describe('tiles', () => {
    it('обрабатывает MOVE_TILE_ACTION', () => {
      const hole: ITile = state.tiles.present[0];
      const tile: ITile = moveTileActionCreator(rightTileTop).payload;

      expect(tilesReducer(state.tiles.present, moveTileActionCreator(tile)))
        .toEqual({
          ...state.tiles.present,
          ...{
            [hole.title]: {
              title: hole.title,
              row: tile.row,
              col: tile.col
            }
          },
          ...{
            [tile.title]: {
              title: tile.title,
              row: hole.row,
              col: hole.col
            }
          }
        });
    });
    it('обрабатывает INIT_NEW_GAME_ACTION', () => {
      const result: ITilesState = tilesReducer(state.tiles.present, initNewGameActionCreator())

      Object.values(result).forEach((tile: ITile): void => {
        expect(tile)
          .toEqual({
            title: expect.any(Number),
            row: expect.any(Number),
            col: expect.any(Number)
          });
      });
      Object.keys(result).forEach((title: string): void => {
        expect(title).toEqual(expect.any(String));
      });
    });
  });
});