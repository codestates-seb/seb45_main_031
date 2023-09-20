import { styled } from "styled-components";

import { CLOSE_TEXT } from "../../data/constants";

const Exit = ({ isTodoModal }) => {
  return (
    <ExitWrapper>
      <ExitButton
        onClick={() => {
          isTodoModal();
        }}
      >
        {CLOSE_TEXT}
      </ExitButton>
    </ExitWrapper>
  );
};

export default Exit;

const ExitWrapper = styled.div`
  width: 100%;
  height: 20px;

  width: 100%;

  margin: 10px;

  display: flex;
  align-items: end;
  justify-content: end;
`;

const ExitButton = styled.button`
  width: 30px;
  height: 30px;

  border: 1px solid #d0d0d0;
  border-radius: 50%;

  &:hover {
    background-color: #d0d0d0;
  }
`;
