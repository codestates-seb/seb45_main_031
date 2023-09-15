import { styled } from "styled-components";

import { CHART_TEXT } from "../../data/constants";

const Chart = ({ percent }) => {
  return (
    <>
      <ChartWrapper>
        <BarSection>
          <ProgressBar percent={percent} />
        </BarSection>
        <PercentSection>
          <ChartText>{CHART_TEXT}</ChartText>
          <Percent>{`${percent} %`}</Percent>
        </PercentSection>
      </ChartWrapper>
    </>
  );
};

export default Chart;

const ChartWrapper = styled.section`
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BarSection = styled.div`
  width: 85vw;
  height: 30px;
  max-width: 240px;

  background-color: #d0d0d0;

  border-radius: 15px;

  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.percent + "%"};
  height: 30px;

  background-color: #ffe866;

  border-radius: 15px;

  animation: progressBar 0.5s ease-out;
  transition: all 0.5s ease-out;

  @keyframes progressBar {
    0% {
      width: 0%;
    }
    100% {
      width: ${(props) => props.percent + "%"};
    }
  }
`;

const PercentSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChartText = styled.p`
  font-size: 0.9rem;
  color: #949597;

  margin: 5px;
`;

const Percent = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffb039;

  margin: 5px;
`;
