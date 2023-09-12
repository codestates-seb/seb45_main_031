import { useState } from "react";
import { styled } from "styled-components";

import CommentCreate from "./CommentCreate";
import Comment from "./Comment";

const Comments = ({ comments }) => {
  const [moreActions, setMoreActions] = useState(true);

  const ChangeMore = () => {
    try {
      setMoreActions(!moreActions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommentContainer>
        <CommentCreate />
        <CommentsUl more={moreActions}>
          {comments.map((comment, idx) => (
            <Comment key={idx} comment={comment} />
          ))}
        </CommentsUl>
        <MoreCommentButton onClick={() => ChangeMore()}>
          {moreActions ? "··· More Comment ···" : "··· Close Comment ···"}
        </MoreCommentButton>
      </CommentContainer>
    </>
  );
};

export default Comments;

const CommentContainer = styled.div`
  width: 100%;

  margin: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CommentsUl = styled.ul`
  width: 100%;
  max-height: ${(props) => (props.more ? "80px" : "")};

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;

const MoreCommentButton = styled.button`
  width: 95%;

  font-size: 0.65rem;
  color: #949597;

  margin: 5px 0px 0px -20px;

  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
