import React, {CSSProperties} from 'react';
import Portal from './Portal';
import PopUp from './PopUp';
import Backdrop from './Backdrop';

interface IProps {
  onClose: () => void;
}

const Modal: React.FC<IProps> = ({onClose, children}): JSX.Element => (
  <Portal>
    <PopUp
      onClose={onClose}
    >
      {children}
    </PopUp>
    <Backdrop
      onClick={onClose}
    />
  </Portal>
);

export default Modal;