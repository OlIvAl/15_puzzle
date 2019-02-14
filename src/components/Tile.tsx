import React from 'react';
import styled from 'styled-components';
import {BORD_SIZE, TILE_SIZE} from '../constants/config';
import {ITileWithCoords} from '../selectors';
import {ITile} from '../interfaces/entities';
import {IMoveTileAsyncActionCreator} from '../interfaces/asyncActionCreators';

interface IStyledProps extends Pick<ITileWithCoords, 'top' | 'left'> {

}

const StyledTile = styled('div')<IStyledProps>`
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
  
  &:hover {
    background: #f5f5f5;
  }
  
  @media (max-width: ${BORD_SIZE * 1.2}px) {
    width: ${TILE_SIZE / 1.5}px;
    height: ${TILE_SIZE / 1.5}px;
  }
`;

interface IProps extends ITileWithCoords {
  tile: ITile;
  move: IMoveTileAsyncActionCreator;
}

interface IState {
  coef: number;
}

class Tile extends React.Component<IProps, IState> {
  state: IState = {
    coef: 1
  };

  mql: MediaQueryList = window.matchMedia(`(max-width: ${BORD_SIZE * 1.2}px)`);

  constructor(props: IProps) {
    super(props);

    this.mediaQueryListener = this.mediaQueryListener.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  mediaQueryListener(event: MediaQueryListEvent): void {
    if (event.matches) {
      this.setState({coef: 1.5});
    } else {
      this.setState({coef: 1});
    }
  }

  onClick(): void {
    const {
      tile,
      move
    } = this.props;

    move(tile);
  }

  componentDidMount(): void {
    this.mql.addListener(this.mediaQueryListener);
  }

  componentWillUnmount(): void {
    this.mql.removeListener(this.mediaQueryListener);
  }

  render(): React.ReactNode {
    const {
      title,
      top,
      left
    } = this.props;

    const {coef} = this.state;

    return (
      <StyledTile
        top={top / coef}
        left={left / coef}
        onClick={this.onClick}
      >
        {title}
      </StyledTile>
    );
  }
}

export default Tile;