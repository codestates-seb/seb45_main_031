import { styled } from "styled-components";

import TodoCard from "../TodoCard";

const TodoGroup = ({ todoList }) => {
  return (
    <>
      <TodoSection>
        {todoList.length === 0
          ? "할 일 목록이 없습니다."
          : todoList.map((todo, idx) => (
              <TodoCard
                todo={todo}
                tagName={todo.tagResponse.tagName}
                content={todo.content}
                complete={todo.complete}
                todoEmoji={todo.todoEmoji}
                todoPage={false}
                key={idx}
              />
            ))}
      </TodoSection>
    </>
  );
};

export default TodoGroup;

const TodoSection = styled.ul`
  width: 90%;
  max-width: 370px;
  height: 300px;

  margin: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: scroll;
`;
