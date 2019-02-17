import {IAppState} from '../store';
import {StateWithHistory} from "redux-undo";
import {ITilesState} from '../interfaces/states';
import {checkMovableTile} from '../actions/helpers';
import {
  counterSelector,
  ITileWithCoords,
  modalSelector,
  tilesSelector,
  tilesWithCoordsSelector,
  timerSelector
} from './index';
import {incrementTimerActionCreator} from '../actions/actionCreators';

describe('selectors', () => {
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

  it('tilesSelector', () => {
    expect(tilesSelector(state)).toEqual(notOrderedTiles);
  });
  it('timerSelector', () => {
    expect(timerSelector(state)).toEqual('01:01:06');
  });
  it('counterSelector', () => {
    expect(counterSelector(state)).toEqual(fakeCounter);
  });
  it('modalSelector', () => {
    expect(modalSelector(state)).toEqual(fakeModal);
  });

  it('tilesWithCoordsSelector', () => {
    const expectedResult: ITileWithCoords[] = [
      { title: 0, top: 99, left: 99 },
      { title: 1, top: 0, left: 99 },
      { title: 2, top: 198, left: 99 },
      { title: 3, top: 297, left: 99 },
      { title: 4, top: 297, left: 297 },
      { title: 5, top: 198, left: 297 },
      { title: 6, top: 99, left: 297 },
      { title: 7, top: 99, left: 198 },
      { title: 8, top: 0, left: 198 },
      { title: 9, top: 198, left: 0 },
      { title: 10, top: 0, left: 0 },
      { title: 11, top: 297, left: 0 },
      { title: 12, top: 297, left: 198 },
      { title: 13, top: 99, left: 0 },
      { title: 14, top: 198, left: 198 },
      { title: 15, top: 0, left: 297 }
    ];

    expect(tilesWithCoordsSelector(state)).toEqual(expectedResult);
  });
});