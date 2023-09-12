import { styled } from "styled-components";
import EmojiPicker from "emoji-picker-react";

import { CLOSE_TEXT } from "../../data/constants";

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
          <CloseButton onClick={() => emojiModalClose()}>
            {CLOSE_TEXT}
          </CloseButton>
        </TodoEmojiSection>
        <EmojiPicker onEmojiClick={(event) => changeTodoEmoji(event)} />
      </ModalWrapper>
    </>
  );
};

export default EditEmojiModal;

const ModalWrapper = styled.div`
  width: 390px;
  height: 500px;

  position: absolute;
  top: 30%;

  z-index: 100;

  background-color: #ffffff;

  padding: 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;
`;

const TodoEmojiSection = styled.section`
  width: 340px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;

  margin-bottom: 30px;
  border: 1px solid #ffb039;
  border-radius: 15px;

  &:hover {
    background-color: #ffb039;
  }
`;

const Emoji = styled.div`
  width: 50px;
  height: 50px;

  font-size: 35px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
