import React, {CSSProperties} from 'react';
import {BOARD_TILE_SIZE, BORD_BORDER, TILE_MARGIN, TILE_SIZE} from '../constants/config';

const BORD_SIZE: number = (TILE_SIZE * BOARD_TILE_SIZE) + (TILE_MARGIN * (BOARD_TILE_SIZE - 1));

const bordSize: CSSProperties = {
  width: BORD_SIZE,
  height: BORD_SIZE,
  borderWidth: BORD_BORDER,
};

const boardStyle: CSSProperties = {
  borderColor: '#aaa',
  borderStyle: 'solid',
  backgroundColor: '#e5e5e5',
  position: 'relative'
};

const Board: React.FC = ({children}): JSX.Element => (
  <div
    className='bord'
    style={{...bordSize, ...boardStyle}}
  >
    {children}
  </div>
);

export default Board;