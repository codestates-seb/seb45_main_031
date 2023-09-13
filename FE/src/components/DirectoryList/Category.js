import { styled } from "styled-components";

//dummy
const category = "수영";

const Category = ({ openModal }) => {
  return (
    <>
      <CategoryWrapper>
        <Title>{category}</Title>
        <Button onClick={() => openModal()}>···</Button>
      </CategoryWrapper>
    </>
  );
};

export default Category;

const CategoryWrapper = styled.li`
  padding: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &:hover {
    font-weight: bold;
    padding: 18px;
    border: 3px solid #ffb039;
  }
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
