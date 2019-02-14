import React from 'react';
import styled from 'styled-components';

const StyledPopUpWrapper = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledPopUpHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 12px;
`;
const StyledPopUpContent = styled.div`
  
`;
const StyledPopUpCloseButton = styled.div`
  border-radius: 4px;
  padding: 6px 10px;
  background-color: #358ada;
  color: #fff;
  text-decoration: none;
  border: none;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

interface IProps {
  onClose: () => void;
}

const PopUp: React.FC<IProps> = ({onClose, children}): JSX.Element => (
  <StyledPopUpWrapper>
    <StyledPopUpHeader>
      You WIN!!!
    </StyledPopUpHeader>
    <StyledPopUpContent>
      {children}
    </StyledPopUpContent>
    <StyledPopUpCloseButton
      onClick={onClose}
    >
      Close
    </StyledPopUpCloseButton>
  </StyledPopUpWrapper>
);

export default PopUp;