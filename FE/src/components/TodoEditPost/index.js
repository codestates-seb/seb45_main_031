import { styled } from "styled-components";

import Buttons from "./Buttons";
import Post from "./Post";

const TodoEditPost = ({
  tagModalOpen,
  emojiModalOpen,
  changeName,
  todoTag,
  todoEmoji,
  content,
  date,
  calendarOpen,
  inputCount,
  postTodo,
  navigate,
}) => {
  return (
    <>
      <PostSection>
        <Post
          tagModalOpen={tagModalOpen}
          emojiModalOpen={emojiModalOpen}
          changeName={changeName}
          todoTag={todoTag}
          todoEmoji={todoEmoji}
          content={content}
          date={date}
          calendarOpen={calendarOpen}
          inputCount={inputCount}
        />
        <Buttons postTodo={postTodo} navigate={navigate} />
      </PostSection>
    </>
  );
};

export default TodoEditPost;

const PostSection = styled.section`
  width: 390px;
  height: 500px;

  background-color: #ffffff;

  margin-top: 10px;
  padding: 30px 20px 30px 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
