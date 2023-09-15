import { styled } from "styled-components";

import { DELETE_TEXT, MODIFY_TEXT } from "../../data/constants";

const Buttons = ({
  feedId,
  commentId,
  content,
  patchComment,
  deleteComment,
}) => {
  return (
    <>
      <ButtonSection>
        <Button onClick={() => patchComment(commentId, content)}>
          {MODIFY_TEXT}
        </Button>
        <Button onClick={() => deleteComment(feedId, commentId)}>
          {DELETE_TEXT}
        </Button>
      </ButtonSection>
    </>
  );
};

export default Buttons;

const ButtonSection = styled.section`
  width: 100%;
  max-width: 390px;

  display: flex;
  flex-direction: raw;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;

  margin: 0px 15px 15px 0px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
