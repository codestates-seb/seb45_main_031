import { styled } from "styled-components";

import Exit from "./Exit";
import TodoModalButtons from "./TodoModalButtons";
import Todo from "./Todo";
import ModalBackground from "../ModalBackground";

const TodoModal = ({ todo, isTodoModal, changeComplete, deleteTodo }) => {
  return (
    <>
      <TodoModalWrapper>
        <Exit isTodoModal={isTodoModal} />
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
      <ModalBackground />
    </>
  );
};

export default TodoModal;

const TodoModalWrapper = styled.div`
  width: 90%;
  max-width: 380px;

  border: 1px solid #fff7cc;
  border-radius: 15px;

  background-color: #ffffff;

  padding: 20px;

  position: absolute;
  top: 25%;

  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
