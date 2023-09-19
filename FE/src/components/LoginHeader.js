import { styled } from "styled-components";

import { PROJECT_TITLE } from "../data/constants";

const LoginHeader = () => {
  return (
    <Container>
      <HeaderFixed>
        <Logo>
          <Title>{PROJECT_TITLE}</Title>
        </Logo>
      </HeaderFixed>
    </Container>
  );
};

export default LoginHeader;

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const HeaderFixed = styled.header`
  position: fixed;
  top: 0;

  height: 70px;
  width: 100%;
  max-width: 430px;

  background-color: #fff;
  border-bottom: 1px solid #d0d0d0;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 4px -4px #ececec;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 100%;

  padding-left: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  position: fixed;
  top: 20px;

  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 2rem;
  font-family: "iceJaram-Rg";
`;
