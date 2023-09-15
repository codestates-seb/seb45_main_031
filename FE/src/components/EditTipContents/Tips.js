import { styled } from "styled-components";

import Tip from "./Tip";

const Tips = ({ TIP_TITLE, TIPS }) => {
  return (
    <>
      <TipsSection>
        <TipTitle>{TIP_TITLE}</TipTitle>
        <TipsGroup>
          {TIPS.map((text, idx) => (
            <>
              <Tip key={idx} text={text} />
            </>
          ))}
        </TipsGroup>
      </TipsSection>
    </>
  );
};

export default Tips;

const TipsSection = styled.section`
  width: 90%;
  max-width: 390px;

  background-color: #fff7cc;

  padding: 25px;

  border-radius: 15px;
`;

const TipTitle = styled.h3`
  font-weight: bold;

  margin-bottom: 10px;
`;

const TipsGroup = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
