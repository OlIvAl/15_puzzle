import React from 'react';
import {StyledPopUpCloseButton, StyledPopUpContent, StyledPopUpHeader, StyledPopUpWrapper} from './StyledComponents';

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