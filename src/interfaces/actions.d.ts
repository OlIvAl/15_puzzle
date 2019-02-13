import {AnyAction} from 'redux';
import {INCREMENT_COUNT_ACTION, MOVE_TILE_ACTION} from '../constants/actions';
import {ITile} from './entities';

export interface IMoveTileAction extends AnyAction{
  type: typeof MOVE_TILE_ACTION;
  payload: ITile
}
