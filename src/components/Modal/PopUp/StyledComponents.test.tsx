import * as React from 'react';
import {
  StyledPopUpWrapper,
  StyledPopUpHeader,
  StyledPopUpContent,
  StyledPopUpCloseButton
} from './StyledComponents';
import renderer from 'react-test-renderer';

describe('PopUp StyledComponents', () => {
  it('StyledPopUpWrapper отображается', () => {
    const tree = renderer.create(<StyledPopUpWrapper />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('StyledPopUpHeader отображается', () => {
    const tree = renderer.create(<StyledPopUpHeader />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('StyledPopUpContent отображается', () => {
    const tree = renderer.create(<StyledPopUpContent />).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('StyledPopUpCloseButton отображается', () => {
    const tree = renderer.create(<StyledPopUpCloseButton />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});