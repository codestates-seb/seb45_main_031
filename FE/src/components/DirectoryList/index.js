import { styled } from "styled-components";

import Category from "./Category";

//dummy
const categoryList = [
  {
    todoStorageId: 1,
    category: "헬스",
    userInfo: {
      memberId: 1,
    },
  },
  {
    todoStorageId: 2,
    category: "수영",
    userInfo: {
      memberId: 1,
    },
  },
  {
    todoStorageId: 3,
    category: "농구",
    userInfo: {
      memberId: 1,
    },
  },
];

const DirectoryList = ({ openModal, navigate }) => {
  return (
    <>
      <ListWrapper>
        {categoryList.map((todoStorage) => (
          <>
            <Category
              openModal={openModal}
              todoStorage={todoStorage}
              category={todoStorage.category}
              navigate={navigate}
            />
          </>
        ))}
      </ListWrapper>
    </>
  );
};

export default DirectoryList;

const ListWrapper = styled.ul`
  width: 90%;

  margin-top: 10px;
`;
