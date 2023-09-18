import { styled } from "styled-components";

import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";

import { DELETE_TEXT, MODIFY_TEXT } from "../../data/constants";

const CategoryModal = ({ closeModal }) => {
  return (
    <>
      <ModalWrapper>
        <CloseButton isModal={closeModal} />
        <ButtonSection>
          <Button onClick={() => alert("개발중인 기능입니다.")}>
            {MODIFY_TEXT}
          </Button>
          <Button onClick={() => alert("개발중인 기능입니다.")}>
            {DELETE_TEXT}
          </Button>
        </ButtonSection>
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default CategoryModal;

const ModalWrapper = styled.div`
  width: 90%;
  max-width: 390px;
  height: 150px;

  position: absolute;
  top: 35%;

  z-index: 100;

  background-color: #ffffff;

  padding: 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ButtonSection = styled.section`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #fffff;

  margin: 10px;
  padding: 10px 30px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
