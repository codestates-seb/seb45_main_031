import { styled } from "styled-components";

import TodoCard from "../TodoCard";
import Comments from "./Comments";
import PostContents from "./PostContents";
import PostUser from "./PostUser";

const FeedCard = ({ post }) => {
  const {
    memberId,
    nickname,
    createdAt,
    todoList,
    content,
    like,
    likes,
    comments,
  } = post;
  return (
    <>
      <CardContainer>
        <PostUser
          memberId={memberId}
          nickname={nickname}
          createdAt={createdAt}
        />
        <TodoSection>
          <Todo>
            {todoList.map((todo, idx) => (
              <TodoCard key={idx} value={todo} />
            ))}
          </Todo>
        </TodoSection>
        <PostContents content={content} like={like} likes={likes} />
        <Comments comments={comments} />
      </CardContainer>
    </>
  );
};

export default FeedCard;

const CardContainer = styled.li`
  width: 390px;

  background-color: #ffffff;

  margin-bottom: 15px;
  padding: 15px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-contents: center;
`;

const TodoSection = styled.section`
  width: 360px;
  height: 200px;

  border-top: 1px solid #d0d0d0;
  border-bottom: 1px solid #d0d0d0;

  overflow: scroll;
`;

const Todo = styled.ul`
  width: 350px;

  margin-bottom: 20px;
`;
