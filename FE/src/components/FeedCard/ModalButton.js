import { styled } from "styled-components";

const ModalButton = ({ feedId, commentId, content, openCommentModal }) => {
  return (
    <>
      <Button onClick={() => openCommentModal(feedId, commentId, content)}>
        ···
      </Button>
    </>
  );
};

export default ModalButton;

const Button = styled.button`
  font-size: 0.7rem;
  color: #949597;

  margin-left: 5px;
  padding: 5px;
  border: 1px solid #ececec;
  border-radius: 15px;

  &:hover {
    background-color: #ececec;
  }
`;
