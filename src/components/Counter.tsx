import React, {CSSProperties} from 'react';

interface IProps {
  count: number
}

const Counter: React.FC<IProps> = ({count}) => (
  <div><strong>Count:</strong> {count}</div>
);

export default Counter