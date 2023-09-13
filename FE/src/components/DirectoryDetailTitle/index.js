import { styled } from "styled-components";

const DirectoryDetailTitle = ({ category }) => {
  return (
    <>
      <TitleWrapper>
        <Title>{category}</Title>
      </TitleWrapper>
    </>
  );
};

export default DirectoryDetailTitle;

const TitleWrapper = styled.div`
  width: 90%;
  max-width: 390px;

  padding-left: 15px;
  padding-bottom: 15px;
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;
