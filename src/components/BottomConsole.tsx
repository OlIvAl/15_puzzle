import React, {CSSProperties} from 'react';

const bottomConsoleStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 12,
  width: '50%'
};

const BottomConsole: React.FC = ({children}): JSX.Element => (
  <div style={bottomConsoleStyle}>
    {children}
  </div>
);

export default BottomConsole;