import { styled } from "styled-components";

import Exit from "./Exit";
import TodoModalButtons from "./TodoModalButtons";
import Todo from "./Todo";

const TodoModal = ({ todo, closeTodoModal, changeComplete, deleteTodo }) => {
  return (
    <>
      <TodoModalWrapper>
        <ExitComponent closeTodoModal={closeTodoModal} />
        <Todo
          complete={todo.complete}
          tagName={todo.tagResponse.tagName}
          content={todo.content}
          emoji={todo.todoEmoji}
        />
        <TodoModalButtons
          todoId={todo.todoId}
          complete={todo.complete}
          changeComplete={changeComplete}
          deleteTodo={deleteTodo}
        />
      </TodoModalWrapper>
    </>
  );
};

export default TodoModal;

const TodoModalWrapper = styled.div`
  width: 340px;

  border: 1px solid #fff7cc;
  border-radius: 15px;

  background-color: #ffffff;

  padding: 20px;

  position: absolute;
  top: 30%;

  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExitComponent = styled(Exit)`
  width: 300px;
  height: 20px;

  margin-bottom: 10px;

  display: flex;
  align-items: end;
  justify-content: end;
`;
