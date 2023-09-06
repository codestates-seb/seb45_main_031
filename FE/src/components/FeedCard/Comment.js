import { styled } from "styled-components";

const Comment = ({ comment }) => {
  const { memberId, nickname, content, createdAt } = comment;
  return (
    <>
      <CommentLi>
        <CommentUserName>{nickname}</CommentUserName>
        <Content>{content}</Content>
        <CreatedAt>{createdAt}</CreatedAt>
        {Number(memberId) === Number(localStorage.memberId) && (
          <ModalButton>···</ModalButton>
        )}
      </CommentLi>
    </>
  );
};

export default Comment;

const CommentLi = styled.li`
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
  width: 190px;
  font-size: 0.9rem;
`;

const CreatedAt = styled.div`
  width: 60px;

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
