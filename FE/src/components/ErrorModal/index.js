import { styled } from "styled-components";

import { CLOSE_TEXT } from "../../data/constants";

import ModalBackground from "../ModalBackground";

const ErrorModal = ({ errorMessage, closeErrorModal }) => {
  return (
    <>
      <ModalWrapper>
        <ErrorText>{errorMessage}</ErrorText>
        <CloseErrorModalButton onClick={() => closeErrorModal()}>
          {CLOSE_TEXT}
        </CloseErrorModalButton>
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default ErrorModal;

const ModalWrapper = styled.body`
  width: 90%;
  max-width: 390px;
  height: 150px;

  border-radius: 15px;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 30%;

  z-index: 100;
`;

const ErrorText = styled.p`
  margin: 30px;
`;

const CloseErrorModalButton = styled.button`
  width: 30px;
  height: 30px;

  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
