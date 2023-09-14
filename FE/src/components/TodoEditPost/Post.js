import { styled } from "styled-components";

import {
  CALENDAR_LABEL,
  TAG_LABEL,
  TODO_EMOJI_LABEL,
  TODO_NAME_HOLDER,
  TODO_NAME_LABEL,
} from "../../data/constants";
import getDateFormat from "../../utils/getDateFormat";
import Validation from "./Validation";

const Post = ({
  isEdit,
  tagModalOpen,
  emojiModalOpen,
  todoEmoji,
  changeName,
  todoTag,
  date,
  calendarOpen,
  content,
  inputCount,
}) => {
  return (
    <>
      <PostWrapper>
        <Section>
          <Label for="NameInput">{TODO_NAME_LABEL}</Label>
          <Input
            id="NameInput"
            placeholder={TODO_NAME_HOLDER}
            value={content}
            onChange={(event) => changeName(event.target.value)}
          />
          <Validation isName={true} content={content} inputCount={inputCount} />
        </Section>
        <Section>
          <Label for="TagInput">{TAG_LABEL}</Label>
          <Tag onClick={() => tagModalOpen()}>{todoTag}</Tag>
          <Validation isTag={true} todoTag={todoTag} />
        </Section>
        <Section>
          <Label>{TODO_EMOJI_LABEL}</Label>
          <TodoEmoji onClick={() => emojiModalOpen()}>{todoEmoji}</TodoEmoji>
        </Section>
        <Section>
          <Label>{CALENDAR_LABEL}</Label>
          {isEdit ? (
            <Date onClick={() => calendarOpen()}>{getDateFormat(date)}</Date>
          ) : (
            <Date>{getDateFormat(date)}</Date>
          )}
          <Validation isDate={true} date={date} />
        </Section>
      </PostWrapper>
    </>
  );
};

export default Post;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 390px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;

  font-size: 1rem;

  padding: 0px 20px;

  border: 1px solid #949597;
  border-radius: 15px;
`;

const Tag = styled.div`
  width: 100%;
  height: 50px;

  font-size: 1rem;

  padding-left: 20px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: start;
`;

const Section = styled.section`
  width: 100%;
  max-width: 340px;

  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const TodoEmoji = styled.div`
  width: 50px;
  height: 50px;

  font-size: 35px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Date = styled.div`
  width: 100%;
  height: 50px;

  font-size: 1rem;

  padding-left: 20px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
`;
