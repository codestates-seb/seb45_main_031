import { styled } from "styled-components";

import { CLOSE_TEXT, DELETE_TEXT, MODIFY_TEXT } from "../../data/constants";

const CommentModal = ({
  feedId,
  commentId,
  content,
  changeComment,
  closeCommentModal,
  patchComment,
  deleteComment,
}) => {
  return (
    <>
      <ModalWrapper>
        <CloseButton onClick={() => closeCommentModal()}>
          {CLOSE_TEXT}
        </CloseButton>
        <Input
          id="CommentInput"
          placeholder="여기에 수정할 댓글을 입력해주세요."
          value={content}
          onChange={(event) => changeComment(event)}
        />
        <Buttons>
          <Button onClick={() => patchComment(commentId, content)}>
            {MODIFY_TEXT}
          </Button>
          <Button onClick={() => deleteComment(feedId, commentId)}>
            {DELETE_TEXT}
          </Button>
        </Buttons>
      </ModalWrapper>
    </>
  );
};

export default CommentModal;

const ModalWrapper = styled.div`
  width: 390px;
  height: 300px;

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

const CloseButton = styled.button`
  width: 30px;
  height: 30px;

  border: 1px solid #d0d0d0;
  border-radius: 50%;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const Input = styled.input`
  width: 320px;
  height: 30px;

  margin: 80px 15px 50px 15px;
  border-bottom: 1px solid #d0d0d0;
`;

const Buttons = styled.div`
  width: 390px;

  padding-left: 20px;

  display: flex;
  flex-direction: raw;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;

  margin-left: 15px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
