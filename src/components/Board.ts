import styled from 'styled-components';
import {BORD_BORDER, BORD_SIZE} from '../constants/config';

const StyledBoard = styled.div`
  width: ${BORD_SIZE}px;
  height: ${BORD_SIZE}px;
  border: ${BORD_BORDER}px solid #aaa;
  background-color: #e5e5e5;
  position: relative;
  
  @media (max-width: ${BORD_SIZE * 1.2}px) {
    width: ${BORD_SIZE / 1.5}px;
    height: ${BORD_SIZE / 1.5}px;
  }
`;

export default StyledBoard;