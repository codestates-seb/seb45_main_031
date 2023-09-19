import { styled } from "styled-components";
import { CANCEL_TEXT, EDIT_TEXT } from "../../data/constants";

// 명칭을 조금 더 명확하게 해주기
const Buttons = ({ postTodo, navigate }) => {
  return (
    <>
      <ButtonSection>
        <Button
          bgColor="#ECECEC"
          hoverColor="#D0D0D0"
          onClick={() => navigate("/todo")}
        >
          {CANCEL_TEXT}
        </Button>
        <Button
          bgColor="#ffe866"
          hoverColor="#ffd900"
          onClick={() => postTodo()}
        >
          {EDIT_TEXT}
        </Button>
      </ButtonSection>
    </>
  );
};

export default Buttons;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 115px;
  height: 35px;

  font-size: 0.85rem;

  background-color: ${(props) => props.bgColor};

  margin: 10px;
  border-radius: 15px;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;
