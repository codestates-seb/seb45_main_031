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

  padding: 10px 10px 10px 0px;

  overflow-x: scroll;
  white-space: nowrap;
`;

const FilterButton = styled.button`
  font-size: 0.85rem;
  background-color: ${(props) =>
    props.filter === props.value ? "#ffe866" : "#ececec"};

  border-radius: 15px;

  margin-top: 3px;
  margin-left: 10px;
  padding: 10px 20px 10px 20px;
`;
