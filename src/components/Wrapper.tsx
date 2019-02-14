import React, {CSSProperties} from 'react';

const wrapperStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

const Wrapper: React.FC = ({children}): JSX.Element => (
  <div style={wrapperStyle}>{children}</div>
);

export default Wrapper;