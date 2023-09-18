import { styled } from "styled-components";

import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";
import Buttons from "./Buttons";

const ScrapButtonModal = ({ isScrapModal, feedId }) => {
  return (
    <>
      <ModalWrapper>
        <CloseButton isModal={isScrapModal} />
        <Buttons feedId={feedId} />
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default ScrapButtonModal;

const ModalWrapper = styled.div`
  width: 90%;
  max-width: 390px;

  padding: 20px;

  border-radius: 15px;

  background-color: #ffffff;

  position: absolute;
  top: 100px;

  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;
`;
