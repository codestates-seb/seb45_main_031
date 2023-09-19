import { styled } from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const isAuthenticated = false; // 로그인 여부를 확인하는 조건 변수
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // 로그인되지 않은 경우 로그인 페이지로 이동
    }
  }, [isAuthenticated, navigate]);

  return (
    <MaxContainer>
      <Container>
        <div>🚧 Healthier 임시 홈페이지입니다 🚧</div>
      </Container>
    </MaxContainer>
  );
}

const MaxContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Container = styled.div`
  margin: auto;
  height: 100vh;
  width: 430px;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-size: 1.2rem;
  }
`;
