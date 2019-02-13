import {AnyAction} from 'redux';
import {
  CLOSE_MODAL_ACTION,
  INCREMENT_COUNT_ACTION,
  INIT_NEW_GAME_ACTION,
  MOVE_TILE_ACTION,
  WIN_ACTION
} from '../constants/actions';
import {ITile} from './entities';

export interface IMoveTileAction extends AnyAction{
  type: typeof MOVE_TILE_ACTION;
  payload: ITile
}

export interface IInitNewGameAction {
  type: typeof INIT_NEW_GAME_ACTION;
}

export interface IWinAction extends AnyAction{
  type: typeof WIN_ACTION;
}

export interface ICloseModalAction extends AnyAction{
  type: typeof CLOSE_MODAL_ACTION;
}