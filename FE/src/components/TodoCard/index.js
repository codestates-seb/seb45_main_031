import { styled } from "styled-components";

const TodoCard = ({
  todo,
  tagName,
  content,
  complete,
  todoEmoji,
  todoPage,
  changeTodo,
}) => {
  return (
    <>
      <TodoCardSection
        onClick={() => {
          todoPage ? changeTodo(todo) : "";
        }}
      >
        <TagDiv>{tagName}</TagDiv>
        <TitleDiv>{content}</TitleDiv>
        <EmojiDiv>{complete === "DONE" ? todoEmoji : ""}</EmojiDiv>
      </TodoCardSection>
    </>
  );
};

const TodoCardSection = styled.li`
  width: 100%;

  margin-top: 20px;
  padding: 10px 15px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TagDiv = styled.span`
  width: 70px;
  height: 40px;

  background: #ececec;

  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.p`
  width: 80%;
  max-width: 175px;
  height: 30px;

  font-size: 0.9erm;
  font-weight: bold;

  margin: 10px;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const EmojiDiv = styled.div`
  width: 40px;
  height: 40px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TodoCard;
