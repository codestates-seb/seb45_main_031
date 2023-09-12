import { styled } from "styled-components";

import Buttons from "./Buttons";
import SectionGroup from "./SectionGroup";

const CommunityEditPost = ({
  date,
  openCalender,
  tagName,
  tagModalOpen,
  content,
  setContent,
  navigate,
  postFeed,
}) => {
  return (
    <>
      <PostWrapper>
        <SectionGroup
          date={date}
          openCalender={openCalender}
          tagName={tagName}
          tagModalOpen={tagModalOpen}
          content={content}
          setContent={setContent}
        />
        <Buttons navigate={navigate} postFeed={postFeed} />
      </PostWrapper>
    </>
  );
};

export default CommunityEditPost;

const PostWrapper = styled.section`
  width: 390px;

  margin-top: 15px;
  padding: 25px;
  border-radius: 15px;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
