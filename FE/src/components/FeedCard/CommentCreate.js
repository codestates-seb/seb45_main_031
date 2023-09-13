import { styled } from "styled-components";

import commentIcon from "../../assets/images/commentIcon.png";
import { COMMENT_POST_BUTTON } from "../../data/constants";

const CommentCreate = ({
  feedId,
  content,
  commentContent,
  createComment,
  changeComment,
}) => {
  return (
    <>
      <CreateSection>
        <Label for="CommentInput">
          <img src={commentIcon} alt="commentIcon" />
        </Label>
        <Input
          id="CommentInput"
          placeholder="여기에 댓글을 입력해주세요."
          value={content}
          onChange={(event) => changeComment(event)}
        />
        <CreateButton
          onClick={() => {
            createComment(feedId, commentContent);
            changeComment({ target: { value: "" } });
          }}
        >
          {COMMENT_POST_BUTTON}
        </CreateButton>
      </CreateSection>
    </>
  );
};

export default CommentCreate;

const CreateSection = styled.section`
  width: 90%;

  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  width: 20px;
  height: 20px;

  margin-left: -10px;
`;

const Input = styled.input`
  width: 220px;
  height: 30px;

  margin: 0px 15px;
  border-bottom: 1px solid #d0d0d0;
`;

const CreateButton = styled.button`
  font-size: 0.75rem;

  background-color: #ececec;
  &:hover {
    background-color: #d0d0d0;
  }

  padding: 5px 15px;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
