import { styled } from "styled-components";

import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";
import Buttons from "./Buttons";

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
        <CloseButton isModal={closeCommentModal} />
        <Input
          id="CommentInput"
          placeholder="여기에 수정할 댓글을 입력해주세요."
          value={content}
          onChange={(event) => changeComment(event)}
        />
        <Buttons
          feedId={feedId}
          commentId={commentId}
          content={content}
          patchComment={patchComment}
          deleteComment={deleteComment}
        />
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default CommentModal;

const ModalWrapper = styled.div`
  width: 90%;
  max-width: 390px;

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

const Input = styled.input`
  width: 90%;
  max-width: 320px;
  height: 30px;

  margin: 40px 10px 30px 10px;
  border-bottom: 1px solid #d0d0d0;
`;
