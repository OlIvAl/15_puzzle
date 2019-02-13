import {ITimerState} from '../interfaces/states';
import {IIncrementTimerAction, IInitNewGameAction, IInitTimerAction} from '../interfaces/actions';
import {INCREMENT_TIMER_ACTION, INIT_NEW_GAME_ACTION, INIT_TIMER_ACTION} from '../constants/actions';

export default
function timerReducer(
  state: ITimerState = {
    time: 0,
    intervalID: undefined
  },
  action: IIncrementTimerAction & IInitNewGameAction & IInitTimerAction
) {
  switch (action.type) {
    case INIT_TIMER_ACTION:
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
}