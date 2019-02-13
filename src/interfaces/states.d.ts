import {ITile} from './entities';

export interface ITilesState {
  [key: number]: ITile
}

export interface ITimerState {
  time: number;
  intervalID: NodeJS.Timeout | undefined;
}