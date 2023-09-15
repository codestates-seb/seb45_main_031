import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  COMPLETE_TEXT,
  COMPLETE_CANCEL_TEXT,
  MODIFY_TEXT,
  DELETE_TEXT,
} from "../../data/constants";

const TodoModalButtons = ({ todoId, complete, changeComplete, deleteTodo }) => {
  const navigate = useNavigate();

  return (
    <>
      <TodoModalButton
        onClick={() => {
          changeComplete(todoId, complete);
        }}
      >
        {complete === "DONE" ? COMPLETE_CANCEL_TEXT : COMPLETE_TEXT}
      </TodoModalButton>
      <TodoModalButton onClick={() => navigate(`/todo/modify/${todoId}`)}>
        {MODIFY_TEXT}
      </TodoModalButton>
      <TodoModalButton onClick={() => deleteTodo(todoId)}>
        {DELETE_TEXT}
      </TodoModalButton>
    </>
  );
};

export default TodoModalButtons;

const TodoModalButton = styled.button`
  width: 80%;
  max-width: 250px;
  height: 35px;

  font-size: 0.85rem;

  margin-bottom: 15px;
  border-radius: 15px;

  background-color: #ececec;

  &:hover {
    font-weight: bold;
    background-color: #d0d0d0;
  }
`;
