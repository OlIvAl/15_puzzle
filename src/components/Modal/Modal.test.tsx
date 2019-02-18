import * as React from 'react';
import Modal from '.';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

interface IProps {
  onClose: () => void;
}

describe('Modal', () => {
  const onClose = jest.fn();
  const CONTENT: string = 'test content';

  it('он отображается', () => {

    const wrapper = shallow<React.FC<IProps>>(
      <Modal
        onClose={onClose}
      >
        {CONTENT}
      </Modal>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('ссодержит, переданный в него, контент', () => {
    const wrapper = shallow<IProps>(
      <Modal
        onClose={onClose}
      >
        {CONTENT}
      </Modal>
    );

    expect(wrapper.contains(CONTENT)).toEqual(true);
  });

  it('дочерний компонент PopUp содержит onClose', () => {
    const wrapper = shallow<IProps>(
      <Modal
        onClose={onClose}
      >
        {CONTENT}
      </Modal>
    );

    expect(wrapper.find('PopUp').prop('onClose')).toEqual(onClose);
  });
});