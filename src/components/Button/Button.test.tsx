import * as React from 'react';
import Button from '.';
import renderer from 'react-test-renderer';

describe('Button', () => {
  it('он отображается', () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});