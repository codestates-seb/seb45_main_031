import { styled } from "styled-components";

import { CLOSE_TEXT } from "../../data/constants";

const Exit = ({ closeTodoModal }) => {
  return (
    <ExitWrapper>
      <ExitButton
        onClick={() => {
          closeTodoModal();
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

  margin-top: -5px;
  margin-bottom: 10px;

  display: flex;
  justify-content: end;
`;

const ExitButton = styled.button`
  width: 30px;
  height: 30px;

  border: 1px solid #ffb039;
  border-radius: 50%;

  &:hover {
    background-color: #ffb039;
  }
`;
