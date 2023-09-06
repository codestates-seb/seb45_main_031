import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import bell from "../assets/images/bell.png";
import mainIcon from "../assets/images/mainIcon.png";

const Header = () => {
  const [hasAlarm, setHasAlarm] = useState(true);

  const handleModalAlarm = () => {
    setHasAlarm(!hasAlarm);
  };

  return (
    <Container>
      <HeaderFixed>
        <HeaderSpacer>
          <HeaderTitle>
            <LogoLink to="/todo">
              <img src={mainIcon} alt="mainIcon" />
            </LogoLink>
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
  height: 95px;
  width: 430px;

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
const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  height: 80px;
  width: 80px;
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
    width: 30px;
    cursor: pointer;
  }
`;
const RedDot = styled.div`
  position: absolute;
  background-color: #ff3838;
  border: 1px solid #ff3838;
  height: 12px;
  width: 12px;
  border-radius: 15px;
  margin-left: 24px;
  margin-top: 18px;
`;

const AlarmDot = ({ show }) => {
  return show ? <RedDot /> : null;
};
