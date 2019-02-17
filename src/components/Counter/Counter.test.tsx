import * as React from 'react';
import Counter from '.';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Timer', () => {
  const fakeCounter: number = 11;

  it('он отображается', () => {
    const wrapper = shallow(<Counter count={fakeCounter} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('отображает счетчик', () => {
    const wrapper = shallow(<Counter count={fakeCounter} />);

    expect(wrapper.contains(fakeCounter)).toEqual(true);
  });
});