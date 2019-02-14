import React, {CSSProperties} from 'react';

const buttonStyle: CSSProperties = {
  padding: '6px 10px',
  borderRadius: 4,
  background: '#0d9095',
  color: '#fff',
  textDecoration: 'none',
  border: 'none',
};

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  background: string;
}

const Button: React.FC<IProps> = ({onClick, disabled, background, children}): JSX.Element => (
  <button
    style={{
      ...buttonStyle,
      background

    }}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;