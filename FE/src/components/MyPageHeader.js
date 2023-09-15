import { styled } from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as BackSVG } from "../assets/icons/back.svg";

const MyPageHeader = () => {
  return (
    <MaxContainer>
      <HeaderContainer>
        <ButtonContainer>
          <Link to="/mypage">
            <BackSVG />
          </Link>
        </ButtonContainer>
        <Title>프로필 변경</Title>
      </HeaderContainer>
    </MaxContainer>
  );
};
export default MyPageHeader;

const MaxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  height: 70px;
  width: 430px;

  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 4px -4px #d0d0d0;

  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.button`
  padding: 0.5rem;
  margin-left: 1rem;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: #232629;

  display: flex;
  margin-left: 110px;
  align-items: center;
`;
