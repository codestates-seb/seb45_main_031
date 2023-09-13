import { styled } from "styled-components";
import { useState } from "react";

import DirectoryTitle from "../components/DirectoryTitle";
import DirectoryList from "../components/DirectoryList";
import DirectoryButton from "../components/DirectoryButton";
import CategoryModal from "../components/CategoryModal";

const DirectoryPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <DirectoryWrapper>
        {isOpenModal && <CategoryModal closeModal={closeModal} />}
        <DirectorySection>
          <DirectoryTitle />
          <DirectoryList openModal={openModal} />
          <DirectoryButton />
        </DirectorySection>
      </DirectoryWrapper>
    </>
  );
};

export default DirectoryPage;

const DirectoryWrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DirectorySection = styled.section`
  width: 100vw;
  max-width: 430px;
  height: 100vh;

  background-color: #ffffff;

  padding: 100px 0px;

  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: over;
`;
