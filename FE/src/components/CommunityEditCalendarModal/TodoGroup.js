import { styled } from "styled-components";

import TodoCard from "../TodoCard";

const TodoGroup = ({ todoList }) => {
  return (
    <>
      <TodoSection>
        {todoList.length === 0
          ? "할 일 목록이 없습니다."
          : todoList.map((todo) => <TodoCard value={todo} key={todo.todoId} />)}
      </TodoSection>
    </>
  );
};

export default TodoGroup;

const TodoSection = styled.ul`
  width: 370px;
  height: 300px;

  margin: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: scroll;
`;
