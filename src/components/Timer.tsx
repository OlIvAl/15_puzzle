import React from 'react';

interface IProps {
  time: string;
}

const Timer: React.FC<IProps> = ({time}) => (
  <div><strong>Time:</strong> {time}</div>
);

export default Timer;