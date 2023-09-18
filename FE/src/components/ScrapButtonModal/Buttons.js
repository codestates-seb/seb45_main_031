import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  SCRAP_TO_DIRECTORY_TEXT,
  SCRAP_TO_TODO_TEXT,
} from "../../data/constants";

const ScrapButtonModal = ({ feedId }) => {
  const navigate = useNavigate();
  return (
    <>
      <ButtonsWrapper>
        <Button onClick={() => navigate(`/scrap/todo/${feedId}`)}>
          {SCRAP_TO_TODO_TEXT}
        </Button>
        <Button onClick={() => alert("구현중인 기능입니다.")}>
          {SCRAP_TO_DIRECTORY_TEXT}
        </Button>
      </ButtonsWrapper>
    </>
  );
};

export default ScrapButtonModal;

const ButtonsWrapper = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 80%;
  max-width: 180px;

  margin-bottom: 20px;
  padding: 10px 15px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
