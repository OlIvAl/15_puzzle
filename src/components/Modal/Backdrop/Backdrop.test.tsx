import * as React from 'react';
import Backdrop from '.';
import renderer from 'react-test-renderer';

describe('Backdrop', () => {
  it('он отображается', () => {
    const tree = renderer.create(<Backdrop />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});