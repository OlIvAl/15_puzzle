import {ITileWithCoords} from '../../selectors';
import styled from 'styled-components';
import {BORD_SIZE, TILE_SIZE} from '../../constants/config';

interface IStyledProps extends Pick<ITileWithCoords, 'top' | 'left'> {

}

export const StyledTile = styled('div')<IStyledProps>`
  cursor: pointer;
  background-color: #fff;
  color: #5f5f5f;
  border: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  box-sizing: border-box;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  position: absolute;
  top: ${({top}: IStyledProps): number => top}px;
  left: ${({left}: IStyledProps): number => left}px;
  
  @media (hover: hover) {
    &:hover {
      background: #f5f5f5;
    }
  }
  
  @media (max-width: ${BORD_SIZE * 1.2}px) {
    width: ${TILE_SIZE / 1.5}px;
    height: ${TILE_SIZE / 1.5}px;
  }
`;