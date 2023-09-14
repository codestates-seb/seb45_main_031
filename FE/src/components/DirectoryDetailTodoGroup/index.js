import { styled } from "styled-components";

import TodoCard from "../TodoCard";

const DirectoryDetailTodoGroup = ({ savedTodoGroup }) => {
  return (
    <>
      <SavedTodoGroup>
        {savedTodoGroup.map((savedTodo) => (
          <>
            <TodoCard
              todo={savedTodo}
              content={savedTodo.content}
              todoEmoji={savedTodo.emoji}
              tagName={savedTodo.tagResponse.tagName}
              complete="DONE"
            />
          </>
        ))}
      </SavedTodoGroup>
    </>
  );
};

export default DirectoryDetailTodoGroup;

const SavedTodoGroup = styled.ul`
  width: 90%;
  max-width: 390px;
  height: 100%;

  margin-bottom: 95px;

  overflow: scroll;
`;
