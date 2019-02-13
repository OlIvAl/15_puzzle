import React, {CSSProperties} from 'react';

const popUpStyles: CSSProperties = {
  border: '3px solid #red',
  backgroundColor: '#fff'
};

interface IProps {
  onClose: () => void;
}

const PopUp: React.FC<IProps> = ({onClose, children}): JSX.Element => (
  <div style={popUpStyles}>
    <div>{children}</div>
    <button onClick={onClose}>Close</button>
  </div>
);

export default PopUp;