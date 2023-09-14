import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import bell from "../assets/images/bell.png";
import mainIcon from "../assets/images/mainIcon.png";

const Header = () => {
  const navigate = useNavigate();
  const [hasAlarm, setHasAlarm] = useState(true);

  const handleModalAlarm = () => {
    setHasAlarm(!hasAlarm);
  };

  return (
    <Container>
      <HeaderFixed>
        <HeaderSpacer>
          <HeaderTitle>
            <Logo onClick={() => navigate("/todo")}>
              <img src={mainIcon} alt="mainIcon" />
            </Logo>
          </HeaderTitle>
        </HeaderSpacer>
        <AlarmContainer>
          <AlarmBell onClick={handleModalAlarm}>
            <img src={bell} alt="bell" />
          </AlarmBell>
          <AlarmDot show={hasAlarm} />
        </AlarmContainer>
      </HeaderFixed>
    </Container>
  );
};

export default Header;

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
  height: 95px;
`;
const HeaderTitle = styled.h1`
  margin: auto;
  padding-left: 70px;
`;
const Logo = styled.button`
  display: flex;
  justify-content: flex-end;
  height: 60px;
  width: 60px;
  > img {
    border-radius: 50px;
    cursor: pointer;
  }
`;
const AlarmContainer = styled.button`
  position: relative;
  display: flex;
  margin-top: 20px;
  margin-bottom: 5px;
  margin-right: 25px;
`;
const AlarmBell = styled.div`
  > img {
    width: 25px;
    cursor: pointer;
  }
`;
const RedDot = styled.div`
  position: absolute;
  background-color: #ff3838;
  border: 1px solid #ff3838;
  height: 10px;
  width: 10px;
  border-radius: 15px;
  margin-left: 20px;
  margin-top: 15px;
`;

const AlarmDot = ({ show }) => {
  return show ? <RedDot /> : null;
};
