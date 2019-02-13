import {IWinAction} from '../interfaces/actions';
import {CLOSE_MODAL_ACTION, WIN_ACTION} from '../constants/actions';
import {WIN_MODAL} from '../constants/modals';

export default
function modalReducer(
  state: string = '',
  action: IWinAction
): string {
  switch (action.type) {
    case WIN_ACTION:
      return WIN_MODAL;
    case CLOSE_MODAL_ACTION:
      return '';
    default:
      return state;
  }
}