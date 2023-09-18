import { styled } from "styled-components";

const EditButton = ({ LabelText, handleClick, value }) => {
  return (
    <>
      <Section>
        <Label for="Button">{LabelText}</Label>
        <Button id="Button" onClick={() => handleClick(value)}>
          {value}
        </Button>
      </Section>
    </>
  );
};

export default EditButton;

const Section = styled.section`
  width: 100%;

  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;

  font-size: 1rem;
  color: #949597;

  padding-left: 25px;
  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;
