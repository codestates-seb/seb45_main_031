import { styled } from "styled-components";

const Tag = ({ tag, changeTag }) => {
  return (
    <>
      <TagWrapper>
        <TagButton onClick={() => changeTag(tag)}>{tag}</TagButton>
      </TagWrapper>
    </>
  );
};

export default Tag;

const TagWrapper = styled.li`
  width: 80%;
  max-width: 250px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagButton = styled.button`
  width: 100%;

  margin-bottom: 10px;
  padding: 10px 0px;
  border: 1px solid #949597;
  border-radius: 15px;

  &:hover {
    background-color: #ffe866;
    border: 1px solid #ffe866;
  }
`;
