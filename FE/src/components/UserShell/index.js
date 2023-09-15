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
      <UserShellWrapper>
        <Date
          date={date}
          openCalender={openCalender}
          isOpenCalender={isOpenCalender}
        />
        <User percent={percent} />
        <Filter filterList={filterList} filtering={filtering} filter={filter} />
      </UserShellWrapper>
    </>
  );
};

export default UserShell;

const UserShellWrapper = styled.div`
  width: 100vw;
  max-width: 430px;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
