import React, {CSSProperties} from 'react';

interface IProps {
  time: string;
}

const Timer: React.FC<IProps> = ({time}) => (
  <div>{time}</div>
);

export default Timer;