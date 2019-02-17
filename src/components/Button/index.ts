import styled from 'styled-components';

const StyledButton = styled.button`
  border-radius: 4px;
  padding: 6px 10px;
  background-color: #0d9095;
  color: #fff;
  text-decoration: none;
  border: none;
  
  &:hover {
    background-color: #17bbc2;
  }
  &:disabled {
    background-color: #999;
  }
`;

export default StyledButton;