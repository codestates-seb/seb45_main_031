import { styled } from "styled-components";

import { CLOSE_TEXT } from "../../data/constants";

const TagModal = ({ tags, tagModalClose, changeTag }) => {
  return (
    <>
      <TagModalBody>
        <TagExitButton onClick={() => tagModalClose()}>
          {CLOSE_TEXT}
        </TagExitButton>
        <TagGroup>
          {tags.map((tag) => (
            <>
              <Tag>
                <TagButton onClick={() => changeTag(tag)}>{tag}</TagButton>
              </Tag>
            </>
          ))}
        </TagGroup>
      </TagModalBody>
    </>
  );
};

export default TagModal;

const TagModalBody = styled.div`
  width: 390px;
  height: 400px;

  padding: 15px;

  border-radius: 15px;

  background-color: #ffffff;

  position: absolute;
  top: 300px;

  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;
`;

const TagGroup = styled.ul`
  width: 100%;
  height: 75%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: auto;
`;

const Tag = styled.li`
  width: 250px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagButton = styled.button`
  width: 250px;

  margin-bottom: 10px;
  padding: 10px 0px;
  border: 1px solid #949597;
  border-radius: 15px;

  &:hover {
    background-color: #ffe866;
    border: 1px solid #ffe866;
  }
`;

const TagExitButton = styled.button`
  width: 30px;
  height: 30px;

  margin-bottom: 30px;
  border: 1px solid #ffb039;
  border-radius: 15px;

  &:hover {
    background-color: #ffb039;
  }
`;
