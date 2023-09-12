import { styled } from "styled-components";

import TodoCard from "../TodoCard";

const TodoList = ({ todoGroup, changeTodo }) => {
  return (
    <>
      <ListContainer>
        <TodoGroup>
          {todoGroup.map((value, idx) => (
            <TodoCard
              key={idx}
              value={value}
              todoPage={true}
              changeTodo={changeTodo}
            />
          ))}
        </TodoGroup>
      </ListContainer>
    </>
  );
};

export default TodoList;

const ListContainer = styled.div`
  width: 430px;
  height: 100%;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
`;

const TodoGroup = styled.ul`
  width: 390px;

  margin-bottom: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
