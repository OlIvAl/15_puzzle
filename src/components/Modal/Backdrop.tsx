import React, {CSSProperties} from 'react';

interface IProps {
  onClick: () => void;
}

const backdropStyles: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0 ,0.5)',
  zIndex: -1
};

const Backdrop: React.FC<IProps> = ({onClick}) => (
  <div
    onClick={onClick}
    style={backdropStyles}
  />
);

export default Backdrop;