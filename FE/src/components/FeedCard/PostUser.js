import { styled } from "styled-components";

//더미데이터
import imgUrl from "../../assets/images/memberImg.jpeg";

const PostUser = ({ memberId, nickname, createdAt }) => {
  return (
    <>
      <UserSection>
        <UserImgDiv>
          <img src={imgUrl} alt={nickname} />
        </UserImgDiv>
        <PostElement>
          <UserName>{nickname}</UserName>
          <PostCreatedAt>{createdAt}</PostCreatedAt>
        </PostElement>
        {Number(memberId) === Number(localStorage.memberId) && (
          <PostButtons>
            <PostButton>수정</PostButton>
            <PostButton>삭제</PostButton>
          </PostButtons>
        )}
      </UserSection>
    </>
  );
};

export default PostUser;

const UserSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;

const UserImgDiv = styled.div`
  width: 50px;
  height: 50px;

  margin: 5px;
  border: 1px solid #000000;
  border-radius: 50%;

  overflow: hidden;
`;

const PostElement = styled.div`
  width: 250px;
  height: 50px;

  padding-top: 5px;
  padding-left: 5px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const PostCreatedAt = styled.div`
  font-size: 0.8rem;
`;

const PostButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const PostButton = styled.button`
  width: 50px;
  height: 25px;

  color: #949597;

  border-radius: 15px;

  &:hover {
    background-color: #ececec;
  }
`;
