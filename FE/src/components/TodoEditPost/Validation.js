import { styled } from "styled-components";
import getDateFormat from "../../utils/getDateFormat";

const Validation = ({
  isName,
  isTag,
  isDate,
  content,
  inputCount,
  todoTag,
  date,
}) => {
  return (
    <>
      <ValidationSection>
        {isName && (
          <>
            <ValidationText>
              {content === "" && "이름은 필수값 입니다."}
              {inputCount > 60 && "이름의 최대 글자수를 초과하였습니다."}
            </ValidationText>
            <CountInputValue inputCount={inputCount}>
              {inputCount}/60
            </CountInputValue>
          </>
        )}
        {isTag && (
          <>
            <ValidationText>
              {todoTag === "" && "태그는 필수값 입니다."}
            </ValidationText>
          </>
        )}
        {isDate && (
          <>
            <ValidationText>
              {getDateFormat() > getDateFormat(date) &&
                "오늘 날짜보다 빠른 날짜는 선택할 수 없습니다."}
            </ValidationText>
          </>
        )}
      </ValidationSection>
    </>
  );
};

export default Validation;

const ValidationSection = styled.section`
  width: 320px;
  height: 3px;

  margin: 0px 10px;

  display: flex;
  flex-direction: row;
  align-items: bottom;
  justify-content: space-between;
`;

const ValidationText = styled.p`
  font-size: 0.7rem;
  color: #ff3838;
`;

const CountInputValue = styled.p`
  font-size: 0.7rem;
  color: ${(props) => (props.inputCount > 60 ? "#ff3838" : "#949597")};
`;
