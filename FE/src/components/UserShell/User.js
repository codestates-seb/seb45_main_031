import { styled } from "styled-components";

import Chart from "./Chart";

//삭제 될 더미데이터
import trophyLevel1 from "../../assets/images/trophyLevel1.png";

const User = ({ percent }) => {
  return (
    <>
      <UserSection>
        <TrophyImg src={trophyLevel1} />
        <Chart percent={percent} />
      </UserSection>
    </>
  );
};

export default User;

const UserSection = styled.section`
  width: 100%;
  height: 150px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

const TrophyImg = styled.img`
  width: 120px;
  height: 120px;

  margin: 10px;
`;
