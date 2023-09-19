import { styled } from "styled-components";

const Filter = ({ filterList, filtering, filter }) => {
  return (
    <>
      <FilterSection>
        {filterList.map((f, idx) => (
          <FilterButton
            key={idx}
            onClick={() => filtering(f)}
            filter={filter}
            value={f}
          >
            {f}
          </FilterButton>
        ))}
      </FilterSection>
    </>
  );
};

export default Filter;

const FilterSection = styled.section`
  width: 100%;

  background-color: #ffffff;

  padding: 10px;

  overflow-x: scroll;
  white-space: nowrap;
`;

const FilterButton = styled.button`
  font-size: 0.85rem;

  margin-top: 3px;
  margin-left: 10px;
  padding: 5px 20px;
  border: 1px solid
    ${(props) => (props.filter === props.value ? "#ffe866" : "#d0d0d0")};
  border-radius: 15px;

  &:hover {
    background-color: ${(props) =>
      props.filter === props.value ? "#ffe866" : "#d0d0d0"};
  }
`;
