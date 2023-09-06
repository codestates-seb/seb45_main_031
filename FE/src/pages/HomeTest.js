// import React from "react";
import { styled } from "styled-components";

export default function Home() {
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
