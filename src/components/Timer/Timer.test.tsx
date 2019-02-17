import * as React from 'react';
import Timer from '.';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Timer', () => {
  const fakeTime: string = '11:11:11';

  it('он отображается', () => {
    const wrapper = shallow(<Timer time={fakeTime} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('отображает время', () => {
    const wrapper = shallow(<Timer time={fakeTime} />);

    expect(wrapper.contains(fakeTime)).toEqual(true);
  });
});