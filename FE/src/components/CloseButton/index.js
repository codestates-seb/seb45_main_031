import { styled } from "styled-components";

import { CLOSE_TEXT } from "../../data/constants";

const CloseButton = ({ isModal }) => {
  return (
    <Wrapper>
      <Button
        onClick={() => {
          isModal();
        }}
      >
        {CLOSE_TEXT}
      </Button>
    </Wrapper>
  );
};

export default CloseButton;

const Wrapper = styled.div`
  width: 100%;
  height: 20px;

  width: 100%;

  margin: 10px;

  display: flex;
  align-items: end;
  justify-content: end;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;

  border: 1px solid #d0d0d0;
  border-radius: 50%;

  &:hover {
    background-color: #d0d0d0;
  }
`;
