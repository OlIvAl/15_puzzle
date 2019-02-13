import { combineReducers } from 'redux';
import {IAppState} from '../store';
import timerReducer from './timerReducer';
import modalReducer from './modalReducer';
import counterReducer from './counterReducer';
import tilesReducer from './tilesReducer';

export default combineReducers<IAppState>({
  tiles: tilesReducer,
  counter: counterReducer,
  timer: timerReducer,
  modal: modalReducer
});