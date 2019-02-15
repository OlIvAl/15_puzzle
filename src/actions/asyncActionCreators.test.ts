import configureStore, {MockStoreCreator, MockStoreEnhanced} from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as Redux from 'redux';
import {IAppState} from '../store';
import {initNewGameAsyncActionCreator, initTimerAsyncActionCreator} from './asyncActionCreators';
import {INCREMENT_TIMER_ACTION, INIT_NEW_GAME_ACTION, INIT_NEW_TIMER_ACTION} from '../constants/actions';
import {StateWithHistory} from "redux-undo";
import {ITilesState} from '../interfaces/states';

jest.useFakeTimers();

const middlewares: Redux.Middleware[] = [thunk];
const mockStore: MockStoreCreator<Partial<IAppState>> = configureStore<Partial<IAppState>>(middlewares);

describe('asyncActionCreators', () => {
  const fakeIntervalID: number = 123;
  let storeWithoutInterval: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithInterval: MockStoreEnhanced<Partial<IAppState>>;

  const emptyCounter: Pick<IAppState, 'counter'> = {counter: 0};
  const notEmptyCounter: Pick<IAppState, 'counter'> = {counter: 10};

  const emptyTimer: Pick<IAppState, 'timer'> = {
    timer: {
      time: 0,
      intervalID: undefined
    }
  };
  const notEmptyTimer: Pick<IAppState, 'timer'> = {
    timer: {
      time: 1000,
      intervalID: fakeIntervalID
    }
  };

  const orderedTiles: {tiles: Partial<StateWithHistory<ITilesState>>} = {
    tiles: {
      present: {
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
        15: {
          title: 15,
          row: 3,
          col: 2
        },
        0: {
          title: 0,
          row: 3,
          col: 3
        },
      }
    }
  };
  const notOrderedTiles: {tiles: Partial<StateWithHistory<ITilesState>>} = {
    tiles: {
      present: {
        1: {
          title: 1,
          row: 0,
          col: 0
        },
        2: {
          title: 2,
          row: 1,
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
          row: 0,
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
          col: 1
        },
        10: {
          title: 10,
          row: 2,
          col: 0
        },
        11: {
          title: 11,
          row: 3,
          col: 3
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
        15: {
          title: 15,
          row: 3,
          col: 2
        },
        0: {
          title: 0,
          row: 2,
          col: 2
        },
      }
    }
  };

  beforeEach(() => {
    storeWithoutInterval = mockStore({
      ...emptyCounter,
      ...emptyTimer
    });

    storeWithInterval = mockStore({
      ...notEmptyCounter,
      ...notEmptyTimer
    });

    localStorage.clear();
  });

  describe('initNewGameAsyncActionCreator', () => {
    it('запускает action, который инициирует новую игру', () => {
      const expectedActions = [
        {
          type: INIT_NEW_GAME_ACTION
        }
      ];

      // @ts-ignore
      storeWithoutInterval.dispatch(initNewGameAsyncActionCreator());

      expect(storeWithoutInterval.getActions()).toEqual(expectedActions);
    });
    it('удаляет сохраненный state игры', () => {
      localStorage.setItem('state', JSON.stringify({}));

      // @ts-ignore
      storeWithoutInterval.dispatch(initNewGameAsyncActionCreator());

      expect(localStorage.getItem('state')).toEqual(null);
    });
    it('останавливает таймер, если он был запущен', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initNewGameAsyncActionCreator());

      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledWith(fakeIntervalID);
    });
    it('не останавливает таймер, если он не был запущен', () => {
      console.log(storeWithoutInterval.getState());

      // @ts-ignore
      storeWithoutInterval.dispatch(initNewGameAsyncActionCreator());

      // ToDo: ????????
      expect(clearInterval).not.toHaveBeenCalled();
    });
  });

  describe('initTimerAsyncActionCreator', () => {
    it('инициирует новый таймер', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveReturnedWith(expect.any(Number));
    });
    it('запускает инкремент таймера через секунду', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());

      expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);

      jest.runTimersToTime(1000);

      const expectedAction = {
        type: INCREMENT_TIMER_ACTION
      };

      expect(storeWithInterval.getActions()[1]).toEqual(expectedAction);
    });
    it('запускает action, который обнуляет имеющийся таймер и записывает новый таймер в state', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());

      const expectedActions = [
        {
          type: INIT_NEW_TIMER_ACTION,
          payload: expect.any(Number)
        }
      ];

      expect(storeWithInterval.getActions()).toEqual(expectedActions);
    });
  });

  describe('continueTimerAsyncActionCreator', () => {
    it('запускает action, который инициирует новый таймер, если есть счетчик, старый таймер, время', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());

      const expectedActions = [
        {
          type: INIT_NEW_TIMER_ACTION,
          payload: expect.any(Number)
        },
        {
          type: INCREMENT_TIMER_ACTION
        }
      ];

      jest.runTimersToTime(1000);

      expect(storeWithInterval.getActions()).toEqual(expectedActions);
    });
    it('не запускает action, который инициирует новый таймер, если нет счетчика, старого таймера, времени', () => {
      // @ts-ignore
      storeWithoutInterval.dispatch(initTimerAsyncActionCreator());

      const expectedActions: any[] = [];

      jest.runTimersToTime(1000);

      expect(storeWithInterval.getActions()).toEqual(expectedActions);
    });
  });

  describe('checkWinAsyncActionCreator', () => {

  });

  describe('moveTileAsyncActionCreator', () => {

  });

  describe('keypressAsyncActionCreator', () => {

  });


  it('', () => {

  });
});