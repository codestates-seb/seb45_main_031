import { styled } from "styled-components";

const PostContents = ({ content, like, likes }) => {
  return (
    <>
      <ContentsContainer>
        <LikeSection>
          <LikeButton>{like ? "♥" : "♡"}</LikeButton>
          <LikeCount>{likes}</LikeCount>
          <ScrapButton>가져오기</ScrapButton>
        </LikeSection>
        <TextDiv>{content}</TextDiv>
      </ContentsContainer>
    </>
  );
};

export default PostContents;

const ContentsContainer = styled.div`
  width: 100%;

  padding: 5px 10px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
`;

const LikeSection = styled.section`
  width: 100%;

  margin: 5px 0px;

  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;

const LikeButton = styled.button`
  width: 25px;
  height: 30px;

  font-size: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LikeCount = styled.span`
  width: 75%;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: start;
`;

const ScrapButton = styled.button`
  width: 60px;
  height: 30px;

  font-size: 0.75rem;

  background-color: #ffe866;
  &:hover {
    background-color: #ffd900;
  }

  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextDiv = styled.div`
  margin: 5px;
`;
