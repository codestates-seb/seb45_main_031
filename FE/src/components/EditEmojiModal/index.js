import { styled } from "styled-components";
import EmojiPicker from "emoji-picker-react";

import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";

const EditEmojiModal = ({
  todoEmoji,
  emojiModalOpen,
  emojiModalClose,
  changeTodoEmoji,
}) => {
  return (
    <>
      <ModalWrapper>
        <TodoEmojiSection>
          <Emoji onClick={() => emojiModalOpen()}>{todoEmoji}</Emoji>
          <CloseButton isModal={emojiModalClose} />
        </TodoEmojiSection>
        <EmojiPicker onEmojiClick={(event) => changeTodoEmoji(event)} />
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default EditEmojiModal;

const ModalWrapper = styled.div`
  width: 90%;
  max-width: 390px;
  height: 80%;
  max-height: 550px;

  position: absolute;
  top: 85px;

  z-index: 100;

  background-color: #ffffff;

  padding: 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;

  overflow: over;
`;

const TodoEmojiSection = styled.section`
  width: 100%;

  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Emoji = styled.div`
  width: 50%;
  max-width: 50px;
  height: 50px;

  font-size: 35px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
