import { styled } from "styled-components";

import Chart from "./Chart";
import userTrophy from "../../utils/userTrophy";

const User = ({ percent }) => {
  return (
    <>
      <UserSection>
        <TrophyImg src={userTrophy()} />
        <Chart percent={percent} />
      </UserSection>
    </>
  );
};

export default User;

const UserSection = styled.section`
  width: 100%;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const TrophyImg = styled.img`
  width: 120px;
  height: 120px;

  margin: 10px;
`;
