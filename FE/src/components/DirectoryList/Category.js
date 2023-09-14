import { styled } from "styled-components";

const Category = ({ openModal, todoStorage, category, navigate }) => {
  return (
    <>
      <CategoryWrapper>
        <TitleSection
          onClick={() => navigate(`/directory/${todoStorage.todoStorageId}`)}
        >
          <Title>{category}</Title>
        </TitleSection>
        <Button onClick={() => openModal(todoStorage)}>···</Button>
      </CategoryWrapper>
    </>
  );
};

export default Category;

const CategoryWrapper = styled.li`
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  padding-right: 20px;
  margin-bottom: 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &:hover {
    font-weight: bold;
    padding: 20px 20px 20px 0px;
    border: 3px solid #ffb039;
  }
`;

const TitleSection = styled.button`
  height: 100%;
  width: 80%;

  padding: 25px;

  display: flex;
  align-items: center;
  justify-content: start;
`;

const Title = styled.p`
  margin-left: 10px;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;

  background-color: #ffffff;

  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
