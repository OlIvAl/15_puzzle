import {ITilesState, ITimerState} from '../interfaces/states';
import {IIncrementTimerAction, IInitNewGameAction, IInitTimerAction} from '../interfaces/actions';
import {INCREMENT_TIMER_ACTION, INIT_NEW_GAME_ACTION, INIT_NEW_TIMER_ACTION} from '../constants/actions';
import {AnyAction, Reducer} from 'redux';

const timerReducer: Reducer<ITimerState, IIncrementTimerAction | IInitNewGameAction | IInitTimerAction> = (
  state = {
    time: 0,
    intervalID: undefined
  },
  action
): ITimerState => {
  switch (action.type) {
    case INIT_NEW_TIMER_ACTION:
      return{
        ...state,
        intervalID: action.payload
      };
    case INCREMENT_TIMER_ACTION:
      return {
        ...state,
        time: state.time + 1,
      };
    case INIT_NEW_GAME_ACTION:
      return {
        time: 0,
        intervalID: undefined
      };
    default:
      return state;
  }
};

export default timerReducer;