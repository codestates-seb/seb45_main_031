import { styled } from "styled-components";

import getDateFormat from "../../utils/getDateFormat";
import ModalButton from "./ModalButton";

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
        <ContentSection>
          <Content>{content}</Content>
          <CreatedAt>{getDateFormat(createdAt)}</CreatedAt>
        </ContentSection>
        {Number(memberId) === Number(localUser.memberId) && (
          <ModalButton
            feedId={feedId}
            commentId={commentId}
            memberId={memberId}
            content={content}
            openCommentModal={openCommentModal}
          />
        )}
      </CommentWrapper>
    </>
  );
};

export default Comment;

const CommentWrapper = styled.li`
  width: 100%;

  margin: 5px;

  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  flex-wrap: wrap;
`;

const CommentUserName = styled.div`
  width: 100%;
  max-width: 65px;

  font-size: 0.9rem;
  font-weight: bold;

  margin-right: 7px;
`;

const ContentSection = styled.section`
  width: 100%;
  max-width: 230px;

  padding: 3px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
`;

const Content = styled.div`
  width: 100%;

  font-size: 0.9rem;

  justify-content: start;
`;

const CreatedAt = styled.div`
  width: 100%;

  font-size: 0.7rem;
  color: #949597;

  display: flex;
  justify-content: end;
`;
