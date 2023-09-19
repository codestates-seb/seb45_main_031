import { styled } from "styled-components";

import Title from "./Title";
import EditButton from "./EditButton";
import TodoCard from "../TodoCard";
import Buttons from "./Buttons";

import { CALENDAR_LABEL, TAG_LABEL } from "../../data/constants";
import getDateFormat from "../../utils/getDateFormat";

const ScrapEdit = ({
  TITLE,
  changeDate,
  changeTag,
  date,
  todoTag,
  todos,
  postScrapTodo,
  navigate,
}) => {
  return (
    <>
      <EditWrapper>
        <Title TITLE={TITLE} />
        <EditSection>
          <EditButton
            LabelText={CALENDAR_LABEL}
            handleClick={changeDate}
            value={getDateFormat(date)}
          />
          <EditButton
            LabelText={TAG_LABEL}
            handleClick={changeTag}
            value={todoTag}
          />
        </EditSection>
        <TodoSection>
          {todos.map((todo) => (
            <>
              <TodoCard
                todo={todo}
                tagName={todo.tagName}
                content={todo.content}
                complete={"DONE"}
                todoEmoji={todo.todoEmoji}
                todoPage={false}
              />
            </>
          ))}
        </TodoSection>
        <Buttons postScrapTodo={postScrapTodo} navigate={navigate} />
      </EditWrapper>
    </>
  );
};

export default ScrapEdit;

const EditWrapper = styled.section`
  width: 90%;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditSection = styled.section`
  width: 90%;
  height: 40%;
  max-height: 200px;
`;

const TodoSection = styled.section`
  width: 100%;
  height: 80%;
  max-height: 350px;

  padding: 10px;

  overflow: auto;
`;
