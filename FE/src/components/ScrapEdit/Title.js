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
  width: 100%;
  height: 150px;

  padding: 10px;

  display: flex;
  ]justify-content: start;
`;

const TitleText = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
`;
