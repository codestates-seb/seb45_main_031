import { styled } from "styled-components";

import TodoCard from "../TodoCard";
import Comments from "./Comments";
import PostContents from "./PostContents";
import PostUser from "./PostUser";

const FeedCard = ({
  feedId,
  memberId,
  nickname,
  createdAt,
  todoList,
  content,
  likeCount,
  feedLikeInfo,
  comments,
  openDeleteModal,
  isLike,
  commentId,
  commentContent,
  changeComment,
  createComment,
  openCommentModal,
  getFeedTodoList,
}) => {
  return (
    <>
      <CardContainer>
        <PostUser
          feedId={feedId}
          memberId={memberId}
          nickname={nickname}
          createdAt={createdAt}
          openDeleteModal={openDeleteModal}
        />
        <TodoSection>
          <Todo>
            {todoList.map((todo, idx) => (
              <TodoCard
                key={idx}
                tagName={todo.tagName}
                content={todo.content}
                complete={todo.complete}
                todoEmoji={todo.todoEmoji}
                todoPage={false}
              />
            ))}
          </Todo>
        </TodoSection>
        <PostContents
          feedId={feedId}
          content={content}
          feedLikeInfo={feedLikeInfo}
          likeCount={likeCount}
          isLike={isLike}
          getFeedTodoList={getFeedTodoList}
        />
        <Comments
          feedId={feedId}
          comments={comments}
          commentId={commentId}
          commentContent={commentContent}
          changeComment={changeComment}
          createComment={createComment}
          openCommentModal={openCommentModal}
        />
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
