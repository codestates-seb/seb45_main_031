import { styled } from "styled-components";
import { ReactComponent as ProfileSvg } from "../assets/images/profile.svg";

const Container = styled.div`
  height: 932px;
  width: 430px;
  background-color: #ececec;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;

  btn {
    background-color: #fff;
    color: #949597;
    border: 1px solid #ececec;
    width: 190px;
    height: 35px;
    border-radius: 15px;
    font-size: 0.85rem;
    padding: 5px 10px 5px 10px;
  }

  btn:hover {
    background-color: #ececec;
    cursor: pointer;
    color: #232629;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  color: #232629;
  font-weight: bold;
`;

// 내 정보
const MyInfo = styled.div`
  background-color: #fff;
  margin-top: 95px;
  height: 230px;
  width: 430px;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const ProfileContent = styled.div`
  margin-left: 10px;
`;

// 내 게시물 보기
const MyPost = styled.div`
  background-color: #fff;
  height: 592px;
  width: 430px;
  padding: 20px;
`;

export const MyPage = () => {
  return (
    <>
      <Container>
        <MyInfo>
          <Title>내 정보</Title>
          <ProfileSvg />
          <ProfileContent>
            <btn>프로필 편집</btn>
          </ProfileContent>
        </MyInfo>
        <MyPost>
          <Title>내 게시물 보기</Title>
        </MyPost>
      </Container>
    </>
  );
};
