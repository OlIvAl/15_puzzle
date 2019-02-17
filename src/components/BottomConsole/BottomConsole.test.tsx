import * as React from 'react';
import BottomConsole from '.';
import renderer from 'react-test-renderer';

describe('Wrapper', () => {
  it('он отображается', () => {
    const tree = renderer.create(<BottomConsole />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});