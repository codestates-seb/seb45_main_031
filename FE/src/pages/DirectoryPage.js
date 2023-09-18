import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DirectoryTitle from "../components/DirectoryTitle";
import DirectoryList from "../components/DirectoryList";
import DirectoryButton from "../components/DirectoryButton";
import CategoryModal from "../components/CategoryModal";

const DirectoryPage = () => {
  const { nickname } = JSON.parse(localStorage.getItem("localUser"));

  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [todoStorage, setTodoStorage] = useState({});

  const isModal = (todoStorage) => {
    if (todoStorage === undefined) {
      changeTodoStorage({});
    } else {
      changeTodoStorage(todoStorage);
    }

    setIsOpenModal(!isOpenModal);
  };

  const changeTodoStorage = (todoStorage) => {
    setTodoStorage(todoStorage);
  };

  return (
    <>
      <DirectoryWrapper>
        {isOpenModal && (
          <CategoryModal
            closeModal={isModal}
            navigate={navigate}
            todoStorageId={todoStorage.todoStorageId}
          />
        )}
        <DirectorySection>
          <DirectoryTitle nickname={nickname} />
          <DirectoryList openModal={isModal} navigate={navigate} />
          <DirectoryButton />
        </DirectorySection>
      </DirectoryWrapper>
    </>
  );
};

export default DirectoryPage;

const DirectoryWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DirectorySection = styled.section`
  width: 100vw;
  max-width: 430px;
  height: 100%;

  background-color: #ffffff;

  padding-top: 80px;
  padding-bottom: 180px;

  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: over;
`;
