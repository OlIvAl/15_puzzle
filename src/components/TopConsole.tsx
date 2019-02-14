import React, {CSSProperties} from 'react';

const topConsoleStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 12,
  width: '100%'
};

const TopConsole: React.FC = ({children}): JSX.Element => (
  <div style={topConsoleStyle}>
    {children}
  </div>
);

export default TopConsole;