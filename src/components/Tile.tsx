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
  backgroundColor: '#fff',
  color: '#5f5f5f',
  display: 'flex',
  border: '1px solid #aaa',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 36,
  position: 'absolute',
  boxSizing: 'border-box'
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