import { styled } from "styled-components";

import Category from "./Category";

const DirectoryList = ({ openModal }) => {
  return (
    <>
      <ListWrapper>
        <Category openModal={openModal} />
      </ListWrapper>
    </>
  );
};

export default DirectoryList;

const ListWrapper = styled.ul`
  width: 90%;

  margin-top: 10px;
`;
