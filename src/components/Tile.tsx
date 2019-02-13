import React, {CSSProperties} from 'react';
import {TILE_SIZE} from '../constants/config';
import {ITileWithCoords} from '../selectors';
import {ITile} from '../interfaces/entities';
import {IMoveTileAsyncActionCreator} from '../interfaces/asyncActionCreators';

const tileSize: CSSProperties = {
  width: TILE_SIZE,
  height: TILE_SIZE
};

const tileStyle: CSSProperties = {
  backgroundColor: '#000000',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 48,
  position: 'absolute',
};

interface IProps extends ITileWithCoords {
  tile: ITile;
  move: IMoveTileAsyncActionCreator;
}

const Tile: React.FC<IProps> = ({
  title,
  top,
  left,
  tile,
  move
}): JSX.Element => (
  <div
    className='tile'
    style={{
      ...tileStyle,
      ...tileSize,
      top,
      left
    }}
    onClick={() => move(tile)}
  >
    {title}
  </div>
);

export default Tile;