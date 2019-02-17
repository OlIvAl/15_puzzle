import * as React from 'react';
import Wrapper from '.';
import renderer from 'react-test-renderer';

describe('Wrapper', () => {
  it('он отображается', () => {
    const tree = renderer.create(<Wrapper />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});