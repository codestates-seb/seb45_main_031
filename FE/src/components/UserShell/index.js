import { styled } from "styled-components";

import Date from "./Date";
import User from "./User";
import Filter from "./Filter";

const UserShell = ({
  date,
  openCalender,
  isOpenCalender,
  percent,
  filterList,
  filtering,
  filter,
}) => {
  return (
    <>
      <InterfaceContainer>
        <Date
          date={date}
          openCalender={openCalender}
          isOpenCalender={isOpenCalender}
        />
        <User percent={percent} />
        <Filter filterList={filterList} filtering={filtering} filter={filter} />
      </InterfaceContainer>
    </>
  );
};

export default UserShell;

const InterfaceContainer = styled.div`
  width: 430px;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
