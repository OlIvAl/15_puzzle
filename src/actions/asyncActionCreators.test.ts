import configureStore, {MockStoreCreator, MockStoreEnhanced} from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as Redux from 'redux';
import {IAppState} from '../store';
import {
  checkWinAsyncActionCreator, continueTimerAsyncActionCreator,
  initNewGameAsyncActionCreator,
  initTimerAsyncActionCreator, keypressAsyncActionCreator, moveTileAsyncActionCreator
} from './asyncActionCreators';
import {StateWithHistory} from 'redux-undo';
import {ITile} from '../interfaces/entities';
import {AnyAction} from 'redux';
import {
  incrementTimerActionCreator,
  initNewGameActionCreator, initTimerActionCreator,
  moveTileActionCreator,
  winActionCreator
} from './actionCreators';

jest.useFakeTimers();

const middlewares: Redux.Middleware[] = [thunk];
const mockStore: MockStoreCreator<Partial<IAppState>> = configureStore<Partial<IAppState>>(middlewares);

describe('asyncActionCreators', () => {
  const fakeIntervalID: number = 123;
  let storeWithoutInterval: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithInterval: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithoutIntervalAndNotOrderedTiles: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithoutIntervalAndOrderedTiles: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithIntervalAndNotOrderedTiles: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithIntervalAndOrderedTiles: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithIntervalAndNotOrderedTilesAndLastHole: MockStoreEnhanced<Partial<IAppState>>;
  let storeWithoutIntervalAndNotOrderedTilesAndLastHole: MockStoreEnhanced<Partial<IAppState>>;

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

  const stateWithHistoryPartialFields: StateWithHistory<{}> = {
    present: {},
    past: [],
    group: [],
    future: [],
    limit: 4,
    _latestUnfiltered: {},
    index: 0
  };

  const orderedTiles: Pick<IAppState, 'tiles'> = {
    tiles: {
      ...stateWithHistoryPartialFields,
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
      },
    }
  };
  const notOrderedTilesWithLastHole: Pick<IAppState, 'tiles'> = {
    tiles: {
      ...stateWithHistoryPartialFields,
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
  const notOrderedTilesWithoutLastHole: Pick<IAppState, 'tiles'> = {
    tiles: {
      ...stateWithHistoryPartialFields,
      present: {
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
      }
    }
  };

  const almostOrderedTiles: Pick<IAppState, 'tiles'> = {
    tiles: {
      ...stateWithHistoryPartialFields,
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
      ...notEmptyTimer,
    });

    storeWithoutIntervalAndNotOrderedTiles = mockStore({
      ...emptyCounter,
      ...emptyTimer,
      ...notOrderedTilesWithoutLastHole
    });
    storeWithoutIntervalAndOrderedTiles = mockStore({
      ...emptyCounter,
      ...emptyTimer,
      ...orderedTiles
    });
    storeWithIntervalAndNotOrderedTiles = mockStore({
      ...notEmptyCounter,
      ...notEmptyTimer,
      ...notOrderedTilesWithoutLastHole
    });
    storeWithIntervalAndOrderedTiles = mockStore({
      ...notEmptyCounter,
      ...notEmptyTimer,
      ...orderedTiles
    });
    storeWithIntervalAndNotOrderedTilesAndLastHole = mockStore({
      ...notEmptyCounter,
      ...notEmptyTimer,
      ...notOrderedTilesWithLastHole
    });
    storeWithoutIntervalAndNotOrderedTilesAndLastHole = mockStore({
      ...emptyCounter,
      ...emptyTimer,
      ...notOrderedTilesWithLastHole
    });
  });

  afterEach(() => {
    jest.clearAllTimers();

    localStorage.clear();
  });

  describe('initNewGameAsyncActionCreator', () => {
    afterEach(() => {
      storeWithInterval.clearActions();
      storeWithoutInterval.clearActions();
    });

    it('запускает action, который инициирует новую игру', () => {
      const expectedActions = [
        initNewGameActionCreator()
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
    it('не останавливает таймер, если он не был запущен', () => {
      // @ts-ignore
      storeWithoutInterval.dispatch(initNewGameAsyncActionCreator());

      expect(clearInterval).not.toHaveBeenCalled();
    });
    it('останавливает таймер, если он был запущен', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initNewGameAsyncActionCreator());

      expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledWith(fakeIntervalID);
    });
  });

  describe('initTimerAsyncActionCreator', () =>  {
    afterEach(() => {
      storeWithInterval.clearActions();
      storeWithoutInterval.clearActions();
    });

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

      const expectedAction = incrementTimerActionCreator();

      expect(storeWithInterval.getActions())
        .toEqual(expect.arrayContaining([expectedAction]));

      storeWithInterval.clearActions();
    });
    it('запускает action, который обнуляет имеющийся таймер и записывает новый таймер в state', () => {
      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());

      const expectedActions = [
        initTimerActionCreator(expect.any(Number))
      ];

      expect(storeWithInterval.getActions()).toEqual(expectedActions);

      storeWithInterval.clearActions();
    });
  });

  describe('continueTimerAsyncActionCreator', () => {
    afterEach(() => {
      storeWithInterval.clearActions();
      storeWithoutInterval.clearActions();
    });

    it('запускает action, который инициирует новый таймер, если есть счетчик, старый таймер, время', () => {
      // @ts-ignore
      storeWithInterval.dispatch(continueTimerAsyncActionCreator());
      const continueTimerAsyncActionCreatorActionsTypes = storeWithInterval.getActions()
        .map(({type}: AnyAction) => type);
      storeWithInterval.clearActions();

      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());
      const initTimerAsyncActionCreatorActionsTypes = storeWithInterval.getActions()
        .map(({type}: AnyAction) => type);
      storeWithInterval.clearActions();

      expect(continueTimerAsyncActionCreatorActionsTypes)
        .toEqual(initTimerAsyncActionCreatorActionsTypes);

      jest.clearAllTimers();

      // @ts-ignore
      storeWithInterval.dispatch(continueTimerAsyncActionCreator());
      jest.runTimersToTime(1000);
      const continueTimerAsyncActionCreatorActionsWithTimerTypes = storeWithInterval.getActions()
        .map(({type}: AnyAction) => type);
      storeWithInterval.clearActions();
      jest.clearAllTimers();

      // @ts-ignore
      storeWithInterval.dispatch(initTimerAsyncActionCreator());
      jest.runTimersToTime(1000);
      const initTimerAsyncActionCreatorActionsWithTimerTypes = storeWithInterval.getActions()
        .map(({type}: AnyAction) => type);
      storeWithInterval.clearActions();
      jest.clearAllTimers();

      expect(continueTimerAsyncActionCreatorActionsWithTimerTypes)
        .toEqual(initTimerAsyncActionCreatorActionsWithTimerTypes);
    });
    // fix it
    it('не запускает action, который инициирует новый таймер, если нет счетчика, старого таймера, времени', () => {
      // @ts-ignore
      storeWithoutInterval.dispatch(continueTimerAsyncActionCreator());
      const continueTimerAsyncActionCreatorActionWithoutTimerTypes = storeWithoutInterval.getActions()
        .map(({type}) => type);
      storeWithoutInterval.clearActions();

      // @ts-ignore
      storeWithoutInterval.dispatch(initTimerAsyncActionCreator());
      const initTimerAsyncActionCreatorActionWithoutTimerTypes = storeWithoutInterval.getActions()
        .map(({type}) => type);
      storeWithoutInterval.clearActions();

      // jest.runTimersToTime(1000);

      expect(continueTimerAsyncActionCreatorActionWithoutTimerTypes)
        .not.toEqual(expect.arrayContaining(initTimerAsyncActionCreatorActionWithoutTimerTypes));

      jest.clearAllTimers();

      // @ts-ignore
      storeWithoutInterval.dispatch(continueTimerAsyncActionCreator());
      jest.runTimersToTime(1000);
      const continueTimerAsyncActionCreatorActionWithTimerTypes = storeWithoutInterval.getActions()
        .map(({type}) => type);
      storeWithoutInterval.clearActions();
      jest.clearAllTimers();

      // @ts-ignore
      storeWithoutInterval.dispatch(initTimerAsyncActionCreator());
      jest.runTimersToTime(1000);
      const initTimerAsyncActionCreatorActionWithTimerTypes = storeWithoutInterval.getActions()
        .map(({type}) => type);
      storeWithoutInterval.clearActions();
      jest.clearAllTimers();

      expect(continueTimerAsyncActionCreatorActionWithTimerTypes)
        .not.toEqual(expect.arrayContaining(initTimerAsyncActionCreatorActionWithTimerTypes));
    });
  });

  describe('checkWinAsyncActionCreator', () => {
    it('store с неверным порядком черепков не пройдет проверку', () => {
      // @ts-ignore
      storeWithoutIntervalAndNotOrderedTiles.dispatch(checkWinAsyncActionCreator());
      // @ts-ignore
      storeWithIntervalAndNotOrderedTiles.dispatch(checkWinAsyncActionCreator());
      // @ts-ignore
      storeWithIntervalAndNotOrderedTilesAndLastHole.dispatch(checkWinAsyncActionCreator());
      // @ts-ignore
      storeWithoutIntervalAndNotOrderedTilesAndLastHole.dispatch(checkWinAsyncActionCreator());

      const expectedActions: any[] = [];

      expect(storeWithoutIntervalAndNotOrderedTiles.getActions()).toEqual(expectedActions);
      expect(storeWithIntervalAndNotOrderedTiles.getActions()).toEqual(expectedActions);
      expect(storeWithIntervalAndNotOrderedTilesAndLastHole.getActions()).toEqual(expectedActions);
      expect(storeWithoutIntervalAndNotOrderedTilesAndLastHole.getActions()).toEqual(expectedActions);

      storeWithoutIntervalAndNotOrderedTiles.clearActions();
      storeWithIntervalAndNotOrderedTiles.clearActions();
      storeWithIntervalAndNotOrderedTilesAndLastHole.clearActions();
      storeWithoutIntervalAndNotOrderedTilesAndLastHole.clearActions();
    });
    it('store с верным порядком черепков пройдет проверку, вызавит action победы в игре', () => {
      // @ts-ignore
      storeWithoutIntervalAndOrderedTiles.dispatch(checkWinAsyncActionCreator());
      // @ts-ignore
      storeWithIntervalAndOrderedTiles.dispatch(checkWinAsyncActionCreator());

      const expectedActions = [
        winActionCreator()
      ];

      expect(storeWithoutIntervalAndOrderedTiles.getActions()).toEqual(expectedActions);
      expect(storeWithIntervalAndOrderedTiles.getActions()).toEqual(expectedActions);

      storeWithoutIntervalAndOrderedTiles.clearActions();
      storeWithIntervalAndOrderedTiles.clearActions();
    });
    it('store с верным порядком черепков и таймером пройдет проверку, и остановит таймер', () => {
      // @ts-ignore
      storeWithIntervalAndOrderedTiles.dispatch(checkWinAsyncActionCreator());

      //expect(clearInterval).toHaveBeenCalledTimes(1);
      expect(clearInterval).toHaveBeenCalledWith(fakeIntervalID);

      storeWithIntervalAndOrderedTiles.clearActions();
    });
    it('store с верным порядком черепков пройдет проверку, очистит сохраненную игру', () => {
      localStorage.setItem('state', JSON.stringify({}));

      // @ts-ignore
      storeWithoutIntervalAndOrderedTiles.dispatch(checkWinAsyncActionCreator());

      expect(localStorage.getItem('state')).toEqual(null);

      storeWithoutIntervalAndOrderedTiles.clearActions();

      localStorage.setItem('state', JSON.stringify({}));

      // @ts-ignore
      storeWithIntervalAndOrderedTiles.dispatch(checkWinAsyncActionCreator());

      expect(localStorage.getItem('state')).toEqual(null);

      storeWithIntervalAndOrderedTiles.clearActions();
    });
  });

  describe('moveTileAsyncActionCreator', () => {
    const storeWithNotOrderedTilesWithTimer: MockStoreEnhanced<Partial<IAppState>> = mockStore({
      ...notOrderedTilesWithoutLastHole,
      ...notEmptyTimer,
      ...notEmptyCounter
    });
    const storeWithNotOrderedTilesWithoutTimer: MockStoreEnhanced<Partial<IAppState>> = mockStore({
      ...notOrderedTilesWithoutLastHole,
      ...emptyTimer,
      ...emptyCounter
    });
    const storeWithAlmostOrderedTilesWithoutTimer: MockStoreEnhanced<Partial<IAppState>> = mockStore({
      ...almostOrderedTiles,
      ...emptyTimer,
      ...emptyCounter
    });

    const currentHole: ITile = notOrderedTilesWithoutLastHole.tiles.present[0];

    const rightTileTop: ITile = notOrderedTilesWithoutLastHole.tiles.present[1];
    const rightTileBottom: ITile = notOrderedTilesWithoutLastHole.tiles.present[2];
    const rightTileLeft: ITile = notOrderedTilesWithoutLastHole.tiles.present[13];
    const rightTileRight: ITile = notOrderedTilesWithoutLastHole.tiles.present[7];

    const rightTiles: ITile[] = [
      rightTileTop,
      rightTileBottom,
      rightTileLeft,
      rightTileRight
    ];

    const cornerTileTopLeft: ITile = notOrderedTilesWithoutLastHole.tiles.present[10];
    const cornerTileTopRight: ITile = notOrderedTilesWithoutLastHole.tiles.present[8];
    const cornerTileBottomLeft: ITile = notOrderedTilesWithoutLastHole.tiles.present[9];
    const cornerTileBottomRight: ITile = notOrderedTilesWithoutLastHole.tiles.present[14];

    const cornerTiles: ITile[] = [
      cornerTileTopLeft,
      cornerTileTopRight,
      cornerTileBottomLeft,
      cornerTileBottomRight
    ];

    const wrongTiles: ITile[] = [
      notOrderedTilesWithoutLastHole.tiles.present[15],
      notOrderedTilesWithoutLastHole.tiles.present[6],
      notOrderedTilesWithoutLastHole.tiles.present[5],
      notOrderedTilesWithoutLastHole.tiles.present[4],
      notOrderedTilesWithoutLastHole.tiles.present[12],
      notOrderedTilesWithoutLastHole.tiles.present[3],
      notOrderedTilesWithoutLastHole.tiles.present[11],
    ];

    it('черепки, расположенные не рядом с дыркой, не будут подвинуты', () => {
      const expectedActions: any[] = [];

      wrongTiles.forEach((tile: ITile): void => {
        // @ts-ignore
        storeWithNotOrderedTilesWithTimer.dispatch(moveTileAsyncActionCreator(tile));

        expect(storeWithNotOrderedTilesWithTimer.getActions()).toEqual(expectedActions);

        storeWithNotOrderedTilesWithTimer.clearActions();
      });
    });
    it('черепки, расположенные по углам от дырки, не будут подвинуты', () => {
      const expectedActions: any[] = [];

      cornerTiles.forEach((tile: ITile): void => {
        // @ts-ignore
        storeWithNotOrderedTilesWithTimer.dispatch(moveTileAsyncActionCreator(tile));

        expect(storeWithNotOrderedTilesWithTimer.getActions()).toEqual(expectedActions);
      });
    });
    it('черепки, расположенные по сторонам от дырки, будут подвинуты', () => {
      rightTiles.forEach((tile: ITile): void => {
        // @ts-ignore
        storeWithNotOrderedTilesWithTimer.dispatch(moveTileAsyncActionCreator(tile));

        const expectedAction = moveTileActionCreator(tile);

        expect(storeWithNotOrderedTilesWithTimer.getActions()[0]).toEqual(expectedAction);

        storeWithNotOrderedTilesWithTimer.clearActions();
      })
    });
    it('после перемещения черепка текущее состояние игры будет сохранено', () => {
      // @ts-ignore
      storeWithNotOrderedTilesWithTimer.dispatch(moveTileAsyncActionCreator(rightTileRight));

      expect(JSON.stringify(storeWithNotOrderedTilesWithTimer.getState()))
        .toEqual(localStorage.getItem('state'));

      storeWithNotOrderedTilesWithTimer.clearActions();
    });
    it('после перемещения черепка, если таймер не был запущен, таймер запустится', () => {
      // @ts-ignore
      storeWithNotOrderedTilesWithoutTimer.dispatch(moveTileAsyncActionCreator(rightTileRight));
      const moveTileAsyncActionCreatorActionsWithoutTimerTypes = storeWithNotOrderedTilesWithoutTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithNotOrderedTilesWithoutTimer.clearActions();

      // @ts-ignore
      storeWithNotOrderedTilesWithoutTimer.dispatch(initTimerAsyncActionCreator());
      const initTimerAsyncActionCreatorActionsWithoutTimerTypes = storeWithNotOrderedTilesWithoutTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithNotOrderedTilesWithoutTimer.clearActions();

      expect(moveTileAsyncActionCreatorActionsWithoutTimerTypes)
        .toEqual(expect.arrayContaining(initTimerAsyncActionCreatorActionsWithoutTimerTypes));
      expect(moveTileAsyncActionCreatorActionsWithoutTimerTypes)
        .toEqual(expect.arrayContaining([moveTileActionCreator(rightTileRight).type]));

      jest.clearAllTimers();

      // @ts-ignore
      storeWithNotOrderedTilesWithoutTimer.dispatch(moveTileAsyncActionCreator(rightTileRight));
      jest.runTimersToTime(1000);
      const moveTileAsyncActionCreatorActionsWithTimerTypes = storeWithNotOrderedTilesWithoutTimer.getActions()
        .map(({type}: AnyAction) => type);

      jest.clearAllTimers();
      storeWithNotOrderedTilesWithoutTimer.clearActions();

      // @ts-ignore
      storeWithNotOrderedTilesWithoutTimer.dispatch(initTimerAsyncActionCreator());
      jest.runTimersToTime(1000);
      const initTimerAsyncActionCreatorActionsWithTimerTypes = storeWithNotOrderedTilesWithoutTimer.getActions()
        .map(({type}: AnyAction) => type);

      jest.clearAllTimers();
      storeWithNotOrderedTilesWithoutTimer.clearActions();

      expect(moveTileAsyncActionCreatorActionsWithTimerTypes)
        .toEqual(expect.arrayContaining(initTimerAsyncActionCreatorActionsWithTimerTypes));
      expect(moveTileAsyncActionCreatorActionsWithTimerTypes)
        .toEqual(expect.arrayContaining([moveTileActionCreator(rightTileRight).type]));
    });
    it('после перемещения черепка, если таймер был запущен, таймер не запустится', () => {
      // @ts-ignore
      storeWithNotOrderedTilesWithTimer.dispatch(moveTileAsyncActionCreator(rightTileRight));

      const moveTileAsyncActionCreatorActionsTypes = storeWithNotOrderedTilesWithTimer.getActions()
        .map(({type}: AnyAction) => type);

      storeWithNotOrderedTilesWithTimer.clearActions();

      // @ts-ignore
      storeWithNotOrderedTilesWithTimer.dispatch(initTimerAsyncActionCreator());
      const initTimerAsyncActionCreatorActionsTypes = storeWithNotOrderedTilesWithTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithNotOrderedTilesWithTimer.clearActions();

      expect(moveTileAsyncActionCreatorActionsTypes )
        .not.toEqual(expect.arrayContaining(initTimerAsyncActionCreatorActionsTypes));
    });
    it('после перемещения черепка произойдет проверка на победу в игре', () => {
      // @ts-ignore
      storeWithAlmostOrderedTilesWithoutTimer.dispatch(moveTileAsyncActionCreator(almostOrderedTiles.tiles.present[15]));
      const moveTileAsyncActionCreatorActionsTypes = storeWithAlmostOrderedTilesWithoutTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithAlmostOrderedTilesWithoutTimer.clearActions();

      // @ts-ignore
      storeWithAlmostOrderedTilesWithoutTimer.dispatch(checkWinAsyncActionCreator());
      const checkWinAsyncActionCreatorTypes = storeWithAlmostOrderedTilesWithoutTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithAlmostOrderedTilesWithoutTimer.clearActions();

      expect(moveTileAsyncActionCreatorActionsTypes)
        .toEqual(expect.arrayContaining(checkWinAsyncActionCreatorTypes));
    });
  });

  describe('keypressAsyncActionCreator', () => {
    const rightCodes: string[] = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
    ];

    const storeWithNotOrderedTilesWithTimer: MockStoreEnhanced<Partial<IAppState>> = mockStore({
      ...notOrderedTilesWithoutLastHole,
      ...notEmptyTimer,
      ...notEmptyCounter
    });

    afterEach(() => {
      storeWithNotOrderedTilesWithTimer.clearActions();
    });

    it('при нажатии любой клавиши, кроме стрелочки, перемещения черепка не произойдет', () => {
      // @ts-ignore
      storeWithNotOrderedTilesWithTimer.dispatch(keypressAsyncActionCreator('Delete'));

      const expectedActions: any[] = [];

      expect(storeWithNotOrderedTilesWithTimer.getActions()).toEqual(expectedActions);
    });
    it('при нажатии клавиши стрелки, произойдет  перемещение черепка', () => {
      // @ts-ignore
      storeWithNotOrderedTilesWithTimer.dispatch(keypressAsyncActionCreator('ArrowDown'));
      const keypressAsyncActionCreatorActionsTypes: string[] = storeWithNotOrderedTilesWithTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithNotOrderedTilesWithTimer.clearActions();

      // @ts-ignore
      storeWithNotOrderedTilesWithTimer.dispatch(moveTileAsyncActionCreator(1));
      const moveTileAsyncActionCreatorActionsTypes: string[] = storeWithNotOrderedTilesWithTimer.getActions()
        .map(({type}: AnyAction) => type);
      storeWithNotOrderedTilesWithTimer.clearActions();

      expect(keypressAsyncActionCreatorActionsTypes)
        .toEqual(expect.arrayContaining(moveTileAsyncActionCreatorActionsTypes));
    });
  });
});