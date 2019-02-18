import * as React from 'react';
import Tile from '.';
import {ITileWithCoords} from '../../selectors';
import {ITile} from '../../interfaces/entities';
import {IMoveTileAsyncActionCreator} from '../../interfaces/asyncActionCreators';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

interface IProps extends ITileWithCoords {
  tile: ITile;
  move: IMoveTileAsyncActionCreator;
}

interface IState {
  coef: number;
}

const TITLE: number = 1;
const TOP: number = 0;
const LEFT: number = 0;
const ROW: number = 0;
const COL: number = 0;

describe('Tile', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => ({
        matches: false,
        addListener: () => {},
        removeListener: () => {}
      }))
    });
  });

  const resizeWindow = (x: number, y: number) => {
    // @ts-ignore
    window.innerWidth = x;
    // @ts-ignore
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
  };

  const tile: ITile = {
    title: TITLE,
    col: COL,
    row: ROW
  };

  const tileCoord: ITileWithCoords = {
    title: TITLE,
    top: TOP,
    left: LEFT
  };

  const move = jest.fn() as IMoveTileAsyncActionCreator;

  it('он отображается', () => {

    const wrapper = shallow<IProps, IState>(
      <Tile
        title={tileCoord.title}
        left={tileCoord.left}
        top={tileCoord.top}
        move={move}
        tile={tile}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('при клике вызовится move', () => {
    const wrapper = shallow<IProps, IState>(
      <Tile
        title={tileCoord.title}
        left={tileCoord.left}
        top={tileCoord.top}
        move={move}
        tile={tile}
      />
    );

    wrapper.simulate('click');

    expect(move).toHaveBeenCalledWith(tile);
  });

  it('коэффициент на широком экране = 1', () => {
    const wrapper = shallow<IProps, IState>(
      <Tile
        title={tileCoord.title}
        left={tileCoord.left}
        top={tileCoord.top}
        move={move}
        tile={tile}
      />
    );

    resizeWindow(1000, 1000);

    expect(wrapper.state().coef).toEqual(1);
  });

  /*it('коэффициент на узком экране = 1,5', () => {
    const wrapper = shallow<IProps, IState>(
      <Tile
        title={tileCoord.title}
        left={tileCoord.left}
        top={tileCoord.top}
        move={move}
        tile={tile}
      />
    );

    resizeWindow(300, 300);

    expect(wrapper.state().coef).toEqual(1.5);
  });*/

  it('содержит title, как контент', () => {
    const wrapper = shallow<IProps, IState>(
      <Tile
        title={tileCoord.title}
        left={tileCoord.left}
        top={tileCoord.top}
        move={move}
        tile={tile}
      />
    );

    expect(wrapper.contains(TITLE)).toEqual(true);
  });
});