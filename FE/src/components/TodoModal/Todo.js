import { styled } from "styled-components";

const Todo = ({ complete, tagName, content, emoji }) => {
  return (
    <>
      <TodoWrapper>
        <ContentsSection>
          <Tag>{tagName}</Tag>
          <Title>{content}</Title>
        </ContentsSection>
        <Emoji>{complete === "DONE" ? emoji : ""}</Emoji>
      </TodoWrapper>
    </>
  );
};

export default Todo;

const TodoWrapper = styled.section`
  width: 90%;
  max-width: 300px;

  margin-bottom: 30px;
  border: 1px solid #ffd900;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const ContentsSection = styled.div`
  width: 100%;

  padding: 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  width: 70px;
  height: 40px;

  background: #ececec;

  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  width: 65%;
  height: 40px;

  font-size: 0.9erm;

  padding-left: 5px;

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Emoji = styled.div`
  width: 40px;
  height: 40px;

  margin: 15px;
  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
