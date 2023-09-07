import { styled } from "styled-components";

const TodoCard = ({ value, todoPage, ChangeTodo }) => {
  return (
    <>
      <TodoCardSection
        onClick={() => {
          todoPage ? ChangeTodo(value) : "";
        }}
      >
        <TagDiv>{value.tagResponse.tagName}</TagDiv>
        <TitleDiv>{value.content}</TitleDiv>
        <EmojiDiv>{value.complete === "DONE" ? value.todoEmoji : ""}</EmojiDiv>
      </TodoCardSection>
    </>
  );
};

const TodoCardSection = styled.li`
  width: 100%;
  height: 70px;

  margin-top: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TagDiv = styled.span`
  width: 70px;
  height: 40px;

  background: #ececec;

  margin: 15px;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.p`
  width: 200px;

  font-size: 0.9erm;
`;

const EmojiDiv = styled.div`
  width: 40px;
  height: 40px;

  margin: 15px;
  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TodoCard;
