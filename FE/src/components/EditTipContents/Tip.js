import { styled } from "styled-components";

const Tip = ({ text }) => {
  return (
    <>
      <li>
        <TipText>{text}</TipText>
      </li>
    </>
  );
};

export default Tip;

const TipText = styled.p`
  margin: 5px;
`;
