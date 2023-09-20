import { styled } from "styled-components";
import { CANCEL_TEXT, DELETE_TEXT, WARNING_TEXT } from "../../data/constants";
import ModalBackground from "../ModalBackground";

const DeleteConfirmModal = ({ closeDeleteModal, deleteFeed }) => {
  return (
    <>
      <ModalWrapper>
        <WarningText>{WARNING_TEXT}</WarningText>
        <Buttons>
          <Button onClick={() => deleteFeed()}>{DELETE_TEXT}</Button>
          <Button onClick={() => closeDeleteModal()}>{CANCEL_TEXT}</Button>
        </Buttons>
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default DeleteConfirmModal;

const ModalWrapper = styled.div`
  width: 90%;
  max-width: 390px;
  height: 200px;

  background-color: #ffffff;

  padding: 15px;
  border-radius: 15px;

  position: absolute;
  top: 30%;

  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WarningText = styled.div`
  width: 390px;

  padding: 30px 0px 20px 10px;

  display: flex;
  justify-content: center;
`;

const Buttons = styled.div`
  width: 390px;

  display: flex;
  flex-direction: raw;
  justify-content: center;
`;

const Button = styled.button`
  width: 80px;

  padding: 10px;
  margin-left: 10px;

  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
