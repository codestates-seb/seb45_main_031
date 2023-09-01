import { styled } from "styled-components";
import { ReactComponent as ProfileSvg } from "../assets/images/profile.svg";
// import { useNavigate } from "react-router-dom";

export default function MyPage() {
  return (
    <MaxContainer>
      <Container>
        <MyInfo>
          <Title>내 정보</Title>
          <ProfileContent>
            <ProfileSvg />
            <div>
              <SubTitle>🐣 삐약이</SubTitle>
              <p>lalala@gmail.com</p>
              <EditButton>프로필 편집</EditButton>
            </div>
          </ProfileContent>
        </MyInfo>
        <MyPost>
          <Title>내 게시물 보기</Title>
          <LogoutButton>로그아웃</LogoutButton>
        </MyPost>
      </Container>
    </MaxContainer>
  );
}

// common
const MaxContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 100vh;
  width: 430px;
  background-color: #ececec;
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: #232629;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  color: #232629;
`;

const Button = styled.button`
  background-color: #fff;
  color: #949597;
  border: 1px solid #ececec;
  border-radius: 15px;
  font-size: 0.85rem;

  &:hover {
    background-color: #ececec;
    cursor: pointer;
    color: #232629;
  }
`;

// 내 정보
const MyInfo = styled.div`
  background-color: #fff;
  margin-top: 95px;
  height: 230px;
  width: 430px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const EditButton = styled(Button)`
  width: 190px;
  height: 35px;
  padding: 10px;
  margin-top: 1rem;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: repeat(2, 1fr)
  margin: 2rem 3rem;

  ProfileSVG {
    grid-row: span 2;
  }

  p {
    color: #949597;
    line-height: 2rem;
  }
`;

// 내 게시물 보기
const MyPost = styled.div`
  background-color: #fff;
  height: 592px;
  width: 430px;
  padding: 20px;
`;

//로그아웃 버튼
const LogoutButton = styled(Button)`
  width: 100%;
  height: 35px;
  padding: 10px;
  margin-top: 1rem;
`;
