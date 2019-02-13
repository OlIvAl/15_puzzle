import React, {CSSProperties} from 'react';
import {BORD_BORDER, TILE_MARGIN, TILE_SIZE} from '../constants/config';

const BORD_SIZE: number = TILE_SIZE * 4 + TILE_MARGIN * 3;

const bordSize: CSSProperties = {
  width: BORD_SIZE,
  height: BORD_SIZE,
  borderWidth: BORD_BORDER,
};

const bordStyle: CSSProperties = {
  borderColor: 'brown',
  borderStyle: 'solid',
  position: 'relative'
};

const Bord: React.FC = ({children}): JSX.Element => (
  <div
    className='bord'
    style={{...bordSize, ...bordStyle}}
  >
    {children}
  </div>
);

export default Bord;