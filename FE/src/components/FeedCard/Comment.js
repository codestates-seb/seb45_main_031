import { styled } from "styled-components";

import getDateFormat from "../../utils/getDateFormat";

const localUser = JSON.parse(localStorage.getItem("localUser"));

const Comment = ({
  feedId,
  commentId,
  memberId,
  nickname,
  content,
  createdAt,
  openCommentModal,
}) => {
  return (
    <>
      <CommentWrapper>
        <CommentUserName>{nickname}</CommentUserName>
        <Content>{content}</Content>
        <CreatedAt>{getDateFormat(createdAt)}</CreatedAt>
        {Number(memberId) === Number(localUser.memberId) && (
          <ModalButton
            onClick={() => openCommentModal(feedId, commentId, content)}
          >
            ···
          </ModalButton>
        )}
      </CommentWrapper>
    </>
  );
};

export default Comment;

const CommentWrapper = styled.li`
  margin: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CommentUserName = styled.div`
  width: 50px;

  font-size: 0.9rem;
  font-weight: bold;

  margin-right: 7px;
`;

const Content = styled.div`
  width: 200px;
  font-size: 0.9rem;
`;

const CreatedAt = styled.div`
  width: 50px;

  font-size: 0.7rem;
  color: #949597;
`;

const ModalButton = styled.button`
  font-size: 0.7rem;
  color: #949597;

  margin-left: 5px;
  padding: 5px;
  border: 1px solid #ececec;
  border-radius: 15px;

  &:hover {
    background-color: #ececec;
  }
`;
