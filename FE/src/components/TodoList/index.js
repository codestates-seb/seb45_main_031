import { styled } from "styled-components";

import TodoCard from "../TodoCard";

const TodoList = ({ todoGroup, changeTodo }) => {
  return (
    <>
      <ListContainer>
        <TodoGroup>
          {todoGroup.map((todo, idx) => (
            <TodoCard
              key={idx}
              todo={todo}
              tagName={todo.tagResponse.tagName}
              content={todo.content}
              complete={todo.complete}
              todoEmoji={todo.todoEmoji}
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
