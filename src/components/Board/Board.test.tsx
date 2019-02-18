import * as React from 'react';
import Board from '.';
import {BORD_SIZE} from '../../constants/config';
import renderer from 'react-test-renderer';

describe('Board', () => {
  it('он отображается', () => {
    const tree = renderer.create(<Board />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('имеет заданную ширину', () => {
    const tree = renderer.create(<Board />).toJSON();

    expect(tree).toHaveStyleRule('width', `${BORD_SIZE}px`);
  });

  it('имеет заданную высоту', () => {
    const tree = renderer.create(<Board />).toJSON();

    expect(tree).toHaveStyleRule('height', `${BORD_SIZE}px`);
  });

  it('имеет заданную ширину в мобильном виде', () => {
    const tree = renderer.create(<Board />).toJSON();

    expect(tree).toHaveStyleRule(
      'width',
      `${BORD_SIZE / 1.5}px`,
      {
        media: `(max-width:${BORD_SIZE * 1.2}px)`
      }
    );
  });

  it('имеет заданную высоту в мобильном виде', () => {
    const tree = renderer.create(<Board />).toJSON();

    expect(tree).toHaveStyleRule(
      'height',
      `${BORD_SIZE / 1.5}px`,
      {
        media: `(max-width:${BORD_SIZE * 1.2}px)`
      }
    );
  });
});