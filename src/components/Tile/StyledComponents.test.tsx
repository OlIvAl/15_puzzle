import * as React from 'react';
import { StyledTile } from './StyledComponents';
import {BORD_SIZE, TILE_SIZE} from '../../constants/config';
import renderer from 'react-test-renderer';

describe('StyledTile', () => {
  const TOP: number = 100;
  const LEFT: number = 200;

  it('он отображается', () => {
    const tree = renderer.create(
        <StyledTile
          top={TOP}
          left={LEFT}
        />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('имеет заданную ширину', () => {
    const tree = renderer.create(<StyledTile top={TOP} left={LEFT} />).toJSON();

    expect(tree).toHaveStyleRule('width', `${TILE_SIZE}px`);
  });

  it('имеет заданную высоту', () => {
    const tree = renderer.create(<StyledTile top={TOP} left={LEFT} />).toJSON();

    expect(tree).toHaveStyleRule('height', `${TILE_SIZE}px`);
  });

  it('имеет заданную позицию top', () => {
    const tree = renderer.create(<StyledTile top={TOP} left={LEFT} />).toJSON();

    expect(tree).toHaveStyleRule('top', `${TOP}px`);
  });

  it('имеет заданную позицию left', () => {
    const tree = renderer.create(<StyledTile top={TOP} left={LEFT} />).toJSON();

    expect(tree).toHaveStyleRule('left', `${LEFT}px`);
  });

  it('имеет заданную ширину в мобильном виде', () => {
    const tree = renderer.create(<StyledTile top={TOP} left={LEFT} />).toJSON();

    expect(tree).toHaveStyleRule(
      'width',
      `${TILE_SIZE / 1.5}px`,
      {
        media: `(max-width:${BORD_SIZE * 1.2}px)`
      }
    );
  });

  it('имеет заданную высоту в мобильном виде', () => {
    const tree = renderer.create(<StyledTile top={TOP} left={LEFT} />).toJSON();

    expect(tree).toHaveStyleRule(
      'height',
      `${TILE_SIZE / 1.5}px`,
      {
        media: `(max-width:${BORD_SIZE * 1.2}px)`
      }
    );
  });
});