import { styled } from "styled-components";

import CloseButton from "../CloseButton";
import ModalBackground from "../ModalBackground";
import Tag from "./Tag";

const TagModal = ({ tags, tagModalClose, changeTag }) => {
  return (
    <>
      <ModalWrapper>
        <CloseButton isModal={tagModalClose} />
        <TagGroup>
          {tags.map((tag) => (
            <>
              <Tag tag={tag} changeTag={changeTag} />
            </>
          ))}
        </TagGroup>
      </ModalWrapper>
      <ModalBackground />
    </>
  );
};

export default TagModal;

const ModalWrapper = styled.div`
  width: 90%;
  max-width: 390px;
  height: 400px;

  padding: 20px;

  border-radius: 15px;

  background-color: #ffffff;

  position: absolute;
  top: 100px;

  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;
`;

const TagGroup = styled.ul`
  width: 100%;
  height: 80%;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: auto;
`;
