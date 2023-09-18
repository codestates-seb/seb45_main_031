import { styled } from "styled-components";

import mainIcon from "../assets/images/mainIcon.png";

const LoginHeader = () => {
  return (
    <Container>
      <HeaderFixed>
        <HeaderSpacer>
          <Logo>
            <img src={mainIcon} alt="mainIcon" />
          </Logo>
        </HeaderSpacer>
      </HeaderFixed>
    </Container>
  );
};

export default LoginHeader;

const Container = styled.div`
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
  border: 1px solid #d0d0d0;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 4px -4px #d0d0d0;

  display: flex;
  align-items: center;
`;
const HeaderSpacer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 60px;
  > img {
    border-radius: 50px;
  }
`;
