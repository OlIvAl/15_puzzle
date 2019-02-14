import {combineReducers, Reducer} from 'redux';
import {IAppState} from '../store';
import timerReducer from './timerReducer';
import modalReducer from './modalReducer';
import counterReducer from './counterReducer';
import tilesReducer from './tilesReducer';
import undoable from 'redux-undo';

// ToDo: research it
export default combineReducers<IAppState>({
  tiles: undoable(tilesReducer as Reducer),
  counter: counterReducer,
  timer: timerReducer,
  modal: modalReducer,
});