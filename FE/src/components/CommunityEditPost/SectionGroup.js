import { styled } from "styled-components";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import {
  COMMUNITY_EDIT_CALENDAR_LABEL,
  COMMUNITY_EDIT_CONTENT_LABEL,
  TAG_LABEL,
} from "../../data/constants";

const SectionGroup = ({
  date,
  openCalender,
  tagName,
  tagModalOpen,
  content,
  setContent,
}) => {
  return (
    <>
      <Section>
        <Label for="CalendarButton">{COMMUNITY_EDIT_CALENDAR_LABEL}</Label>
        <AsideButton id="CalendarButton" onClick={() => openCalender()}>
          {date}
        </AsideButton>
      </Section>
      <Section>
        <Label for="TagButton">{TAG_LABEL}</Label>
        <AsideButton id="TagButton" onClick={() => tagModalOpen()}>
          {tagName}
        </AsideButton>
      </Section>
      <Section>
        <Label for="Content">{COMMUNITY_EDIT_CONTENT_LABEL}</Label>
        <TextWriteForm theme="snow" value={content} onChange={setContent} />
      </Section>
    </>
  );
};

export default SectionGroup;

const Section = styled.section`
  width: 100%;

  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const Label = styled.label`
  font-weight: bold;
`;

const AsideButton = styled.button`
  width: 100%;
  height: 50px;

  font-size: 1rem;
  color: #949597;

  padding-left: 25px;
  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const TextWriteForm = styled(ReactQuill)`
  height: 250px;
  margin-bottom: 30px;
`;
