import * as actionCreators from './actionCreators';
import * as actions from '../constants/actions';
import {
  ICloseModalAction, IIncrementTimerAction,
  IInitNewGameAction,
  IInitTimerAction,
  IMoveTileAction,
  IWinAction
} from '../interfaces/actions';
import {ITile} from '../interfaces/entities';
import {IInitNewGameActionCreator} from '../interfaces/actionCreators';

describe('actionCreators', () => {
  it('closeModalActionCreator создает action для сокрытия любого модального окна', () => {
    const expectedAction: ICloseModalAction = {
      type: actions.CLOSE_MODAL_ACTION
    };

    expect(actionCreators.closeModalActionCreator()).toEqual(expectedAction);
  });
  it('winActionCreator создает action для реакции store на успешное завершение игры', () => {
    const expectedAction: IWinAction = {
      type: actions.WIN_ACTION
    };

    expect(actionCreators.winActionCreator()).toEqual(expectedAction);
  });
  it('moveTileActionCreator создает action для перемещения черепка', () => {
    const expectedTile: ITile = {
      title: 1,
      row: 1,
      col: 2
    };

    const expectedAction: IMoveTileAction = {
      type: actions.MOVE_TILE_ACTION,
      payload: expectedTile
    };

    expect(actionCreators.moveTileActionCreator(expectedTile)).toEqual(expectedAction);
  });
  it('initNewGameActionCreator создает action для инициации новой игры', () => {
    const expectedAction: IInitNewGameAction = {
      type: actions.INIT_NEW_GAME_ACTION
    };

    expect(actionCreators.initNewGameActionCreator()).toEqual(expectedAction);
  });
  it('initTimerActionCreator создает action для инициации нового таймера', () => {
    const expectedTime: number = 10;

    const expectedAction: IInitTimerAction = {
      type: actions.INIT_NEW_TIMER_ACTION,
      payload: expectedTime
    };

    expect(actionCreators.initTimerActionCreator(expectedTime)).toEqual(expectedAction);
  });
  it('incrementTimerActionCreator создает action для увеличения значения таймера', () => {
    const expectedAction: IIncrementTimerAction = {
      type: actions.INCREMENT_TIMER_ACTION
    };

    expect(actionCreators.incrementTimerActionCreator()).toEqual(expectedAction);
  });
});