import { styled } from "styled-components";

const DirectoryTitle = ({ nickname }) => {
  return (
    <>
      <TitleWrapper>
        <Title>{`' ${nickname} '님 안녕하세요! 🥳`}</Title>
      </TitleWrapper>
    </>
  );
};

export default DirectoryTitle;

const TitleWrapper = styled.div`
  width: 90%;

  margin: 10px 0px;
`;

const Title = styled.p`
  font-size: 1.15rem;
  font-weight: bold;
`;
