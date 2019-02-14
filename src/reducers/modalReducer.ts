import {IWinAction} from '../interfaces/actions';
import {CLOSE_MODAL_ACTION, WIN_ACTION} from '../constants/actions';
import {WIN_MODAL} from '../constants/modals';
import {Reducer} from 'redux';

const modalReducer: Reducer<string, IWinAction> = (
  state = '',
  action
): string => {
  switch (action.type) {
    case WIN_ACTION:
      return WIN_MODAL;
    case CLOSE_MODAL_ACTION:
      return '';
    default:
      return state;
  }
};

export default modalReducer;