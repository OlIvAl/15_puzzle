import React, {CSSProperties} from 'react';

interface IProps {
  count: number
}

const Counter: React.FC<IProps> = ({count}) => (
  <div>{count}</div>
);

export default Counter