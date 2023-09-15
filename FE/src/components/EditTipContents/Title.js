import { styled } from "styled-components";

const Title = ({ TITLE }) => {
  return (
    <>
      <TitleSection>
        <TitleText>{TITLE}</TitleText>
      </TitleSection>
    </>
  );
};

export default Title;

const TitleSection = styled.section`
  width: 90%;
  max-width: 390px;
  height: 150px;

  padding: 10px 10px 0px 10px;

  display: flex;
  align-items: end;
  justify-content: start;
`;

const TitleText = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
`;
